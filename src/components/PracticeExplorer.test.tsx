import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PracticeExplorer } from './PracticeExplorer'

afterEach(cleanup)

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
      screen.getByRole('button', {
        name: /não encontrou sua área\? fale com o escritório/i,
      }),
    )

    expect(onContact).toHaveBeenLastCalledWith({ otherSubject: true })
  })

  it('changes the active audience with standard tab keyboard controls', async () => {
    const user = userEvent.setup()

    render(<PracticeExplorer onContact={vi.fn()} />)

    const individualTab = screen.getByRole('tab', { name: /para você/i })
    const businessTab = screen.getByRole('tab', {
      name: /para sua empresa/i,
    })

    individualTab.focus()
    await user.keyboard('{ArrowRight}')

    expect(businessTab).toHaveFocus()
    expect(businessTab).toHaveAttribute('aria-selected', 'true')
    expect(individualTab).toHaveAttribute('aria-selected', 'false')
    expect(
      screen.getByRole('button', { name: /^direito empresarial$/i }),
    ).toHaveAttribute('aria-pressed', 'false')

    await user.keyboard('{ArrowRight}')

    expect(individualTab).toHaveFocus()
    expect(individualTab).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowDown}')

    expect(businessTab).toHaveFocus()
    expect(businessTab).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowUp}')

    expect(individualTab).toHaveFocus()
    expect(individualTab).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{Home}')

    expect(individualTab).toHaveFocus()
    expect(individualTab).toHaveAttribute('aria-selected', 'true')
    expect(
      screen.getByRole('button', { name: /^direito previdenciário$/i }),
    ).toHaveAttribute('aria-pressed', 'false')

    await user.keyboard('{End}')

    expect(businessTab).toHaveFocus()
    expect(businessTab).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowLeft}')

    expect(individualTab).toHaveFocus()
    expect(individualTab).toHaveAttribute('aria-selected', 'true')
  })
})
