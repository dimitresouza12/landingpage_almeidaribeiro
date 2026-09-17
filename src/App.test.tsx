import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App', () => {
  it('renders the primary heading and contact action', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /^advocacia para pessoas e empresas\.$/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('button', { name: /entrar em contato/i }),
    ).not.toHaveLength(0)
  })
})
