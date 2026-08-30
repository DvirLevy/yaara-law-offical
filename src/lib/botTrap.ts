import { useEffect, useRef } from 'react'

const MIN_FILL_TIME_MS = 3000

export interface BotTrap {
  /** Attach to a hidden input real users never see or fill; bots that
   *  auto-fill every field trip it. */
  honeypotRef: React.RefObject<HTMLInputElement>
  /** True if the honeypot was filled, or the form was submitted faster than
   *  a human could plausibly fill it. Callers should fail silently (show the
   *  normal success message, send nothing) rather than surface an error —
   *  an error response just teaches a bot to retry. */
  isBot: () => boolean
}

/** Two cheap, client-side bot signals that catch unsophisticated bots before
 *  Turnstile is even involved. Mount time is captured in an effect (not the
 *  initializer) because the build is SSG (vite-react-ssg) — rendering runs in
 *  Node with no wall-clock meaning for "how long has a visitor had the page open". */
export function useBotTrap(): BotTrap {
  const mountedAt = useRef(0)
  const honeypotRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    mountedAt.current = Date.now()
  }, [])

  function isBot(): boolean {
    if (honeypotRef.current?.value) return true
    return Date.now() - mountedAt.current < MIN_FILL_TIME_MS
  }

  return { honeypotRef, isBot }
}
