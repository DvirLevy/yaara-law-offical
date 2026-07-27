import * as React from 'react'

import { cn } from '@/lib/utils'

/** Shared page-width wrapper. Mirrors the legacy `.container` rule
 *  (max-width 1260px, centered, responsive side padding). */
const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative z-[2] mx-auto max-w-container px-6 md:px-10', className)}
      {...props}
    />
  )
)
Container.displayName = 'Container'

export { Container }
