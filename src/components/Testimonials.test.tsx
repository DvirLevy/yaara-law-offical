import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Testimonials from './Testimonials'
import { meta, items } from '../../content/testimonials'

describe('Testimonials', () => {
  it('renders the section heading and google rating', () => {
    render(<Testimonials />)

    expect(screen.getByText(meta.title_plain)).toBeInTheDocument()
    expect(screen.getByText(meta.google_rating)).toBeInTheDocument()
  })

  it('renders every testimonial quote (duplicated once for the marquee loop)', () => {
    render(<Testimonials />)

    for (const t of items) {
      expect(screen.getAllByText(t.q).length).toBeGreaterThanOrEqual(1)
    }
  })
})
