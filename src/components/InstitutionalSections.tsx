import { attorneys, office } from '../data/site'
import { buildWhatsAppUrl } from '../lib/whatsapp'

type ContactAction = () => void

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  const areaCode = digits.slice(2, 4)
  const localNumber = digits.slice(4)

  return `(${areaCode}) ${localNumber.slice(0, 5)}-${localNumber.slice(5)}`
}

function AttorneyPhotoPlaceholder({ name }: { name: string }) {
  return (
    <div className="portrait-placeholder" role="img" aria-label={`Espaço reservado para a foto de ${name}`}>
      <span>Foto profissional</span>
      <small>em breve</small>
    </div>
  )
}

export function Header({ onContact }: { onContact: ContactAction }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="wordmark" href="#escritorio" aria-label="Almeida Ribeiro Advogados Associados, início">
          <span>Almeida Ribeiro</span>
          <small>Advogados Associados</small>
        </a>

        <nav className="site-nav" aria-label="Navegação principal">
          <a href="#escritorio">Escritório</a>
          <a href="#areas">Áreas de atuação</a>
          <a href="#advogados">Advogados</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#contato">Contato</a>
        </nav>

        <details className="site-menu">
          <summary>Menu</summary>
          <nav aria-label="Navegação do menu">
            <a href="#escritorio">Escritório</a>
            <a href="#areas">Áreas de atuação</a>
            <a href="#advogados">Advogados</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#contato">Contato</a>
          </nav>
        </details>

        <button className="button-primary site-header__contact" type="button" onClick={onContact}>
          Falar com o escritório
        </button>
      </div>
    </header>
  )
}

export function Hero({ onContact }: { onContact: ContactAction }) {
  return (
    <section className="hero section" id="escritorio" aria-labelledby="hero-title">
      <div className="hero__content">
        <p className="eyebrow">Limoeiro do Norte · CE · Atendimento em todo o Brasil</p>
        <h1 className="hero__title" id="hero-title">
          Direito aplicado à realidade de quem vive e empreende no Vale do Jaguaribe.
        </h1>
        <p className="hero__intro">
          Orientação jurídica para pessoas e empresas, com escuta atenta e comunicação clara em cada etapa.
        </p>
        <div className="hero__actions">
          <button className="button-primary" type="button" onClick={onContact}>
            Falar com o escritório
          </button>
          <a className="button-secondary" href="#areas">
            Conhecer áreas de atuação
          </a>
        </div>
      </div>

      <div className="hero__visual" aria-label="Espaço reservado para foto institucional do escritório" role="img">
        <div className="hero__visual-caption">
          <span>Imagem institucional</span>
          <small>Espaço reservado para fotografia real</small>
        </div>
      </div>
    </section>
  )
}

