"""
Scraper AFC Piscinas — extrai imagens e textos de todas as páginas do site.
"""

import os
import re
import time
import logging
import requests
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO
from urllib.parse import urljoin, urlparse

# ─── Configuração ───────────────────────────────────────────────────────────

BASE_DIR = "afc_assets"
OUTPUT_TXT = os.path.join(BASE_DIR, "textos_site.txt")
ERRORS_LOG = os.path.join(BASE_DIR, "erros.log")

PAGES = [
    ("Início",       "https://afcpiscinas.pt/",            "inicio"),
    ("Piscinas",     "https://afcpiscinas.pt/piscinas/",   "piscinas"),
    ("Complementos", "https://afcpiscinas.pt/complementos/","complementos"),
    ("Saunas",       "https://afcpiscinas.pt/saunas/",     "saunas"),
    ("Turcos",       "https://afcpiscinas.pt/turco/",      "turcos"),
    ("Spas",         "https://afcpiscinas.pt/spas/",       "spas"),
    ("Contactos",    "https://afcpiscinas.pt/contactos/",  "contactos"),
]

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "pt-PT,pt;q=0.9,en;q=0.8",
}

MIN_SIZE = 50          # px — ignora ícones menores que 50×50
REQUEST_DELAY = 1      # segundos entre pedidos

# Padrões de ficheiros a ignorar (logos de parceiros, favicons, etc.)
IGNORE_PATTERNS = re.compile(
    r"(favicon|logo\d+|partner|sprite|icon-|placeholder|dummy)",
    re.IGNORECASE,
)

# ─── Logging de erros ────────────────────────────────────────────────────────

