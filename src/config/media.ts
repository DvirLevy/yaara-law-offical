/** All site images are served from S3. There's no local `public/assets`
 *  copy anymore, so the `/assets` fallback below is currently dead — set
 *  VITE_S3_BASE_URL in .env (including in local dev) to point at the
 *  bucket / CloudFront domain, or images won't load. */
const S3_BASE_URL = import.meta.env.VITE_S3_BASE_URL || '/assets'

export const s3 = (path: string): string => `${S3_BASE_URL}/${path.replace(/^\//, '')}`
