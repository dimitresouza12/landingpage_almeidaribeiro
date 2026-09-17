import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { PracticeExplorer } from './PracticeExplorer'

describe('PracticeExplorer', () => {
  it('guides a visitor from audience to area and service', async () => {
    const user = userEvent.setup()
    const onContact = vi.fn()

    render(<PracticeExplorer onContact={onContact} />)

    await user.click(
      screen.getByRole('button', { name: /^direito civil$/i }),
    )
    await user.click(screen.getByRole('button', { name: /divórcio/i }))

    expect(onContact).toHaveBeenCalledWith({
      area: 'Direito Civil',
      service: 'Divórcio',
    })

    await user.click(
      screen.getByRole('tab', { name: /para sua empresa/i }),
    )

    expect(
      screen.getByRole('button', { name: /direito empresarial/i }),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: /outro assunto/i }),
    )

    expect(onContact).toHaveBeenLastCalledWith({ otherSubject: true })
  })
})