os.makedirs(BASE_DIR, exist_ok=True)
logging.basicConfig(
    filename=ERRORS_LOG,
    level=logging.ERROR,
    format="%(asctime)s  %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)


# ─── Utilitários ─────────────────────────────────────────────────────────────

def slugify(name: str) -> str:
    name = name.lower()
    name = re.sub(r"[^\w\s-]", "", name)
    name = re.sub(r"[\s_]+", "-", name).strip("-")
    return name


def original_name(url: str) -> str:
    """Extrai o nome do ficheiro a partir da URL."""
    path = urlparse(url).path
    basename = os.path.basename(path) or "imagem"
    name, ext = os.path.splitext(basename)
    name = slugify(name) or "imagem"
    ext = ext.lower() if ext else ".jpg"
    return name, ext


def fetch(url: str, session: requests.Session) -> requests.Response | None:
    try:
        resp = session.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        return resp
    except Exception as exc:
        logging.error("GET %s — %s", url, exc)
        return None


def image_dimensions(data: bytes) -> tuple[int, int]:
    try:
        img = Image.open(BytesIO(data))
        return img.size  # (width, height)
    except Exception:
        return (0, 0)


def collect_image_urls(soup: BeautifulSoup, page_url: str) -> list[str]:
    """Recolhe URLs de imagens: <img src/srcset> + CSS background-image."""
    urls: list[str] = []

    # <img src>
    for tag in soup.find_all("img"):
        src = tag.get("src") or tag.get("data-src") or tag.get("data-lazy-src")
        if src:
            urls.append(urljoin(page_url, src))

        # srcset
        srcset = tag.get("srcset") or tag.get("data-srcset") or ""
        for part in srcset.split(","):
            tokens = part.strip().split()
            if tokens:
                urls.append(urljoin(page_url, tokens[0]))

    # CSS background-image em style inline
    for tag in soup.find_all(style=True):
        for match in re.finditer(r"url\(['\"]?([^'\")\s]+)['\"]?\)", tag["style"]):
            candidate = match.group(1)
            if not candidate.startswith("data:"):
                urls.append(urljoin(page_url, candidate))

    # Elementor background via data-settings
    for tag in soup.find_all(attrs={"data-settings": True}):
        settings = tag["data-settings"]
        for match in re.finditer(r'"url"\s*:\s*"([^"]+)"', settings):
            candidate = match.group(1).replace("\\/", "/")
            if candidate.startswith("http"):
                urls.append(candidate)

    # Remove duplicados preservando ordem
    seen: set[str] = set()
    result: list[str] = []
    for u in urls:
        if u not in seen:
            seen.add(u)
            result.append(u)
    return result


def should_ignore(url: str) -> bool:
    path = urlparse(url).path.lower()
    if IGNORE_PATTERNS.search(path):
        return True
    # Ignora ficheiros não-imagem óbvios
    ext = os.path.splitext(path)[1]
    return ext in (".svg", ".gif", ".ico", ".webp") if False else False  # svg ok para baixar


def download_images(
    image_urls: list[str],
    folder: str,
    session: requests.Session,
    page_label: str,
) -> tuple[int, int]:
    """Baixa imagens válidas e devolve (baixadas, ignoradas)."""
    os.makedirs(folder, exist_ok=True)
    counter = 0
    ignored = 0

    for raw_url in image_urls:
        if should_ignore(raw_url):
            ignored += 1
            continue

        time.sleep(0.3)
        resp = fetch(raw_url, session)
        if resp is None:
            ignored += 1
            continue

        content_type = resp.headers.get("content-type", "")
        if "image" not in content_type and not any(
            raw_url.lower().endswith(e)
            for e in (".jpg", ".jpeg", ".png", ".webp", ".avif")
        ):
            ignored += 1
            continue

        data = resp.content
        w, h = image_dimensions(data)

        if w < MIN_SIZE or h < MIN_SIZE:
            ignored += 1
            continue

        counter += 1
        name, ext = original_name(raw_url)
        filename = f"img_{counter:02d}_{name}{ext}"
        filepath = os.path.join(folder, filename)

        with open(filepath, "wb") as f:
            f.write(data)

        print(f"    [{counter:02d}] {filename}  ({w}×{h}px)")

    return counter, ignored


# ─── Extração de texto ───────────────────────────────────────────────────────

ELEMENTOR_SECTION_CLASSES = {
    "elementor-section",
    "elementor-inner-section",
    "e-container",
    "elementor-top-section",
}

HEADING_TAGS = {"h1", "h2", "h3", "h4"}
TEXT_TAGS = {"p", "span", "li", "a", "address", "blockquote"}
CTA_CLASSES = re.compile(r"(btn|button|cta|elementor-button)", re.IGNORECASE)


def is_cta(tag) -> bool:
    classes = " ".join(tag.get("class", []))
    return bool(CTA_CLASSES.search(classes))


def clean(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def extract_section_label(section) -> str:
    """Tenta inferir um nome para a secção a partir dos headings dentro dela."""
    heading = section.find(HEADING_TAGS)
    if heading:
        txt = clean(heading.get_text())
        if txt:
            return txt[:60]
    cls = " ".join(section.get("class", []))
    return cls or "Secção"


def extract_texts(soup: BeautifulSoup) -> str:
    """Extrai blocos de texto organizados por secção Elementor."""
    lines: list[str] = []

    # Remove ruído
    for tag in soup(["script", "style", "noscript", "meta", "link"]):
        tag.decompose()
    for tag in soup.find_all(string=lambda t: isinstance(t, __import__("bs4").Comment)):
        tag.extract()

    # Tenta encontrar secções Elementor
    sections = soup.find_all(
        lambda t: t.name in ("section", "div")
        and any(c in ELEMENTOR_SECTION_CLASSES for c in t.get("class", []))
    )

    if not sections:
        # Fallback: usa o body inteiro
        sections = [soup.find("body") or soup]

    seen_texts: set[str] = set()

    for section in sections:
        label = extract_section_label(section)
        section_lines: list[str] = []

        for tag in section.find_all(list(HEADING_TAGS | TEXT_TAGS)):
            # Pula se já foi processado por uma secção pai
            txt = clean(tag.get_text(separator=" "))
            if not txt or txt in seen_texts or len(txt) < 3:
                continue
            seen_texts.add(txt)

            if tag.name in HEADING_TAGS:
                prefix = f"[{tag.name.upper()}]"
                section_lines.append(f"{prefix} {txt}")
            elif is_cta(tag):
                section_lines.append(f"[CTA] {txt}")
            else:
                section_lines.append(txt)

        if section_lines:
            lines.append(f"\n[SEÇÃO: {label}]")
            lines.extend(section_lines)

    return "\n".join(lines)


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    session = requests.Session()
    session.headers.update(HEADERS)

    all_text_blocks: list[str] = []
    summary: list[tuple[str, int]] = []

    total_imgs = 0

    print("\n" + "=" * 60)
    print("  AFC Piscinas — Scraper iniciado")
    print("=" * 60)

    for label, url, slug in PAGES:
        print(f"\n▶ Página: {label}  ({url})")
        print(f"  Pasta: afc_assets/{slug}/")

        time.sleep(REQUEST_DELAY)
        resp = fetch(url, session)
        if resp is None:
            print(f"  ✗ Falhou ao carregar a página.")
            summary.append((label, 0))
            continue

        soup = BeautifulSoup(resp.text, "lxml")

        # Imagens
        folder = os.path.join(BASE_DIR, slug)
        image_urls = collect_image_urls(soup, url)
        print(f"  Imagens encontradas (candidatas): {len(image_urls)}")
        downloaded, ignored = download_images(image_urls, folder, session, label)
        print(f"  ✓ Baixadas: {downloaded}  |  Ignoradas/inválidas: {ignored}")
        total_imgs += downloaded
        summary.append((label, downloaded))

        # Textos
        text_block = extract_texts(soup)
        separator = "=" * 45
        header = (
            f"\n{separator}\n"
            f"PÁGINA: {label} ({url})\n"
            f"{separator}"
        )
        all_text_blocks.append(header + "\n" + text_block)

    # Grava textos
    with open(OUTPUT_TXT, "w", encoding="utf-8") as f:
        f.write("\n".join(all_text_blocks))

    # Resumo final
    print("\n" + "=" * 60)
    print("  RESUMO FINAL")
    print("=" * 60)
    print(f"  Páginas varridas : {len(PAGES)}")
    print(f"  Total de imagens : {total_imgs}")
    print()
    for lbl, count in summary:
        print(f"  {lbl:<15} → {count} imagens")
    print()
    print(f"  Textos gravados em : {OUTPUT_TXT}")
    print(f"  Erros registados em: {ERRORS_LOG}")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    main()
