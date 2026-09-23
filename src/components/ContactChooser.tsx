import { useEffect, useRef } from 'react'
import { MessageCircle, X } from 'lucide-react'

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

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelector),
  ).filter(
    (element) =>
      !element.hidden &&
      element.tabIndex >= 0 &&
      element.getAttribute('aria-hidden') !== 'true',
  )
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
  const dialogRef = useRef<HTMLElement>(null)
  const onCloseRef = useRef(onClose)

  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) {
      return
    }

    const dialog = dialogRef.current
    const backdrop = dialog?.parentElement

    if (!dialog || !backdrop) {
      return
    }

    const activeDialog: HTMLElement = dialog
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    closeButtonRef.current?.focus()

    const siblingStates = Array.from(
      backdrop.parentElement?.children ?? [],
    )
      .filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement && element !== backdrop,
      )
      .map((element) => ({
        element,
        hadAttribute: element.hasAttribute('inert'),
        attributeValue: element.getAttribute('inert'),
      }))

    siblingStates.forEach(({ element }) => element.setAttribute('inert', ''))

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusableElements = getFocusableElements(activeDialog)
      const firstElement = focusableElements[0]
      const lastElement = focusableElements.at(-1)

      if (!firstElement || !lastElement) {
        return
      }

      const activeElement = document.activeElement
      const focusIsOutsideDialog =
        !(activeElement instanceof Node) ||
        !activeDialog.contains(activeElement)

      if (
        event.shiftKey &&
        (activeElement === firstElement || focusIsOutsideDialog)
      ) {
        event.preventDefault()
        lastElement.focus()
      } else if (
        !event.shiftKey &&
        (activeElement === lastElement || focusIsOutsideDialog)
      ) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousBodyOverflow

      siblingStates.forEach(
        ({ element, hadAttribute, attributeValue }) => {
          if (hadAttribute) {
            element.setAttribute('inert', attributeValue ?? '')
          } else {
            element.removeAttribute('inert')
          }
        },
      )

      if (previouslyFocusedElement?.isConnected) {
        previouslyFocusedElement.focus()
      }
    }
  }, [open])

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
        ref={dialogRef}
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
              <span className="attorney-choice__icon" aria-hidden="true">
                <MessageCircle strokeWidth={1.75} />
              </span>
              <span className="attorney-choice__body">
                <strong>{attorney.name}</strong>
                <span>{attorney.oab}</span>
                <span>{formatPhone(attorney.phone)}</span>
              </span>
              <span className="attorney-choice__cta">
                Conversar no WhatsApp
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
