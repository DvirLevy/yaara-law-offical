import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import AccessibilityWidget from '../../components/AccessibilityWidget'

describe('AccessibilityWidget', () => {
  beforeEach(() => {
    try {
      window.localStorage.clear()
    } catch {
      // Node's built-in `localStorage` global can misbehave under vitest's
      // multi-file run depending on load order; the component's own
      // try/catch around storage access already falls back to defaults,
      // so a failed clear here doesn't affect what's being tested.
    }
    document.documentElement.removeAttribute('style')
    delete document.documentElement.dataset.a11yContrast
    delete document.documentElement.dataset.a11yUnderline
  })

  it('opens the panel and toggles high contrast', () => {
    render(<AccessibilityWidget />)

    fireEvent.click(screen.getByRole('button', { name: 'פתיחת תפריט נגישות' }))
    const contrastButton = screen.getByRole('button', { name: /ניגודיות גבוהה/ })
    expect(contrastButton).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(contrastButton)
    expect(contrastButton).toHaveAttribute('aria-pressed', 'true')
    expect(document.documentElement.dataset.a11yContrast).toBe('true')
  })

  it('increases the font scale and reflects it on <html>', () => {
    render(<AccessibilityWidget />)

    fireEvent.click(screen.getByRole('button', { name: 'פתיחת תפריט נגישות' }))
    fireEvent.click(screen.getByRole('button', { name: 'הגדלת גודל טקסט' }))

    expect(screen.getByText('110%')).toBeInTheDocument()
    expect(document.documentElement.style.getPropertyValue('--a11y-font-scale')).toBe('1.1')
  })
})
