import { useMemo, useRef, useState, type KeyboardEvent } from 'react'

import {
  practiceAreas,
  type Audience,
  type PracticeArea,
} from '../data/site'
import type { ContactTopic } from './ContactChooser'

type PracticeExplorerProps = {
  onContact: (topic?: ContactTopic) => void
}

const audiences: Array<{ id: Audience; label: string }> = [
  { id: 'individual', label: 'Para você' },
  { id: 'business', label: 'Para sua empresa' },
]

export function PracticeExplorer({ onContact }: PracticeExplorerProps) {
  const [audience, setAudience] = useState<Audience>('individual')
  const [activeAreaId, setActiveAreaId] = useState('previdenciario')
  const tabRefs = useRef<Record<Audience, HTMLButtonElement | null>>({
    individual: null,
    business: null,
  })
  const areas = useMemo(
    () => practiceAreas.filter((area) => area.audience === audience),
    [audience],
  )
  const activeArea: PracticeArea =
    areas.find((area) => area.id === activeAreaId) ?? areas.at(0)!

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
      <p className="eyebrow">Áreas de atuação</p>
      <h2
        className="section-title practice-explorer__title"
        id="practice-title"
      >
        Encontre a orientação que você procura.
      </h2>

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
              aria-controls="practice-services"
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
        <div className="area-grid" aria-label="Áreas disponíveis">
          {areas.map((area) => (
            <button
              key={area.id}
              className="area-button"
              type="button"
              aria-pressed={area.id === activeArea.id}
              onClick={() => setActiveAreaId(area.id)}
            >
              {area.name}
            </button>
          ))}
          <button
            className="area-button area-button--other"
            type="button"
            onClick={() => onContact({ otherSubject: true })}
          >
            Outro assunto
          </button>
        </div>

        <aside
          className="service-panel"
          id="practice-services"
          role="tabpanel"
          aria-labelledby={`${audience}-tab`}
          aria-live="polite"
        >
          <p className="service-panel__label">{activeArea.name}</p>
          {activeArea.services.length > 0 ? (
            <div className="service-list">
              {activeArea.services.map((service) => (
                <button
                  key={service.id}
                  className="service-button"
                  type="button"
                  onClick={() =>
                    onContact({
                      area: activeArea.name,
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
              <p>Entre em contato para falar sobre esta área.</p>
              <button
                className="button-primary"
                type="button"
                onClick={() => onContact({ area: activeArea.name })}
              >
                Entrar em contato
              </button>
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}