export function AttorneyProfiles({ onContact }: { onContact: ContactAction }) {
  return (
    <section className="attorneys-section section" id="advogados" aria-labelledby="attorneys-title">
      <div className="section-heading">
        <p className="eyebrow">Quem está ao seu lado</p>
        <h2 className="section-title" id="attorneys-title">Advocacia com presença e contexto.</h2>
      </div>

      <div className="attorney-profiles">
        {attorneys.map((attorney) => (
          <article className="attorney-profile" key={attorney.id}>
            <AttorneyPhotoPlaceholder name={attorney.name} />
            <div className="attorney-profile__copy">
              <p className="attorney-profile__oab">{attorney.oab}</p>
              <h3>{attorney.name}</h3>
              <p>{attorney.bio}</p>
              <button className="button-secondary attorney-profile__contact" type="button" onClick={onContact}>
                Falar com o escritório
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function HowItWorks() {
  const steps = [
    ['01', 'Escolha com quem falar', 'Defina se deseja iniciar o contato com Ana Paula Almeida ou Deyvison Ribeiro.'],
    ['02', 'Explique o assunto', 'Conte, pelo WhatsApp, qual é o tema que motivou seu contato.'],
    ['03', 'Envie as informações solicitadas', 'Compartilhe os dados e documentos que forem necessários para compreender a situação.'],
    ['04', 'Receba orientação sobre os próximos passos', 'Após a conversa inicial, você recebe as orientações pertinentes para seguir.'],
  ]

  return (
    <section className="how-it-works section" id="como-funciona" aria-labelledby="how-title">
      <div className="section-heading">
        <p className="eyebrow">Primeiro contato</p>
        <h2 className="section-title" id="how-title">Um caminho direto para iniciar a conversa.</h2>
      </div>

      <ol className="steps-list">
        {steps.map(([number, title, description]) => (
          <li key={number}>
            <span aria-hidden="true">{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Faq() {
  return (
    <section className="faq section" aria-labelledby="faq-title">
      <div className="section-heading">
        <p className="eyebrow">Dúvidas frequentes</p>
        <h2 className="section-title" id="faq-title">Informações antes de chamar.</h2>
      </div>

      <div className="faq__items">
        <details>
          <summary>Como começo o contato?</summary>
          <p>Você escolhe uma área, outro assunto ou um dos advogados. A conversa começa diretamente pelo WhatsApp.</p>
        </details>
        <details>
          <summary>O atendimento pode ser feito online?</summary>
          <p>Sim. O escritório realiza atendimento online para todo o Brasil, com o contato inicial pelo WhatsApp.</p>
        </details>
        <details>
          <summary>Há atendimento presencial em Limoeiro do Norte?</summary>
          <p>Sim. O atendimento presencial é realizado em Limoeiro do Norte, no endereço informado nesta página.</p>
        </details>
        <details>
          <summary>Posso escolher com qual advogado falar?</summary>
          <p>Sim. Ao iniciar o contato, você pode escolher Ana Paula Almeida ou Deyvison Ribeiro.</p>
        </details>
        <details>
          <summary>O escritório atende empresas?</summary>
          <p>Sim. Há caminhos de contato para demandas de empresas e para pessoas físicas na seção de áreas de atuação.</p>
        </details>
      </div>
    </section>
  )
}

export function ContactSection() {
  return (
    <section className="contact-section section" id="contato" aria-labelledby="contact-title">
      <div className="contact-section__heading">
        <p className="eyebrow">Contato</p>
        <h2 className="section-title" id="contact-title">Escolha com quem deseja falar.</h2>
        <p>Para assuntos não listados, escolha um dos canais abaixo e indique o tema da conversa.</p>
      </div>

      <div className="contact-section__grid">
        <div className="contact-attorneys" aria-label="Canais diretos no WhatsApp">
          {attorneys.map((attorney) => (
            <a
              className="contact-attorney"
              href={buildWhatsAppUrl(attorney.phone)}
              key={attorney.id}
              target="_blank"
              rel="noreferrer"
            >
              <span>{attorney.oab}</span>
              <strong>{attorney.name}</strong>
              <small>{formatPhone(attorney.phone)}</small>
              <em>Falar com {attorney.name.split(' ')[0]} {attorney.name.split(' ')[1] ?? ''}</em>
            </a>
          ))}
        </div>

        <div className="office-details">
          <dl>
            <div>
              <dt>Escritório</dt>
              <dd>{office.address}</dd>
            </div>
            <div>
              <dt>Horário</dt>
              <dd>{office.hours}</dd>
            </div>
            <div>
              <dt>E-mail</dt>
              <dd><a href={`mailto:${office.email}`}>{office.email}</a></dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd><a href={office.instagram} target="_blank" rel="noreferrer">@almeidaribeiro_adv</a></dd>
            </div>
          </dl>
          <p className="office-details__service-note">Presencial em Limoeiro do Norte e online para todo o Brasil.</p>
        </div>
      </div>

      <div className="map-placeholder">
        <div>
          <span>Localização do escritório</span>
          <small>Mapa será inserido aqui</small>
        </div>
        <a
          className="button-secondary map-placeholder__link"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
          target="_blank"
          rel="noreferrer"
        >
          Ver endereço no mapa
        </a>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="site-footer__name">Almeida Ribeiro Advogados Associados</p>
          <p>Atuação em Limoeiro do Norte, Vale do Jaguaribe e atendimento online para todo o Brasil.</p>
        </div>
        <nav className="site-footer__internal-links" aria-label="Navegação do rodapé">
          <a href="#escritorio">Escritório</a>
          <a href="#areas">Áreas de atuação</a>
          <a href="#advogados">Advogados</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#contato">Contato</a>
        </nav>
        <div className="site-footer__links" aria-label="Contato direto no WhatsApp">
          {attorneys.map((attorney) => (
            <a href={buildWhatsAppUrl(attorney.phone)} key={attorney.id} target="_blank" rel="noreferrer">
              {attorney.name} · {attorney.oab}
            </a>
          ))}
        </div>
        <p className="site-footer__credit">Desenvolvido por Frank Dev | Soluções Web</p>
      </div>
    </footer>
  )
}
