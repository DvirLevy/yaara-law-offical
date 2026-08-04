import { lazy, Suspense, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

// Everything below the fold is code-split into its own chunk (see
// vite.config.ts manualChunks) and only fetched once it's about to be
// needed, instead of shipping the whole page in the initial bundle.
// Navbar/Hero stay static imports: they're above the fold and would
// otherwise cause a loading flash on first paint.
const CtaCard = lazy(() => import('./components/CtaCard'))
const Pillars = lazy(() => import('./components/Pillars'))
const About = lazy(() => import('./components/About'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Areas = lazy(() => import('./components/Areas'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const PrivacyModal = lazy(() => import('./components/PrivacyModal'))
const AccessibilityModal = lazy(() => import('./components/AccessibilityModal'))
const AccessibilityWidget = lazy(() => import('./components/AccessibilityWidget'))
const WaFab = lazy(() => import('./components/WaFab'))

function SectionFallback() {
  return <div className="min-h-[160px]" aria-hidden="true" />
}

export default function App() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [accessibilityOpen, setAccessibilityOpen] = useState(false)

  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:start-2 focus:top-2 focus:z-[200] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        דלג לתוכן הראשי
      </a>
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <CtaCard onPrivacyOpen={() => setPrivacyOpen(true)} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Pillars />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Areas />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Footer onAccessibilityOpen={() => setAccessibilityOpen(true)} />
      </Suspense>
      <Suspense fallback={null}>
        <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      </Suspense>
      <Suspense fallback={null}>
        <AccessibilityModal open={accessibilityOpen} onClose={() => setAccessibilityOpen(false)} />
      </Suspense>
      <Suspense fallback={null}>
        <AccessibilityWidget />
      </Suspense>
      <Suspense fallback={null}>
        <WaFab />
      </Suspense>
    </>
  )
}
