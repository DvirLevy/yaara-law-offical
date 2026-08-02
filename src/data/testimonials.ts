import { useEffect, useState } from 'react'

import {
  meta as TESTIMONIALS_META_FALLBACK,
  items as TESTIMONIALS_FALLBACK,
  type Testimonial,
} from '../../content/testimonials'
import { useContent } from '../lib/content'
import { fetchGooglePlaceReviews, type GooglePlaceReviews } from '../lib/googlePlaces'

export type { Testimonial }

interface TestimonialsContent {
  meta: typeof TESTIMONIALS_META_FALLBACK
  items: Testimonial[]
}

const FALLBACK: TestimonialsContent = { meta: TESTIMONIALS_META_FALLBACK, items: TESTIMONIALS_FALLBACK }

let googleCache: GooglePlaceReviews | null = null

function withGoogleReviews(base: TestimonialsContent, google: GooglePlaceReviews): TestimonialsContent {
  return {
    meta: {
      ...base.meta,
      google_rating: google.rating.toFixed(1),
      google_label: `${google.userRatingCount.toLocaleString('he-IL')} ${base.meta.google_label}`,
    },
    items: google.reviews.map((r) => ({ q: r.text, n: r.authorName, r: r.relativeTime })),
  }
}

/** Testimonial copy — live Google reviews when VITE_GOOGLE_MAPS_API_KEY /
 *  VITE_GOOGLE_PLACE_ID are both set (see src/lib/googlePlaces.ts), otherwise
 *  runtime-loaded copy via src/lib/content.ts, falling back to
 *  content/testimonials.ts. Any failure at any stage silently keeps the
 *  previous/bundled copy — this section never blocks or errors visibly. */
export function useTestimonials(): TestimonialsContent {
  const base = useContent('testimonials', FALLBACK)
  const [google, setGoogle] = useState<GooglePlaceReviews | null>(googleCache)

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID
    if (!apiKey || !placeId || googleCache) return
    let cancelled = false

    fetchGooglePlaceReviews(apiKey, placeId)
      .then((result) => {
        if (result.reviews.length === 0) return
        googleCache = result
        if (!cancelled) setGoogle(result)
      })
      .catch((err) => {
        console.warn('[testimonials] using bundled reviews, Google Places fetch failed:', err)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return google ? withGoogleReviews(base, google) : base
}
