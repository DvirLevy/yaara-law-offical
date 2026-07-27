import {
  meta as TESTIMONIALS_META_FALLBACK,
  items as TESTIMONIALS_FALLBACK,
  type Testimonial,
} from '../../content/testimonials'
import { useContent } from '../lib/content'

export type { Testimonial }

interface TestimonialsContent {
  meta: typeof TESTIMONIALS_META_FALLBACK
  items: Testimonial[]
}

const FALLBACK: TestimonialsContent = { meta: TESTIMONIALS_META_FALLBACK, items: TESTIMONIALS_FALLBACK }

/** Runtime-loaded testimonial copy — see src/lib/content.ts for the
 *  dev-static / prod-fetch behavior. Falls back to content/testimonials.ts. */
export function useTestimonials(): TestimonialsContent {
  return useContent('testimonials', FALLBACK)
}
