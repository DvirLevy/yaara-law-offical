/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** S3 bucket / CloudFront domain that serves site images. Falls back to `/assets` (public/assets) when unset, so local dev works without a bucket. */
  readonly VITE_S3_BASE_URL?: string
  /** Base URL of the content CDN/API. When set, section copy is fetched at runtime as `${VITE_CONTENT_BASE_URL}/{key}.json`. When unset (e.g. local dev), the bundled `content/*.ts` modules are used directly — no network request. */
  readonly VITE_CONTENT_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
