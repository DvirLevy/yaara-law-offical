import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import App from '../App'
import heroFallback from '../../content/hero'
import footerFallback from '../../content/footer'

describe('App', () => {
  it('renders the hero eagerly and every lazy section eventually', async () => {
    render(<App />)

    // Above-the-fold content is available on first render.
    expect(screen.getByRole('heading', { level: 1, name: heroFallback.name })).toBeInTheDocument()

    // Below-the-fold sections are React.lazy() — they resolve asynchronously.
    expect(await screen.findByText(new RegExp(footerFallback.email))).toBeInTheDocument()
  })
})
