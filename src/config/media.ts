/** All site images are served from S3 in production. Set VITE_S3_BASE_URL
 *  in .env (see .env.example) to point at your bucket / CloudFront domain.
 *  Left unset (e.g. local dev), falls back to the local `public/assets`
 *  folder so `npm run dev` works with no bucket configured. */
const S3_BASE_URL = import.meta.env.VITE_S3_BASE_URL || '/assets'

export const s3 = (path: string): string => `${S3_BASE_URL}/${path.replace(/^\//, '')}`
