import * as React from 'react'

import { cn } from '@/lib/utils'

/** Small uppercase eyebrow chip used above every section title
 *  (mirrors legacy `.section-label`). */
function SectionLabel({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.42em] text-primary before:h-0.5 before:w-6 before:bg-primary before:content-['']",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/** Section title. Wrap the highlighted word/phrase in <em> — it's styled
 *  non-italic + brand red globally (see index.css). Mirrors `.section-title`. */
function SectionTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        'mb-5 max-w-[18ch] font-serif text-[clamp(34px,4.5vw,58px)] font-bold leading-[1.08] text-foreground',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

function SectionLede({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('max-w-[56ch] text-lg leading-[1.82] text-ink-soft', className)} {...props}>
      {children}
    </p>
  )
}

export { SectionLabel, SectionTitle, SectionLede }
