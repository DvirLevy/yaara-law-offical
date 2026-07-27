import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Contact from './Contact'
import contactFallback from '../../content/contact'

describe('Contact', () => {
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
})
