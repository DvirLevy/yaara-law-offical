import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Footer from '../../components/Footer'
import footerFallback from '../../../content/footer'

describe('Footer', () => {
  it('renders the current year and office contact links', () => {
    render(<Footer />)

    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument()
    expect(screen.getByText(footerFallback.email)).toBeInTheDocument()
  })
})
