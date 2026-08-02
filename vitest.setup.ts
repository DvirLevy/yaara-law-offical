import '@testing-library/jest-dom/vitest'

// jsdom doesn't implement IntersectionObserver, ResizeObserver, or
// matchMedia; embla-carousel (used by the Testimonials carousel) reads all
// three during setup.
class MockObserver {
  observe = () => {}
  unobserve = () => {}
  disconnect = () => {}
}
// @ts-expect-error -- partial polyfill, only what embla-carousel touches
window.IntersectionObserver = window.IntersectionObserver || MockObserver
window.ResizeObserver = window.ResizeObserver || MockObserver

window.matchMedia =
  window.matchMedia ||
  ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }))
