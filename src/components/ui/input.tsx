import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex w-full min-w-0 rounded-none border border-border bg-panel-2 px-[18px] py-4 font-sans text-[15.5px] text-foreground transition-colors placeholder:text-ink-faint focus-visible:outline-none focus-visible:border-primary focus-visible:bg-panel disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
