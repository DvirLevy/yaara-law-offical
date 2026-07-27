import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Areas from './Areas'
import { meta, items } from '../../content/areas'

describe('Areas', () => {
  it('renders the section heading, lede and every practice area', () => {
    render(<Areas />)

    expect(screen.getByText(meta.title_plain)).toBeInTheDocument()
    expect(screen.getByText(meta.lede)).toBeInTheDocument()

    for (const a of items) {
      expect(screen.getByText(a.title)).toBeInTheDocument()
      expect(screen.getByText(a.desc)).toBeInTheDocument()
    }
  })

  it('is the #areas anchor target', () => {
    const { container } = render(<Areas />)
    expect(container.querySelector('#areas')).toBeInTheDocument()
  })
})
