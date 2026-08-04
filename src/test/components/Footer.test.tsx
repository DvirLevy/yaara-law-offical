import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import Footer from '../../components/Footer'
import footerFallback from '../../../content/footer'
import accessibilityFallback from '../../../content/accessibility'

describe('Footer', () => {
  it('renders the current year and office contact links', () => {
    render(<Footer onAccessibilityOpen={vi.fn()} />)

    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument()
    expect(screen.getByText(footerFallback.email)).toBeInTheDocument()
  })

  it('opens the accessibility statement when the footer link is clicked', () => {
    const onAccessibilityOpen = vi.fn()
    render(<Footer onAccessibilityOpen={onAccessibilityOpen} />)

    fireEvent.click(screen.getByText(accessibilityFallback.footer_link))
    expect(onAccessibilityOpen).toHaveBeenCalledOnce()
  })
})
