import PageHero from '../components/PageHero'

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-textprimary font-semibold text-lg mb-3 pb-2 border-b border-borderlight">{title}</h2>
      <div className="text-textmuted text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  )
}

export default function Privacidade() {
  return (
    <>
      <PageHero eyebrow="LEGAL" title="Política de Privacidade" />

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <Section title="1. Identificação do Responsável pelo Tratamento">
            <p><strong className="text-textprimary">AFC Piscinas</strong><br />
            Aguda Parque – Edifício J, Largo de Arcozelo, 76, 4405-021 Arcozelo, Portugal<br />
            Email: <a href="mailto:geral@afcpiscinas.pt" className="text-accent hover:underline">geral@afcpiscinas.pt</a><br />
            Telefone: +351 96 733 57 07</p>
          </Section>

          <Section title="2. Dados Pessoais Recolhidos">
            <p>Através do formulário de contacto do nosso website, recolhemos os seguintes dados pessoais:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Nome completo</li>
              <li>Endereço de email</li>
              <li>Assunto e mensagem de contacto</li>
            </ul>
          </Section>

          <Section title="3. Finalidade do Tratamento">
            <p>Os dados recolhidos são utilizados exclusivamente para:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Responder aos pedidos de informação e orçamento submetidos pelo visitante</li>
              <li>Comunicações relacionadas com os serviços solicitados</li>
            </ul>
          </Section>

          <Section title="4. Base Jurídica">
            <p>O tratamento dos dados pessoais baseia-se no consentimento expresso do titular, nos termos do artigo 6.º, n.º 1, alínea a) do Regulamento Geral sobre a Proteção de Dados (RGPD – Regulamento UE 2016/679) e da Lei n.º 58/2019, de 8 de agosto.</p>
          </Section>

          <Section title="5. Conservação dos Dados">
            <p>Os dados pessoais são conservados pelo período máximo de <strong className="text-textprimary">2 (dois) anos</strong> a contar da data de submissão, findo o qual serão eliminados dos nossos sistemas, salvo obrigação legal de conservação por prazo superior.</p>
          </Section>

          <Section title="6. Direitos do Titular dos Dados">
            <p>Nos termos do RGPD, o titular dos dados tem os seguintes direitos:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong className="text-textprimary">Acesso</strong> – solicitar uma cópia dos dados que detemos</li>
              <li><strong className="text-textprimary">Rectificação</strong> – corrigir dados incorrectos ou incompletos</li>
              <li><strong className="text-textprimary">Apagamento</strong> ("direito ao esquecimento") – solicitar a eliminação dos dados</li>
              <li><strong className="text-textprimary">Portabilidade</strong> – receber os dados num formato estruturado e legível por máquina</li>
              <li><strong className="text-textprimary">Oposição</strong> – opor-se ao tratamento dos dados</li>
              <li><strong className="text-textprimary">Retirada do consentimento</strong> – a qualquer momento, sem afectar a licitude do tratamento anterior</li>
            </ul>
            <p className="mt-2">Para exercer qualquer um dos direitos acima, contacte-nos através de <a href="mailto:geral@afcpiscinas.pt" className="text-accent hover:underline">geral@afcpiscinas.pt</a>.</p>
          </Section>

          <Section title="7. Cookies">
            <p>Este website utiliza apenas cookies técnicas (estritamente necessárias), essenciais para o funcionamento básico do site. Não utilizamos cookies de rastreamento, analytics ou publicidade de terceiros.</p>
          </Section>

          <Section title="8. Transferências Internacionais">
            <p>Não efectuamos transferências de dados pessoais para países terceiros fora do Espaço Económico Europeu (EEE). Não aplicável.</p>
          </Section>

          <Section title="9. Encarregado de Proteção de Dados (DPO)">
            <p>Para questões relacionadas com a proteção de dados, pode contactar o nosso responsável através de:<br />
            <a href="mailto:geral@afcpiscinas.pt" className="text-accent hover:underline">geral@afcpiscinas.pt</a></p>
          </Section>

          <Section title="10. Reclamação à Autoridade de Controlo">
            <p>Sem prejuízo de qualquer outro recurso administrativo ou judicial, tem o direito de apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD), caso considere que o tratamento dos seus dados viola o RGPD.<br />
            CNPD: <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.cnpd.pt</a></p>
          </Section>

          <p className="text-textmuted text-xs mt-10 pt-5 border-t border-borderlight">
            Última actualização: Junho 2026
          </p>
        </div>
      </section>
    </>
  )
}
