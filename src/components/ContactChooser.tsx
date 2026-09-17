import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

import { attorneys } from '../data/site'
import {
  buildWhatsAppUrl,
  type WhatsAppTopic,
} from '../lib/whatsapp'

export type ContactTopic = WhatsAppTopic

type ContactChooserProps = {
  open: boolean
  onClose: () => void
  topic?: ContactTopic
}

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  const areaCode = digits.slice(2, 4)
  const localNumber = digits.slice(4)

  return `(${areaCode}) ${localNumber.slice(0, 5)}-${localNumber.slice(5)}`
}

export function ContactChooser({
  open,
  onClose,
  topic,
}: ContactChooserProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, open])

  if (!open) {
    return null
  }

  return (
    <div
      className="dialog-backdrop"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        className="contact-chooser"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-chooser-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className="contact-chooser__close"
          type="button"
          aria-label="Fechar"
          onClick={onClose}
        >
          <X aria-hidden="true" />
        </button>

        <p className="eyebrow">Contato via WhatsApp</p>
        <h2 id="contact-chooser-title" className="contact-chooser__title">
          Escolha com quem falar
        </h2>

        <div className="contact-chooser__choices">
          {attorneys.map((attorney) => (
            <a
              key={attorney.id}
              className="attorney-choice"
              href={buildWhatsAppUrl(attorney.phone, topic)}
              target="_blank"
              rel="noreferrer"
            >
              <strong>{attorney.name}</strong>
              <span>{attorney.oab}</span>
              <span>{formatPhone(attorney.phone)}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
