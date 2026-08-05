import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Hero from '../../components/Hero'
import heroFallback from '../../../content/hero'

describe('Hero', () => {
  it('renders the headline, badge and portrait', () => {
    render(<Hero />)

    expect(screen.getByRole('heading', { level: 1, name: heroFallback.name })).toBeInTheDocument()
    expect(screen.getByText(heroFallback.badge)).toBeInTheDocument()
    expect(screen.getByText(heroFallback.eyebrow_line2_bold)).toBeInTheDocument()
    expect(screen.getByAltText('עו״ד יערה לוי')).toBeInTheDocument()
  })

  it('is the #top anchor target', () => {
    const { container } = render(<Hero />)
    expect(container.querySelector('#top')).toBeInTheDocument()
  })
})
