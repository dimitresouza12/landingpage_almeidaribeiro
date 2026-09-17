import { useState } from 'react'
import { render, screen } from '@testing-library/react'
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
})
