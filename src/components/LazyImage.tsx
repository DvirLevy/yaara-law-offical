import type { ImgHTMLAttributes } from 'react'

/** <img> wrapper defaulting to native lazy-loading + async decode.
 *  Pass priority for above-the-fold images (e.g. the hero photo) to opt out. */
export default function LazyImage({
  priority,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) {
  return (
    <img
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      // Lowercase: React 18 doesn't recognize the camelCase `fetchPriority`
      // prop and silently drops it instead of rendering the DOM attribute.
      {...{ fetchpriority: priority ? 'high' : 'auto' }}
      {...props}
    />
  )
}
