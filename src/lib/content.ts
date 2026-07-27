import { useEffect, useState } from 'react'

const CONTENT_BASE_URL = import.meta.env.VITE_CONTENT_BASE_URL
const cache = new Map<string, unknown>()

/**
 * Section copy loader.
 *
 * - Local dev / no `VITE_CONTENT_BASE_URL` set: returns `fallback` — the
 *   bundled `content/*.ts` module for that section — synchronously. No
 *   network request is made, so `npm run dev` never depends on the cloud.
 * - Production build with `VITE_CONTENT_BASE_URL` set: fetches
 *   `${VITE_CONTENT_BASE_URL}/{key}.json` once at runtime, caches it in
 *   memory for the session, and silently keeps showing the bundled
 *   `content/*.ts` fallback if the fetch fails or hasn't resolved yet.
 *
 * `content/*.ts` modules are therefore both the TypeScript type source
 * *and* the offline/first-paint fallback — never treat them as unused
 * once the CDN is wired up.
 */
export function useContent<T>(key: string, fallback: T): T {
  const [data, setData] = useState<T>(() => (cache.has(key) ? (cache.get(key) as T) : fallback))

  useEffect(() => {
    if (!CONTENT_BASE_URL || cache.has(key)) return
    let cancelled = false

    fetch(`${CONTENT_BASE_URL}/${key}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`content fetch failed for "${key}": ${res.status}`)
        return res.json() as Promise<T>
      })
      .then((json) => {
        cache.set(key, json)
        if (!cancelled) setData(json)
      })
      .catch((err) => {
        // Keep rendering the bundled fallback; surface the failure for monitoring.
        console.warn(`[content] using bundled fallback for "${key}":`, err)
      })

    return () => {
      cancelled = true
    }
  }, [key])

  return data
}
