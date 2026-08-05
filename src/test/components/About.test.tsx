import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import About from '../../components/About'
import aboutFallback from '../../../content/about'

describe('About', () => {
  it('renders the bio copy, portrait tag and phrase', () => {
    render(<About />)

    expect(screen.getByText(aboutFallback.p1)).toBeInTheDocument()
    expect(screen.getByText(aboutFallback.p2)).toBeInTheDocument()
    expect(screen.getByText(aboutFallback.portrait_name)).toBeInTheDocument()
    expect(screen.getByText(aboutFallback.phrase_quote)).toBeInTheDocument()
    expect(screen.getByAltText('עו״ד יערה לוי')).toBeInTheDocument()
  })

  it('is the #about anchor target', () => {
    const { container } = render(<About />)
    expect(container.querySelector('#about')).toBeInTheDocument()
  })
})
