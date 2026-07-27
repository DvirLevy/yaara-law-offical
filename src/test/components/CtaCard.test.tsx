import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import CtaCard from './CtaCard'
import ctaFallback from '../../content/cta'

describe('CtaCard', () => {
  it('renders the lead-capture form and privacy link', () => {
    render(<CtaCard onPrivacyOpen={vi.fn()} />)

    expect(screen.getByText(ctaFallback.title)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(ctaFallback.name_placeholder)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(ctaFallback.phone_placeholder)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: ctaFallback.submit })).toBeInTheDocument()
    expect(screen.getByText(ctaFallback.consent_link)).toBeInTheDocument()
  })

  it('opens the privacy modal when the consent link is clicked', async () => {
    const onPrivacyOpen = vi.fn()
    const { getByText } = render(<CtaCard onPrivacyOpen={onPrivacyOpen} />)

    getByText(ctaFallback.consent_link).click()

    expect(onPrivacyOpen).toHaveBeenCalledTimes(1)
  })
})
