import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AttorneyProfiles, Faq, Header, Hero } from './InstitutionalSections'

describe('Header', () => {
  it('keeps mobile navigation links hidden until the native menu opens and closes it after a selection', () => {
    render(<Header onContact={() => undefined} />)

    const summary = screen.getByText('Menu')
    const menu = summary.closest('details')
    const menuNavigation = menu?.querySelector('nav[aria-label="Navegação do menu"]')

    expect(menu).not.toBeNull()
    expect(menuNavigation).not.toBeNull()
    expect(menu).not.toHaveAttribute('open')
    expect(menuNavigation).toHaveAttribute('hidden')

    const details = menu as HTMLDetailsElement
    details.open = true
    fireEvent(details, new Event('toggle', { bubbles: true }))

    expect(menu).toHaveAttribute('open')
    expect(menuNavigation).not.toHaveAttribute('hidden')

    fireEvent.click(within(menuNavigation as HTMLElement).getByRole('link', { name: 'Contato' }))

    expect(menu).not.toHaveAttribute('open')
    expect(menuNavigation).toHaveAttribute('hidden')
  })
})

describe('Faq', () => {
  it('uses native disclosure controls for its answers', () => {
    render(<Faq />)

    const summary = screen.getByText('Como começo o contato?')
    const disclosure = summary.closest('details')

    expect(disclosure).not.toHaveAttribute('open')

    fireEvent.click(summary)

    expect(disclosure).toHaveAttribute('open')
  })
})

describe('Approved photographs', () => {
  it('renders the approved office and attorney photographs as responsive WebP variants', () => {
    render(
      <>
        <Hero onContact={() => undefined} />
        <AttorneyProfiles />
      </>,
    )

    const photos: Array<[string, string]> = [
      [
        'Ana Paula Almeida e Deyvison Ribeiro, advogados do escritório Almeida Ribeiro',
        'hero-casal',
      ],
      ['Foto de Ana Paula Almeida', 'ana-paula-almeida'],
      ['Foto de Deyvison Ribeiro', 'deyvison-ribeiro'],
      ['Ana Paula Almeida e Deyvison Ribeiro', 'equipe-almeida-ribeiro'],
    ]

    for (const [alt, id] of photos) {
      const img = screen.getByAltText(alt)

      expect(img.getAttribute('src')).toMatch(
        new RegExp(`^/images/photos/${id}-\\d+\\.webp$`),
      )
      expect(img.getAttribute('srcset')).toContain(`/images/photos/${id}-480.webp 480w`)
    }
  })
})
