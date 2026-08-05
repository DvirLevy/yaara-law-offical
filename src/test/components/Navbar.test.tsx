import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Navbar from '../../components/Navbar'
import navFallback from '../../../content/navbar'

describe('Navbar', () => {
  it('renders every nav link and the booking CTA', () => {
    render(<Navbar />)

    // Every nav item is rendered twice (desktop bar + mobile drawer).
    expect(screen.getAllByText(navFallback.nav_about).length).toBeGreaterThan(0)
    expect(screen.getAllByText(navFallback.nav_areas).length).toBeGreaterThan(0)
    expect(screen.getAllByText(navFallback.nav_testimonials).length).toBeGreaterThan(0)
    expect(screen.getAllByText(navFallback.nav_contact).length).toBeGreaterThan(0)
    expect(screen.getAllByText(navFallback.cta_label).length).toBeGreaterThan(0)
  })

  it('renders the firm logo', () => {
    render(<Navbar />)
    expect(screen.getByAltText('יערה לוי משרד עורכי דין')).toBeInTheDocument()
  })

  it('has a mobile menu toggle', () => {
    render(<Navbar />)
    expect(screen.getByLabelText('תפריט')).toBeInTheDocument()
  })
})
