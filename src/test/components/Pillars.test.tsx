import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Pillars from './Pillars'
import pillarsFallback from '../../content/pillars'

describe('Pillars', () => {
  it('renders one card per pillar with its label and description', () => {
    render(<Pillars />)

    for (const p of pillarsFallback) {
      expect(screen.getByText(p.label)).toBeInTheDocument()
      expect(screen.getByText(p.desc)).toBeInTheDocument()
    }
  })
})
