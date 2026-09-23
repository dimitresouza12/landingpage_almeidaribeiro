import { useMemo, useRef, useState, type ComponentType, type KeyboardEvent } from 'react'
import {
  Briefcase,
  HardHat,
  HeartPulse,
  Lock,
  MessageCircle,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  type LucideProps,
} from 'lucide-react'

import {
  practiceAreas,
  type Audience,
  type PracticeArea,
} from '../data/site'
import { useReveal } from '../lib/useReveal'
import type { ContactTopic } from './ContactChooser'

type PracticeExplorerProps = {
  onContact: (topic?: ContactTopic) => void
}

const audiences: Array<{ id: Audience; label: string }> = [
  { id: 'individual', label: 'Para você' },
  { id: 'business', label: 'Para sua empresa' },
]

const areaIcons: Record<string, ComponentType<LucideProps>> = {
  previdenciario: ShieldCheck,
  'civil-pessoa': Scale,
  'consumidor-pessoa': ShoppingBag,
  'digital-pessoa': Lock,
  saude: HeartPulse,
  empresarial: Briefcase,
  agrario: Sprout,
  trabalho: HardHat,
  'civil-empresa': Scale,
  'digital-empresa': Lock,
  consultoria: MessageCircle,
  'consumidor-empresa': ShoppingBag,
}

function AreaCard({
  area,
  index,
  selected,
  onToggle,
  onContact,
}: {
  area: PracticeArea
  index: number
  selected: boolean
  onToggle: () => void
  onContact: (topic?: ContactTopic) => void
}) {
  const { ref, revealClassName } = useReveal<HTMLDivElement>()
  const Icon = areaIcons[area.id] ?? Scale

  return (
    <div
      className={`area-card reveal ${revealClassName}`}
      style={{ ['--reveal-delay' as string]: `${Math.min(index, 6) * 60}ms` }}
      ref={ref}
    >
      <div className="area-card__icon" aria-hidden="true">
        <Icon size={22} strokeWidth={1.75} />
      </div>

      <button
        id={`area-${area.id}`}
        className="area-card__trigger"
        type="button"
        aria-pressed={selected}
        aria-expanded={selected}
        aria-controls={`area-panel-${area.id}`}
        onClick={onToggle}
      >
        {/* <button> only permits phrasing content — an <h3> descendant is
            invalid HTML, so the heading semantics are applied to this span
            via role="heading" instead. */}
        <span className="area-card__name" role="heading" aria-level={3}>
          {area.name}
        </span>
        <span aria-hidden="true" className="area-card__mark">
          &#8595;
        </span>
      </button>

      <p className="area-card__summary">{area.summary}</p>

      {selected && (
        <div
          className="service-panel"
          id={`area-panel-${area.id}`}
          aria-live="polite"
        >
          {area.services.length > 0 ? (
            <div className="service-list">
              {area.services.map((service) => (
                <button
                  key={service.id}
                  className="service-button"
                  type="button"
                  onClick={() =>
                    onContact({
                      area: area.name,
                      service: service.name,
                    })
                  }
                >
                  <strong>{service.name}</strong>
                  <span>{service.description}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="service-panel__empty">
              <button
                className="button-primary"
                type="button"
                onClick={() => onContact({ area: area.name })}
              >
                Entrar em contato
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function PracticeExplorer({ onContact }: PracticeExplorerProps) {
  const [audience, setAudience] = useState<Audience>('individual')
  const [activeAreaId, setActiveAreaId] = useState<string | null>('previdenciario')
  const tabRefs = useRef<Record<Audience, HTMLButtonElement | null>>({
    individual: null,
    business: null,
  })
  const heading = useReveal<HTMLDivElement>()
  const areas = useMemo(
    () => practiceAreas.filter((area) => area.audience === audience),
    [audience],
  )

  function changeAudience(nextAudience: Audience) {
    const nextAreas = practiceAreas.filter(
      (area) => area.audience === nextAudience,
    )

    setAudience(nextAudience)
    setActiveAreaId(nextAreas.at(0)!.id)
  }

  function handleAudienceKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = audiences.findIndex(({ id }) => id === audience)
    let nextIndex: number

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % audiences.length
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + audiences.length) % audiences.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = audiences.length - 1
        break
      default:
        return
    }

    event.preventDefault()

    const nextAudience = audiences[nextIndex].id
    changeAudience(nextAudience)
    tabRefs.current[nextAudience]?.focus()
  }

  return (
    <section
      className="practice-explorer section"
      id="areas"
      aria-labelledby="practice-title"
    >
      <div className={`practice-explorer__heading reveal ${heading.revealClassName}`} ref={heading.ref}>
        <p className="eyebrow">Áreas de atuação</p>
        <h2
          className="section-title practice-explorer__title"
          id="practice-title"
        >
          Encontre a orientação que você procura.
        </h2>
      </div>

      <div className="audience-tabs" role="tablist" aria-label="Público">
        {audiences.map(({ id, label }) => {
          const selected = id === audience

          return (
            <button
              key={id}
              id={`${id}-tab`}
              className="audience-tab"
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="area-grid"
              tabIndex={selected ? 0 : -1}
              ref={(element) => {
                tabRefs.current[id] = element
              }}
              onClick={() => changeAudience(id)}
              onKeyDown={handleAudienceKeyDown}
            >
              {label}
            </button>
          )
        })}
      </div>

      <div className="practice-explorer__content">
        <div className="area-grid" id="area-grid" aria-label="Áreas disponíveis">
          {areas.map((area) => {
            const globalIndex = practiceAreas.findIndex((item) => item.id === area.id)

            return (
              <AreaCard
                key={area.id}
                area={area}
                index={globalIndex}
                selected={area.id === activeAreaId}
                onToggle={() =>
                  setActiveAreaId((current) => (current === area.id ? null : area.id))
                }
                onContact={onContact}
              />
            )
          })}
        </div>

        <button
          className="practice-explorer__other"
          type="button"
          onClick={() => onContact({ otherSubject: true })}
        >
          Não encontrou sua área? Fale com o escritório.
        </button>
      </div>
    </section>
  )
}
