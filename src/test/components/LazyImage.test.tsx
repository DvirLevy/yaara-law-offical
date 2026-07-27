import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import LazyImage from '../../components/LazyImage'

describe('LazyImage', () => {
  it('defaults to lazy loading and async decoding', () => {
    render(<LazyImage src="/x.png" alt="x" />)
    const img = screen.getByAltText('x')
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(img).toHaveAttribute('decoding', 'async')
  })

  it('opts into eager, high-priority loading when priority is set', () => {
    render(<LazyImage priority src="/x.png" alt="x" />)
    const img = screen.getByAltText('x')
    expect(img).toHaveAttribute('loading', 'eager')
    expect(img).toHaveAttribute('fetchpriority', 'high')
  })
})
