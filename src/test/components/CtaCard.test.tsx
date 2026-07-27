import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import CtaCard from '../../components/CtaCard'
import ctaFallback from '../../../content/cta'
import { submitContactForm } from '@/lib/contactSubmit'

vi.mock('@/lib/contactSubmit', () => ({ submitContactForm: vi.fn() }))

describe('CtaCard', () => {
  beforeEach(() => {
    vi.mocked(submitContactForm).mockReset()
  })

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

  it('submits name and phone to the email API', async () => {
    vi.mocked(submitContactForm).mockResolvedValueOnce(undefined)
    render(<CtaCard onPrivacyOpen={vi.fn()} />)

    fireEvent.change(screen.getByPlaceholderText(ctaFallback.name_placeholder), { target: { value: 'דנה כהן' } })
    fireEvent.change(screen.getByPlaceholderText(ctaFallback.phone_placeholder), { target: { value: '050-000-0000' } })
    fireEvent.click(screen.getByRole('button', { name: ctaFallback.submit }))

    await waitFor(() => expect(screen.getByText(ctaFallback.success_msg)).toBeInTheDocument())
    expect(submitContactForm).toHaveBeenCalledWith(
      expect.objectContaining({ fullName: 'דנה כהן', phone: '050-000-0000', subject: ctaFallback.email_subject })
    )
  })

  it('shows the submit-error message when the API call fails', async () => {
    vi.mocked(submitContactForm).mockRejectedValueOnce(new Error('network'))
    render(<CtaCard onPrivacyOpen={vi.fn()} />)

    fireEvent.change(screen.getByPlaceholderText(ctaFallback.name_placeholder), { target: { value: 'דנה כהן' } })
    fireEvent.change(screen.getByPlaceholderText(ctaFallback.phone_placeholder), { target: { value: '050-000-0000' } })
    fireEvent.click(screen.getByRole('button', { name: ctaFallback.submit }))

    await waitFor(() => expect(screen.getByText(ctaFallback.submit_error_msg)).toBeInTheDocument())
  })
})
