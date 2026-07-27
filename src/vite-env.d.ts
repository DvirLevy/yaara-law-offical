/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** S3 bucket / CloudFront domain that serves site images. Falls back to `/assets` (public/assets) when unset, so local dev works without a bucket. */
  readonly VITE_S3_BASE_URL?: string
  /** Base URL of the content CDN/API. When set, section copy is fetched at runtime as `${VITE_CONTENT_BASE_URL}/{key}.json`. When unset (e.g. local dev), the bundled `content/*.ts` modules are used directly — no network request. */
  readonly VITE_CONTENT_BASE_URL?: string
  /** API Gateway endpoint that emails lead-form submissions (see src/lib/contactSubmit.ts). */
  readonly VITE_EMAIL_SERVICE_LAMBDA?: string
  /** x-api-key for VITE_EMAIL_SERVICE_LAMBDA. */
  readonly VITE_API_KEY_EMAIL_SERVICE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
