import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App', () => {
  it('renders the approved primary heading and contact routes', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /^direito aplicado à realidade de quem vive e empreende no vale do jaguaribe e em todo o brasil\.$/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /falar com o escritório/i })).toHaveLength(3)
    expect(screen.getByRole('link', { name: /falar com ana paula/i })).toHaveAttribute(
      'href',
      expect.stringContaining('wa.me/5588996575592'),
    )
    expect(screen.getByRole('link', { name: /falar com deyvison/i })).toHaveAttribute(
      'href',
      expect.stringContaining('wa.me/5585996274319'),
    )
    expect(screen.getByRole('link', { name: /abrir localização.*no google maps/i })).toHaveAttribute(
      'href',
      expect.stringContaining('google.com/maps?q='),
    )
  })

  it('opens the shared attorney chooser from the header', () => {
    render(<App />)

    fireEvent.click(screen.getAllByRole('button', { name: /falar com o escritório/i })[0])

    expect(screen.getByRole('dialog', { name: /escolha com quem falar/i })).toBeInTheDocument()
  })

  it('moves focus to the main content from the skip link', () => {
    render(<App />)
    const skipLink = screen.getAllByRole('link', {
      name: /pular para o conteúdo/i,
    }).at(-1)
    const mainContent = skipLink?.parentElement?.getElementsByTagName('main')[0]

    expect(skipLink).not.toBeNull()
    expect(mainContent).not.toBeNull()

    fireEvent.click(skipLink!)

    expect(mainContent).toHaveFocus()
  })
})
