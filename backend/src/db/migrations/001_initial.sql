-- ============================================================
-- AFC Piscinas — Schema inicial
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_users (
  id           SERIAL PRIMARY KEY,
  email        VARCHAR(255) NOT NULL UNIQUE,
  password     TEXT         NOT NULL,
  name         VARCHAR(255) NOT NULL DEFAULT '',
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id           SERIAL PRIMARY KEY,
  key          VARCHAR(100) NOT NULL UNIQUE,
  value        TEXT         NOT NULL DEFAULT '',
  label        VARCHAR(255) NOT NULL DEFAULT '',
  type         VARCHAR(50)  NOT NULL DEFAULT 'text',
  group_name   VARCHAR(100) NOT NULL DEFAULT 'general'
);

CREATE TABLE IF NOT EXISTS pages (
  id           SERIAL PRIMARY KEY,
  slug         VARCHAR(100) NOT NULL UNIQUE,
  title        VARCHAR(255) NOT NULL,
  description  TEXT         NOT NULL DEFAULT '',
  is_active    BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sections (
  id           SERIAL PRIMARY KEY,
  page_id      INTEGER      NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  slug         VARCHAR(100) NOT NULL,
  title        VARCHAR(255) NOT NULL DEFAULT '',
  content      JSONB        NOT NULL DEFAULT '{}',
  order_num    INTEGER      NOT NULL DEFAULT 0,
  is_active    BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  UNIQUE(page_id, slug)
);

CREATE TABLE IF NOT EXISTS media (
  id            SERIAL PRIMARY KEY,
  filename      VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  mime_type     VARCHAR(100) NOT NULL DEFAULT '',
  size_bytes    BIGINT       NOT NULL DEFAULT 0,
  url           TEXT         NOT NULL DEFAULT '',
  alt_text      VARCHAR(500) NOT NULL DEFAULT '',
  category      VARCHAR(100) NOT NULL DEFAULT 'general',
  tags          TEXT[]       NOT NULL DEFAULT '{}',
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Trigger: mantém updated_at actualizado em sections
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS sections_updated_at ON sections;
CREATE TRIGGER sections_updated_at
  BEFORE UPDATE ON sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
