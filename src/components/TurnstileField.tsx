import type { RefObject } from 'react'
import type { TurnstileStatus } from '@/lib/turnstile'

interface Props {
  containerRef: RefObject<HTMLDivElement>
  status: TurnstileStatus
  unavailableMessage: string
}

export default function TurnstileField({ containerRef, status, unavailableMessage }: Props) {
  return (
    <div>
      {/* min-height holds the widget's ~65px slot before it renders, so the
          layout doesn't shift once the script loads and the widget appears. */}
      <div ref={containerRef} className={status === 'unavailable' ? undefined : 'min-h-[65px]'} />
      {status === 'unavailable' && (
        <p role="status" className="text-[13px] text-ink-soft">
          {unavailableMessage}
        </p>
      )}
    </div>
  )
}
