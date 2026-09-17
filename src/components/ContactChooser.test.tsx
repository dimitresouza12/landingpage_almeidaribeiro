import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { ContactChooser } from './ContactChooser'

function Harness() {
  const [open, setOpen] = useState(true)

  return (
    <ContactChooser
      open={open}
      onClose={() => setOpen(false)}
      topic={{ area: 'Direito Civil', service: 'Divórcio' }}
    />
  )
}

function InteractiveHarness() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Abrir contato
      </button>
      <aside data-testid="future-section">Conteúdo futuro</aside>
      <aside data-testid="already-inert" inert>
        Conteúdo indisponível
      </aside>
      <ContactChooser open={open} onClose={() => setOpen(false)} />
    </>
  )
}

describe('ContactChooser', () => {
  it('offers both attorneys through contextual WhatsApp links and closes', async () => {
    const user = userEvent.setup()

    render(<Harness />)

    expect(
      screen.getByRole('dialog', { name: /escolha com quem falar/i }),
    ).toBeVisible()

    const closeButton = screen.getByRole('button', { name: /fechar/i })
    expect(closeButton).toHaveFocus()

    const anaLink = screen.getByRole('link', { name: /ana paula almeida/i })
    const deyvisonLink = screen.getByRole('link', {
      name: /deyvison ribeiro/i,
    })

    expect(screen.getByText('(88) 99657-5592')).toBeInTheDocument()
    expect(screen.getByText('(85) 99627-4319')).toBeInTheDocument()

    expect(anaLink).toHaveAttribute(
      'href',
      expect.stringContaining('Direito%20Civil'),
    )
    expect(deyvisonLink).toHaveAttribute(
      'href',
      expect.stringContaining('Div%C3%B3rcio'),
    )

    await user.click(closeButton)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('contains focus, restores the trigger, and preserves sibling inert state', async () => {
    const user = userEvent.setup()

    render(<InteractiveHarness />)

    const trigger = screen.getByRole('button', { name: /abrir contato/i })
    const futureSection = screen.getByTestId('future-section')
    const alreadyInert = screen.getByTestId('already-inert')

    await user.click(trigger)

    const closeButton = screen.getByRole('button', { name: /fechar/i })
    const lastChoice = screen.getByRole('link', { name: /deyvison ribeiro/i })

    expect(closeButton).toHaveFocus()
    expect(trigger).toHaveAttribute('inert')
    expect(futureSection).toHaveAttribute('inert')
    expect(alreadyInert).toHaveAttribute('inert')

    await user.tab({ shift: true })
    expect(lastChoice).toHaveFocus()

    await user.tab()
    expect(closeButton).toHaveFocus()

    await user.click(closeButton)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(trigger).not.toHaveAttribute('inert')
    expect(futureSection).not.toHaveAttribute('inert')
    expect(alreadyInert).toHaveAttribute('inert')

    await user.click(trigger)
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()

    await user.click(trigger)

    const backdrop = screen.getByRole('dialog').parentElement
    expect(backdrop).not.toBeNull()
    fireEvent.mouseDown(backdrop!)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(trigger).not.toHaveAttribute('inert')
    expect(futureSection).not.toHaveAttribute('inert')
    expect(alreadyInert).toHaveAttribute('inert')
  })
})
