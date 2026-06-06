import PageHero from '../components/PageHero'

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-textprimary font-semibold text-lg mb-3 pb-2 border-b border-borderlight">{title}</h2>
      <div className="text-textmuted text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  )
}

export default function Termos() {
  return (
    <>
      <PageHero eyebrow="LEGAL" title="Termos de Uso" />

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <Section title="1. Identificação">
            <p>O presente website <strong className="text-textprimary">afcpiscinas.pt</strong> é propriedade e gerido por:<br />
            <strong className="text-textprimary">AFC Piscinas</strong><br />
            Aguda Parque – Edifício J, Largo de Arcozelo, 76, 4405-021 Arcozelo, Portugal<br />
            Email: <a href="mailto:geral@afcpiscinas.pt" className="text-accent hover:underline">geral@afcpiscinas.pt</a></p>
          </Section>

          <Section title="2. Aceitação dos Termos">
            <p>Ao aceder e utilizar este website, o utilizador declara ter lido, compreendido e aceite os presentes Termos de Uso na sua totalidade. Caso não concorde com qualquer parte destes termos, deverá abster-se de utilizar o website.</p>
          </Section>

          <Section title="3. Serviços">
            <p>A AFC Piscinas é uma empresa especializada em construção, renovação e manutenção de piscinas, saunas, spas e banhos turcos. As informações disponibilizadas neste website têm carácter meramente informativo e não constituem uma proposta contratual vinculativa.</p>
            <p>Os orçamentos e propostas comerciais são emitidos individualmente após análise das necessidades específicas de cada cliente.</p>
          </Section>

          <Section title="4. Propriedade Intelectual">
            <p>Todo o conteúdo presente neste website — incluindo textos, imagens, fotografias, logótipos, design e código fonte — é propriedade da AFC Piscinas ou de terceiros que autorizaram a sua utilização.</p>
            <p>É expressamente proibida a reprodução, distribuição, transmissão ou qualquer outra utilização não autorizada dos conteúdos deste website, sem prévia autorização escrita da AFC Piscinas.</p>
          </Section>

          <Section title="5. Responsabilidades do Utilizador">
            <p>O utilizador compromete-se a:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Utilizar o website de forma lícita e em conformidade com os presentes termos</li>
              <li>Não utilizar o website para fins ilícitos ou que violem direitos de terceiros</li>
              <li>Fornecer informações verídicas e actualizadas nos formulários de contacto</li>
              <li>Não introduzir vírus, malware ou qualquer código malicioso no sistema</li>
            </ul>
          </Section>

          <Section title="6. Limitação de Responsabilidade">
            <p>A AFC Piscinas não se responsabiliza por:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Danos directos ou indirectos resultantes do uso ou impossibilidade de uso do website</li>
              <li>Erros, omissões ou inexactidões nas informações disponibilizadas</li>
              <li>Interrupções temporárias do serviço por razões técnicas</li>
              <li>Conteúdos de websites de terceiros para os quais este site remeta</li>
            </ul>
          </Section>

          <Section title="7. Links Externos">
            <p>Este website pode conter links para websites de terceiros. Esses links são disponibilizados apenas por conveniência do utilizador. A AFC Piscinas não controla nem se responsabiliza pelo conteúdo, políticas de privacidade ou práticas de qualquer website de terceiros.</p>
          </Section>

          <Section title="8. Modificações">
            <p>A AFC Piscinas reserva-se o direito de modificar os presentes Termos de Uso em qualquer momento, sem aviso prévio. A continuação da utilização do website após tais alterações implica a aceitação dos novos termos.</p>
          </Section>

          <Section title="9. Lei Aplicável e Foro Competente">
            <p>Os presentes Termos de Uso são regidos pela lei portuguesa. Para a resolução de quaisquer litígios emergentes da interpretação ou aplicação dos presentes termos, as partes elegem o foro da comarca de <strong className="text-textprimary">Vila Nova de Gaia</strong>, com expressa renúncia a qualquer outro.</p>
          </Section>

          <p className="text-textmuted text-xs mt-10 pt-5 border-t border-borderlight">
            Última actualização: Junho 2026
          </p>
        </div>
      </section>
    </>
  )
}
