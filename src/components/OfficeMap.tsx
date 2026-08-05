import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'

import { loadMapsScript } from '@/lib/googlePlaces'

interface Props {
  address: string
  title: string
  subtitle: string
}

// Muted, brand-adjacent styling — hides the default POI/transit clutter so
// the embedded map reads closer to the rest of the site than stock Google
// Maps chrome.
const MAP_STYLES = [
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'off' }] },
]

/** Renders a real, geocoded Google Map centered on `address` when
 *  VITE_GOOGLE_MAPS_API_KEY is set (reusing the same loader/key as the live
 *  Testimonials reviews, see src/lib/googlePlaces.ts). Any failure — no key,
 *  script load error, geocoding miss — silently keeps the decorative pin
 *  placeholder instead, matching the rest of the site's fallback convention. */
export default function OfficeMap({ address, title, subtitle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    if (!apiKey || !containerRef.current) return
    let cancelled = false

    const run = async () => {
      await loadMapsScript(apiKey)
      const [{ Map }, { Marker }, { Geocoder }] = await Promise.all([
        window.google!.maps.importLibrary('maps'),
        window.google!.maps.importLibrary('marker'),
        window.google!.maps.importLibrary('geocoding'),
      ])

      const { results } = await new Geocoder().geocode({ address })
      const location = results[0]?.geometry.location
      if (!location || cancelled || !containerRef.current) return

      const position = { lat: location.lat(), lng: location.lng() }
      const map = new Map(containerRef.current, {
        center: position,
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: true,
        styles: MAP_STYLES,
      })
      new Marker({ position, map, title })

      if (!cancelled) setReady(true)
    }

    run().catch(() => {
      // keep the placeholder — see file-level doc comment
    })

    return () => {
      cancelled = true
    }
  }, [address, title])

  return (
    <div className="relative aspect-video overflow-hidden border border-hairline bg-panel-2">
      {!ready && (
        <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
          <div className="grid h-[42px] w-[42px] animate-pin-pulse place-items-center rounded-full bg-primary text-white">
            <MapPin className="h-5 w-5" />
          </div>
        </div>
      )}
      <div ref={containerRef} className="absolute inset-0" {...(ready ? { role: 'img', 'aria-label': `מפה — ${title}` } : {})} />
      <div className="absolute bottom-4 end-4 border border-hairline bg-card px-4 py-2.5 text-xs text-ink-soft shadow-card">
        <b className="mb-0.5 block font-serif text-[13px] font-bold text-foreground">{title}</b>
        {subtitle}
      </div>
    </div>
  )
}
