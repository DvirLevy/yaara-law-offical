import { useCallback, useRef, useState, type RefObject } from 'react'

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY
const TOKEN_WAIT_TIMEOUT_MS = 10_000
const TOKEN_POLL_INTERVAL_MS = 150

interface TurnstileRenderOptions {
  sitekey: string
  action: string
  language: string
  theme: 'light'
  callback: (token: string) => void
  'error-callback': () => void
  'expired-callback': () => void
}

interface TurnstileApi {
  render(container: HTMLElement, options: TurnstileRenderOptions): string
  reset(widgetId?: string): void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
    [callback: `__turnstileCallback_${string}`]: (() => void) | undefined
  }
}

let scriptPromise: Promise<void> | null = null

/** Loads the Turnstile script once per session (module-level cache), mirroring
 *  the pattern in src/lib/googlePlaces.ts — the script's own `onload` param
 *  fires once `window.turnstile` is actually attached, unlike the `<script>`
 *  tag's `onload` which can fire earlier. `render=explicit` means widgets are
 *  only created via `turnstile.render()`, never auto-rendered on page load. */
export function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    const callbackName = `__turnstileCallback_${Math.random().toString(36).slice(2)}` as const
    window[callbackName] = () => {
      delete window[callbackName]
      resolve()
    }

    const script = document.createElement('script')
    script.src = `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=${callbackName}`
    script.async = true
    script.defer = true
    script.onerror = () => {
      scriptPromise = null
      delete window[callbackName]
      reject(new Error('Failed to load Cloudflare Turnstile script'))
    }
    document.head.appendChild(script)
  })

  return scriptPromise
}

export type TurnstileStatus = 'idle' | 'loading' | 'ready' | 'unavailable'

export interface UseTurnstileResult {
  containerRef: RefObject<HTMLDivElement>
  /** Loads the script and renders the widget. Call on first form focus, not on mount. Idempotent. */
  arm: () => void
  /** Resolves with the current token, or `null` if the widget never produced
   *  one within the wait window (fail-open — caller submits without it). */
  getToken: () => Promise<string | null>
  /** Clears the token and resets the widget. Call after every submit attempt — tokens are single-use. */
  reset: () => void
  status: TurnstileStatus
}

/** Cloudflare Turnstile widget, in explicit-render mode. No sitekey configured,
 *  script failure, or a widget error all resolve to `status: 'unavailable'` —
 *  callers are expected to fail open (submit without a token) rather than block. */
export function useTurnstile(action: 'cta' | 'contact'): UseTurnstileResult {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const tokenRef = useRef<string | null>(null)
  const armedRef = useRef(false)
  const [status, setStatus] = useState<TurnstileStatus>('idle')

  const arm = useCallback(() => {
    if (armedRef.current) return
    if (!SITE_KEY) {
      setStatus('unavailable')
      return
    }
    armedRef.current = true
    setStatus('loading')

    loadTurnstileScript()
      .then(() => {
        if (!containerRef.current || !window.turnstile) throw new Error('turnstile unavailable')
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          action,
          language: 'he',
          theme: 'light',
          callback: (token) => {
            tokenRef.current = token
            setStatus('ready')
          },
          'error-callback': () => {
            tokenRef.current = null
            setStatus('unavailable')
          },
          'expired-callback': () => {
            tokenRef.current = null
            if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current)
          },
        })
      })
      .catch(() => setStatus('unavailable'))
  }, [action])

  const getToken = useCallback(async (): Promise<string | null> => {
    const start = Date.now()
    while (!tokenRef.current) {
      if (status === 'unavailable' || Date.now() - start >= TOKEN_WAIT_TIMEOUT_MS) return null
      await new Promise((r) => setTimeout(r, TOKEN_POLL_INTERVAL_MS))
    }
    return tokenRef.current
  }, [status])

  const reset = useCallback(() => {
    tokenRef.current = null
    if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current)
  }, [])

  return { containerRef, arm, getToken, reset, status }
}
