import { meta as AREAS_META_FALLBACK, items as AREAS_FALLBACK, type Area } from '../../content/areas'
import { useContent } from '../lib/content'

export type { Area }

interface AreasContent {
  meta: typeof AREAS_META_FALLBACK
  items: Area[]
}

const FALLBACK: AreasContent = { meta: AREAS_META_FALLBACK, items: AREAS_FALLBACK }

/** Runtime-loaded practice-area copy — see src/lib/content.ts for the
 *  dev-static / prod-fetch behavior. Falls back to content/areas.ts. */
export function useAreas(): AreasContent {
  return useContent('areas', FALLBACK)
}
