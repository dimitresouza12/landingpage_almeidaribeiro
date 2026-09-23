import { useState } from 'react'

import { attorneys, office, practiceAreas } from '../data/site'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import { useReveal } from '../lib/useReveal'
import { useScrolled } from '../lib/useScrolled'

type ContactAction = () => void

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  const areaCode = digits.slice(2, 4)
  const localNumber = digits.slice(4)

  return `(${areaCode}) ${localNumber.slice(0, 5)}-${localNumber.slice(5)}`
}

function AttorneyPhotoPlaceholder() {
  return (
    <div className="portrait-placeholder" aria-hidden="true">
      <span>Foto profissional</span>
      <small>em breve</small>
    </div>
  )
}

function AttorneyPhoto({ attorney }: { attorney: (typeof attorneys)[number] }) {
  if (attorney.image) {
    return (
      <img
        className="attorney-profile__image"
        src={attorney.image}
        alt={`Foto de ${attorney.name}`}
        width="576"
        height="720"
        loading="lazy"
      />
    )
  }

  return <AttorneyPhotoPlaceholder />
}


export function Header({ onContact }: { onContact: ContactAction }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isScrolled = useScrolled()

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className={`site-header${isScrolled ? ' site-header--scrolled' : ''}`}>
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

        <details
          className="site-menu"
          open={isMenuOpen}
          onToggle={(event) => setIsMenuOpen(event.currentTarget.open)}
        >
          <summary aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}>
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5.5H17M3 10H17M3 14.5H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span className="sr-only">Menu</span>
          </summary>
          <nav aria-label="Navegação do menu" hidden={!isMenuOpen}>
            <a href="#escritorio" onClick={closeMenu}>Escritório</a>
            <a href="#areas" onClick={closeMenu}>Áreas de atuação</a>
            <a href="#advogados" onClick={closeMenu}>Advogados</a>
            <a href="#como-funciona" onClick={closeMenu}>Como funciona</a>
            <a href="#contato" onClick={closeMenu}>Contato</a>
            <button
              className="button-primary site-menu__contact"
              type="button"
              onClick={() => {
                closeMenu()
                onContact()
              }}
            >
              Falar com o escritório
            </button>
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
  const content = useReveal<HTMLDivElement>()
  const visual = useReveal<HTMLDivElement>()

  return (
    <section className="hero" id="escritorio" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className={`hero__content reveal ${content.revealClassName}`} ref={content.ref}>
          <p className="eyebrow">Limoeiro do Norte · CE · Atendimento em todo o Brasil</p>
          <h1 className="hero__title" id="hero-title">
            Direito aplicado à realidade de quem vive e empreende no Vale do Jaguaribe e em todo o Brasil.
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

        <div className="hero__visual" ref={visual.ref}>
          {office.heroImage ? (
            <img
              className={`hero__image reveal--mask-x ${visual.revealClassName}`}
              src={office.heroImage}
              alt="Ambiente do escritório Almeida Ribeiro"
              width="3732"
              height="5724"
            />
          ) : (
            <div className="hero__visual-placeholder" aria-hidden="true">
              <div className="hero__visual-caption">
                <span>Imagem institucional</span>
                <small>Espaço reservado para fotografia real</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

const marqueeAreas = Array.from(new Set(practiceAreas.map((area) => area.name)))

export function AreasMarquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((group) => (
          <div className="marquee__group" key={group}>
            {marqueeAreas.map((name) => (
              <span className="marquee__item" key={`${group}-${name}`}>
                {name}
                <span className="marquee__dot">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function AttorneyRow({
  attorney,
  reversed,
}: {
  attorney: (typeof attorneys)[number]
  reversed: boolean
}) {
  const { ref, revealClassName } = useReveal<HTMLElement>()

  return (
    <article
      className={`attorney-profile reveal ${revealClassName}`}
      data-align={reversed ? 'reverse' : undefined}
      ref={ref}
    >
      <div className="attorney-profile__media">
        <AttorneyPhoto attorney={attorney} />
      </div>
      <div className="attorney-profile__copy">
        <p className="attorney-profile__oab">{attorney.oab}</p>
        <h3>{attorney.name}</h3>
        <p>{attorney.bio}</p>
      </div>
    </article>
  )
}

export function AttorneyProfiles() {
  const heading = useReveal<HTMLDivElement>()

  return (
    <section className="attorneys-section section" id="advogados" aria-labelledby="attorneys-title">
      <div className={`section-heading reveal ${heading.revealClassName}`} ref={heading.ref}>
        <p className="eyebrow">Quem está ao seu lado</p>
        <h2 className="section-title" id="attorneys-title">Advocacia com presença e contexto.</h2>
      </div>

      <div className="attorney-profiles">
        {attorneys.map((attorney, index) => (
          <AttorneyRow
            key={attorney.id}
            attorney={attorney}
            reversed={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  )
}

function TimelineStep({
  number,
  title,
  description,
  index,
}: {
  number: string
  title: string
  description: string
  index: number
}) {
  const { ref, revealClassName } = useReveal<HTMLLIElement>()

  return (
    <li
      className={`reveal ${revealClassName}`}
      style={{ ['--reveal-delay' as string]: `${index * 90}ms` }}
      ref={ref}
    >
      <span aria-hidden="true">{number}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  )
}

export function HowItWorks() {
  const heading = useReveal<HTMLDivElement>()
  const steps = [
    ['01', 'Escolha com quem falar', 'Defina se deseja iniciar o contato com Ana Paula Almeida ou Deyvison Ribeiro.'],
    ['02', 'Explique o assunto', 'Conte, pelo WhatsApp, qual é o tema que motivou seu contato.'],
    ['03', 'Envie as informações solicitadas', 'Compartilhe os dados e documentos que forem necessários para compreender a situação.'],
    ['04', 'Receba orientação sobre os próximos passos', 'Após a conversa inicial, você recebe as orientações pertinentes para seguir.'],
  ]

  return (
    <section className="how-it-works section" id="como-funciona" aria-labelledby="how-title">
      <div className={`section-heading reveal ${heading.revealClassName}`} ref={heading.ref}>
        <p className="eyebrow">Primeiro contato</p>
        <h2 className="section-title" id="how-title">Um caminho direto para iniciar a conversa.</h2>
      </div>

      <ol className="steps-list">
        {steps.map(([number, title, description], index) => (
          <TimelineStep key={number} number={number} title={title} description={description} index={index} />
        ))}
      </ol>
    </section>
  )
}

export function Faq() {
  const heading = useReveal<HTMLDivElement>()

  return (
    <section className="faq section" aria-labelledby="faq-title">
      <div className={`section-heading reveal ${heading.revealClassName}`} ref={heading.ref}>
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
  const { lat, lng } = office.coordinates
  const mapHref = `https://www.google.com/maps?q=${lat},${lng}`
  const heading = useReveal<HTMLDivElement>()

  return (
    <section className="contact-section section" id="contato" aria-labelledby="contact-title">
      <div className={`contact-section__heading reveal ${heading.revealClassName}`} ref={heading.ref}>
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

      <a
        className="map-embed"
        href={mapHref}
        target="_blank"
        rel="noreferrer"
        aria-label={`Abrir localização de ${office.name} no Google Maps`}
      >
        <iframe
          className="map-embed__frame"
          src={`https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`}
          title={`Mapa de localização — ${office.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={-1}
          aria-hidden="true"
        />

        <span className="map-embed__link">
          Ver endereço no mapa
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>
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
        <p className="site-footer__credit">
          Desenvolvido por{' '}
          <a href="https://otimizai.net.br/" target="_blank" rel="noreferrer">
            Otimiza AI
          </a>
        </p>
      </div>
    </footer>
  )
}
