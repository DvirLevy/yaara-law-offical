import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import OfficeMap from '../../components/OfficeMap'

describe('OfficeMap', () => {
  it('renders the decorative placeholder when no API key is configured', () => {
    render(<OfficeMap address="שד׳ הרכס 13, מודיעין" title="משרד YL" subtitle="שד׳ הרכס 13" />)

    expect(screen.getByText('משרד YL')).toBeInTheDocument()
    expect(screen.getByText('שד׳ הרכס 13')).toBeInTheDocument()
    // No API key in the test env, so the live map never mounts.
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
