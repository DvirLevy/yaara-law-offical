import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import Contact from '../../components/Contact'
import contactFallback from '../../../content/contact'
import { submitContactForm } from '@/lib/contactSubmit'

vi.mock('@/lib/contactSubmit', () => ({ submitContactForm: vi.fn() }))

const fillRequiredFields = () => {
  fireEvent.change(screen.getByLabelText(contactFallback.name_label), { target: { value: 'דנה כהן' } })
  fireEvent.change(screen.getByLabelText(contactFallback.phone_label), { target: { value: '050-000-0000' } })
  fireEvent.change(screen.getByLabelText(contactFallback.message_label), { target: { value: 'שאלה לגבי תמ"א 38' } })
}

describe('Contact', () => {
  beforeEach(() => {
    vi.mocked(submitContactForm).mockReset()
  })

  it('renders the contact form fields and office details', () => {
    render(<Contact />)

    expect(screen.getByLabelText(contactFallback.name_label)).toBeInTheDocument()
    expect(screen.getByLabelText(contactFallback.phone_label)).toBeInTheDocument()
    expect(screen.getByLabelText(contactFallback.message_label)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: contactFallback.submit })).toBeInTheDocument()
    expect(screen.getByText(contactFallback.office_phone)).toBeInTheDocument()
    expect(screen.getByText(contactFallback.address)).toBeInTheDocument()
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
})
