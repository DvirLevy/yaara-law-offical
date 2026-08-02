import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

import Testimonials from '../../components/Testimonials'
import { meta, items } from '../../../content/testimonials'

vi.mock('../../lib/googlePlaces', () => ({
  fetchGooglePlaceReviews: vi.fn(),
}))

describe('Testimonials', () => {
  beforeEach(async () => {
    // Real credentials may be set in the local .env — force the "no live
    // reviews" baseline explicitly so these tests don't depend on that.
    vi.stubEnv('VITE_GOOGLE_MAPS_API_KEY', '')
    vi.stubEnv('VITE_GOOGLE_PLACE_ID', '')
    const { fetchGooglePlaceReviews } = await import('../../lib/googlePlaces')
    vi.mocked(fetchGooglePlaceReviews).mockResolvedValue({ rating: 0, userRatingCount: 0, reviews: [] })
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetAllMocks()
  })

  it('renders the section heading and google rating from bundled fallback (no Google env vars set)', () => {
    render(<Testimonials />)

    expect(screen.getByText(meta.title_plain)).toBeInTheDocument()
    expect(screen.getByText(meta.google_rating)).toBeInTheDocument()
  })

  it('renders every testimonial quote as a carousel slide', () => {
    render(<Testimonials />)

    for (const t of items) {
      expect(screen.getAllByText(t.q).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('renders live Google reviews once fetched, when both env vars are set', async () => {
    vi.stubEnv('VITE_GOOGLE_MAPS_API_KEY', 'test-key')
    vi.stubEnv('VITE_GOOGLE_PLACE_ID', 'test-place-id')
    const { fetchGooglePlaceReviews } = await import('../../lib/googlePlaces')
    vi.mocked(fetchGooglePlaceReviews).mockResolvedValue({
      rating: 4.9,
      userRatingCount: 42,
      reviews: [{ authorName: 'דנה כהן', rating: 5, text: 'שירות מעולה', relativeTime: 'לפני שבוע' }],
    })

    render(<Testimonials />)

    await waitFor(() => expect(screen.getAllByText('שירות מעולה').length).toBeGreaterThanOrEqual(1))
    expect(screen.getAllByText('דנה כהן').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('4.9')).toBeInTheDocument()
  })
})
