import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App', () => {
  it('renders the approved primary heading and contact routes', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /^direito aplicado à realidade de quem vive e empreende no vale do jaguaribe\.$/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /falar com o escritório/i })).toHaveLength(4)
    expect(screen.getByRole('link', { name: /falar com ana paula/i })).toHaveAttribute(
      'href',
      expect.stringContaining('wa.me/5588996575592'),
    )
    expect(screen.getByRole('link', { name: /falar com deyvison/i })).toHaveAttribute(
      'href',
      expect.stringContaining('wa.me/5585996274319'),
    )
    expect(screen.getByRole('link', { name: /ver endereço no mapa/i })).toHaveAttribute(
      'href',
      expect.stringContaining('google.com/maps/search/?api=1&query='),
    )
  })

  it('opens the shared attorney chooser from an attorney profile', () => {
    render(<App />)

    fireEvent.click(screen.getAllByRole('button', { name: /falar com o escritório/i })[2])

    expect(screen.getByRole('dialog', { name: /escolha com quem falar/i })).toBeInTheDocument()
  })
})
