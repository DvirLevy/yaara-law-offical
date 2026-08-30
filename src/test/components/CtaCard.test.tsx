import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import CtaCard from '../../components/CtaCard'
import ctaFallback from '../../../content/cta'
import { submitContactForm } from '@/lib/contactSubmit'
import { useTurnstile } from '@/lib/turnstile'
import { useBotTrap } from '@/lib/botTrap'

vi.mock('@/lib/contactSubmit', () => ({ submitContactForm: vi.fn() }))
vi.mock('@/lib/turnstile', () => ({ useTurnstile: vi.fn() }))
vi.mock('@/lib/botTrap', () => ({ useBotTrap: vi.fn() }))

const fillAndSubmit = () => {
  fireEvent.change(screen.getByPlaceholderText(ctaFallback.name_placeholder), { target: { value: 'דנה כהן' } })
  fireEvent.change(screen.getByPlaceholderText(ctaFallback.phone_placeholder), { target: { value: '050-000-0000' } })
  fireEvent.click(screen.getByRole('button', { name: ctaFallback.submit }))
}

describe('CtaCard', () => {
  beforeEach(() => {
    vi.mocked(submitContactForm).mockReset()
    vi.mocked(useTurnstile).mockReturnValue({
      containerRef: { current: null },
      arm: vi.fn(),
      getToken: vi.fn().mockResolvedValue('test-token'),
      reset: vi.fn(),
      status: 'ready',
    })
    vi.mocked(useBotTrap).mockReturnValue({
      honeypotRef: { current: null },
      isBot: () => false,
    })
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

    fillAndSubmit()

    await waitFor(() => expect(screen.getByText(ctaFallback.success_msg)).toBeInTheDocument())
    expect(submitContactForm).toHaveBeenCalledWith(
      expect.objectContaining({ fullName: 'דנה כהן', phone: '050-000-0000', subject: ctaFallback.email_subject })
    )
  })

  it('shows the submit-error message when the API call fails', async () => {
    vi.mocked(submitContactForm).mockRejectedValueOnce(new Error('network'))
    render(<CtaCard onPrivacyOpen={vi.fn()} />)

    fillAndSubmit()

    await waitFor(() => expect(screen.getByText(ctaFallback.submit_error_msg)).toBeInTheDocument())
  })

  it('includes the Turnstile token in the submission', async () => {
    vi.mocked(submitContactForm).mockResolvedValueOnce(undefined)
    render(<CtaCard onPrivacyOpen={vi.fn()} />)

    fillAndSubmit()

    await waitFor(() => expect(screen.getByText(ctaFallback.success_msg)).toBeInTheDocument())
    expect(submitContactForm).toHaveBeenCalledWith(expect.objectContaining({ turnstileToken: 'test-token' }))
  })

  it('submits with a null token when Turnstile is unavailable (fail-open)', async () => {
    vi.mocked(useTurnstile).mockReturnValue({
      containerRef: { current: null },
      arm: vi.fn(),
      getToken: vi.fn().mockResolvedValue(null),
      reset: vi.fn(),
      status: 'unavailable',
    })
    vi.mocked(submitContactForm).mockResolvedValueOnce(undefined)
    render(<CtaCard onPrivacyOpen={vi.fn()} />)

    fillAndSubmit()

    await waitFor(() => expect(screen.getByText(ctaFallback.success_msg)).toBeInTheDocument())
    expect(submitContactForm).toHaveBeenCalledWith(expect.objectContaining({ turnstileToken: null }))
    expect(screen.getByText(ctaFallback.turnstile_unavailable_msg)).toBeInTheDocument()
  })

  it('does not submit when the bot trap flags the request, but still shows success', async () => {
    vi.mocked(useBotTrap).mockReturnValue({ honeypotRef: { current: null }, isBot: () => true })
    render(<CtaCard onPrivacyOpen={vi.fn()} />)

    fillAndSubmit()

    await waitFor(() => expect(screen.getByText(ctaFallback.success_msg)).toBeInTheDocument())
    expect(submitContactForm).not.toHaveBeenCalled()
  })
})
