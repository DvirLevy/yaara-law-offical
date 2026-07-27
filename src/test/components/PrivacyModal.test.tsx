import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import PrivacyModal from './PrivacyModal'
import privacyFallback from '../../content/privacy'

describe('PrivacyModal', () => {
  it('renders the policy title and body when open', () => {
    render(<PrivacyModal open onClose={vi.fn()} />)

    expect(screen.getByText(privacyFallback.title)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'כללי' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: privacyFallback.close_btn })).toBeInTheDocument()
  })

  it('renders nothing when closed', () => {
    render(<PrivacyModal open={false} onClose={vi.fn()} />)
    expect(screen.queryByText(privacyFallback.title)).not.toBeInTheDocument()
  })
})
