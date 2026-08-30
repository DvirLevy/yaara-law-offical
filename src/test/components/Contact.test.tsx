import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import Contact from '../../components/Contact'
import contactFallback from '../../../content/contact'
import { submitContactForm } from '@/lib/contactSubmit'
import { useTurnstile } from '@/lib/turnstile'
import { useBotTrap } from '@/lib/botTrap'

vi.mock('@/lib/contactSubmit', () => ({ submitContactForm: vi.fn() }))
vi.mock('@/lib/turnstile', () => ({ useTurnstile: vi.fn() }))
vi.mock('@/lib/botTrap', () => ({ useBotTrap: vi.fn() }))

const fillRequiredFields = () => {
  fireEvent.change(screen.getByLabelText(contactFallback.name_label), { target: { value: 'דנה כהן' } })
  fireEvent.change(screen.getByLabelText(contactFallback.phone_label), { target: { value: '050-000-0000' } })
  fireEvent.change(screen.getByLabelText(contactFallback.message_label), { target: { value: 'שאלה לגבי תמ"א 38' } })
}

describe('Contact', () => {
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

  it('renders the contact form fields and office details', () => {
    render(<Contact />)

    expect(screen.getByLabelText(contactFallback.name_label)).toBeInTheDocument()
    expect(screen.getByLabelText(contactFallback.phone_label)).toBeInTheDocument()
    expect(screen.getByLabelText(contactFallback.message_label)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: contactFallback.submit })).toBeInTheDocument()
    expect(screen.getByText(contactFallback.office_phone)).toBeInTheDocument()
    // Address renders twice — a plain <p> for desktop and, wrapped in the
    // Waze link, another <p> for mobile — toggled via lg: breakpoint classes
    // (both present in the DOM at once; CSS decides which one is visible).
    expect(screen.getAllByText(contactFallback.address)).toHaveLength(2)
  })

  it('makes the office address a Waze navigation link on mobile', () => {
    render(<Contact />)

    const wazeLink = screen.getByRole('link', { name: new RegExp(contactFallback.waze_link) })
    expect(wazeLink).toHaveAttribute('href', `https://waze.com/ul?q=${encodeURIComponent(contactFallback.address)}&navigate=yes`)
    expect(wazeLink).toHaveAttribute('target', '_blank')
    expect(wazeLink).toHaveTextContent(contactFallback.address)
  })

  it('is the #contact anchor target', () => {
    const { container } = render(<Contact />)
    expect(container.querySelector('#contact')).toBeInTheDocument()
  })

  it('submits name, phone (folded into the message) and message to the email API', async () => {
    vi.mocked(submitContactForm).mockResolvedValueOnce(undefined)
    render(<Contact />)

    fillRequiredFields()
    fireEvent.click(screen.getByRole('button', { name: contactFallback.submit }))

    await waitFor(() => expect(screen.getByText(contactFallback.success_msg)).toBeInTheDocument())
    expect(submitContactForm).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: 'דנה כהן',
        phone: '050-000-0000',
        message: 'שאלה לגבי תמ"א 38',
        subject: contactFallback.email_subject,
      })
    )
  })

  it('shows the submit-error message when the API call fails', async () => {
    vi.mocked(submitContactForm).mockRejectedValueOnce(new Error('network'))
    render(<Contact />)

    fillRequiredFields()
    fireEvent.click(screen.getByRole('button', { name: contactFallback.submit }))

    await waitFor(() => expect(screen.getByText(contactFallback.submit_error_msg)).toBeInTheDocument())
  })

  it('includes the Turnstile token in the submission', async () => {
    vi.mocked(submitContactForm).mockResolvedValueOnce(undefined)
    render(<Contact />)

    fillRequiredFields()
    fireEvent.click(screen.getByRole('button', { name: contactFallback.submit }))

    await waitFor(() => expect(screen.getByText(contactFallback.success_msg)).toBeInTheDocument())
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
    render(<Contact />)

    fillRequiredFields()
    fireEvent.click(screen.getByRole('button', { name: contactFallback.submit }))

    await waitFor(() => expect(screen.getByText(contactFallback.success_msg)).toBeInTheDocument())
    expect(submitContactForm).toHaveBeenCalledWith(expect.objectContaining({ turnstileToken: null }))
    expect(screen.getByText(contactFallback.turnstile_unavailable_msg)).toBeInTheDocument()
  })

  it('does not submit when the bot trap flags the request, but still shows success', async () => {
    vi.mocked(useBotTrap).mockReturnValue({ honeypotRef: { current: null }, isBot: () => true })
    render(<Contact />)

    fillRequiredFields()
    fireEvent.click(screen.getByRole('button', { name: contactFallback.submit }))

    await waitFor(() => expect(screen.getByText(contactFallback.success_msg)).toBeInTheDocument())
    expect(submitContactForm).not.toHaveBeenCalled()
  })
})
