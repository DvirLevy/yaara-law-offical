export interface GoogleReview {
  authorName: string
  rating: number
  text: string
  relativeTime: string
}

export interface GooglePlaceReviews {
  rating: number
  userRatingCount: number
  reviews: GoogleReview[]
}

interface PlaceReview {
  rating: number
  text: { text: string } | string
  relativePublishTimeDescription: string
  authorAttribution: { displayName: string }
}

interface PlaceInstance {
  rating?: number
  userRatingCount?: number
  reviews?: PlaceReview[]
  fetchFields(options: { fields: string[] }): Promise<void>
}

interface PlacesLibrary {
  Place: new (options: { id: string }) => PlaceInstance
}

export interface LatLng {
  lat: number
  lng: number
}

interface MapInstance {}

export interface MapsLibrary {
  Map: new (el: HTMLElement, options: Record<string, unknown>) => MapInstance
}

interface MarkerInstance {}

export interface MarkerLibrary {
  Marker: new (options: { position: LatLng; map: MapInstance; title?: string }) => MarkerInstance
}

interface GeocoderResult {
  geometry: { location: { lat(): number; lng(): number } }
}

interface GeocoderInstance {
  geocode(request: { address: string }): Promise<{ results: GeocoderResult[] }>
}

export interface GeocodingLibrary {
  Geocoder: new () => GeocoderInstance
}

declare global {
  interface Window {
    google?: {
      maps: {
        importLibrary(library: 'places'): Promise<PlacesLibrary>
        importLibrary(library: 'maps'): Promise<MapsLibrary>
        importLibrary(library: 'marker'): Promise<MarkerLibrary>
        importLibrary(library: 'geocoding'): Promise<GeocodingLibrary>
      }
    }
    [callback: `__googleMapsCallback_${string}`]: (() => void) | undefined
  }
}

let scriptPromise: Promise<void> | null = null

export function loadMapsScript(apiKey: string): Promise<void> {
  if (window.google?.maps?.importLibrary) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    // `loading=async` means the outer <script> tag's own `onload` fires before
    // Google's bootstrap has finished attaching `google.maps.importLibrary` —
    // the documented contract is to wait for the `callback` param instead.
    const callbackName = `__googleMapsCallback_${Math.random().toString(36).slice(2)}` as const
    window[callbackName] = () => {
      delete window[callbackName]
      resolve()
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&loading=async&language=he&callback=${callbackName}`
    script.async = true
    script.onerror = () => {
      scriptPromise = null
      delete window[callbackName]
      reject(new Error('Failed to load Google Maps JavaScript API script'))
    }
    document.head.appendChild(script)
  })

  return scriptPromise
}

function reviewText(text: PlaceReview['text']): string {
  return typeof text === 'string' ? text : text.text
}

/** Fetches rating + reviews for a Google Business Place, via the Maps JavaScript API
 *  (client-side, works with an HTTP-referrer-restricted key — unlike the raw Places
 *  REST endpoint, which doesn't support browser CORS). Caller is responsible for
 *  catching failures and falling back to static copy; see useTestimonials(). */
export async function fetchGooglePlaceReviews(apiKey: string, placeId: string): Promise<GooglePlaceReviews> {
  await loadMapsScript(apiKey)
  const { Place } = await window.google!.maps.importLibrary('places')

  const place = new Place({ id: placeId })
  await place.fetchFields({ fields: ['rating', 'userRatingCount', 'reviews'] })

  return {
    rating: place.rating ?? 0,
    userRatingCount: place.userRatingCount ?? 0,
    reviews: (place.reviews ?? []).map((r) => ({
      authorName: r.authorAttribution.displayName,
      rating: r.rating,
      text: reviewText(r.text),
      relativeTime: r.relativePublishTimeDescription,
    })),
  }
}
