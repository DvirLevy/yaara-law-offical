import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CtaCard from '../components/CtaCard'
import Pillars from '../components/Pillars'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import Areas from '../components/Areas'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import PrivacyModal from '../components/PrivacyModal'
import AccessibilityModal from '../components/AccessibilityModal'
import AccessibilityWidget from '../components/AccessibilityWidget'
import WaFab from '../components/WaFab'
import OfficeMap from '../components/OfficeMap'

// axe's color-contrast rule needs real layout/canvas rendering that jsdom
// doesn't provide, so it produces noise unrelated to markup correctness —
// disabled here; contrast is checked visually, not in this jsdom sweep.
const axeOptions = { rules: { 'color-contrast': { enabled: false } } }

describe('accessibility (axe)', () => {
  it('Navbar has no violations', async () => {
    const { container } = render(<Navbar />)
    expect(await axe(container, axeOptions)).toHaveNoViolations()
  })

  it('Hero has no violations', async () => {
    const { container } = render(<Hero />)
    expect(await axe(container, axeOptions)).toHaveNoViolations()
  })

  it('CtaCard has no violations', async () => {
    const { container } = render(<CtaCard onPrivacyOpen={vi.fn()} />)
    expect(await axe(container, axeOptions)).toHaveNoViolations()
  })

  it('Pillars has no violations', async () => {
    const { container } = render(<Pillars />)
    expect(await axe(container, axeOptions)).toHaveNoViolations()
  })

  it('About has no violations', async () => {
    const { container } = render(<About />)
    expect(await axe(container, axeOptions)).toHaveNoViolations()
  })

  it('Testimonials has no violations', async () => {
    const { container } = render(<Testimonials />)
    expect(await axe(container, axeOptions)).toHaveNoViolations()
  })

  it('Areas has no violations', async () => {
    const { container } = render(<Areas />)
    expect(await axe(container, axeOptions)).toHaveNoViolations()
  })

  it('Contact has no violations', async () => {
    const { container } = render(<Contact />)
    expect(await axe(container, axeOptions)).toHaveNoViolations()
  })

  it('Footer has no violations', async () => {
    const { container } = render(<Footer onAccessibilityOpen={vi.fn()} />)
    expect(await axe(container, axeOptions)).toHaveNoViolations()
  })

  it('PrivacyModal has no violations when open', async () => {
    const { container } = render(<PrivacyModal open onClose={vi.fn()} />)
    expect(await axe(container, axeOptions)).toHaveNoViolations()
  })

  it('AccessibilityModal has no violations when open', async () => {
    const { container } = render(<AccessibilityModal open onClose={vi.fn()} />)
    expect(await axe(container, axeOptions)).toHaveNoViolations()
  })

  it('AccessibilityWidget has no violations', async () => {
    const { container } = render(<AccessibilityWidget />)
    expect(await axe(container, axeOptions)).toHaveNoViolations()
  })

  it('WaFab has no violations', async () => {
    const { container } = render(<WaFab />)
    expect(await axe(container, axeOptions)).toHaveNoViolations()
  })

  it('OfficeMap has no violations', async () => {
    const { container } = render(<OfficeMap address="שד׳ הרכס 13, מודיעין" title="משרד YL" subtitle="שד׳ הרכס 13" />)
    expect(await axe(container, axeOptions)).toHaveNoViolations()
  })
})
