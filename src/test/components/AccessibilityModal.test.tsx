import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import AccessibilityModal from '../../components/AccessibilityModal'
import accessibilityFallback from '../../../content/accessibility'

describe('AccessibilityModal', () => {
  it('renders the statement title and body when open', () => {
    render(<AccessibilityModal open onClose={vi.fn()} />)

    expect(screen.getByText(accessibilityFallback.title)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'כללי' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: accessibilityFallback.close_btn })).toBeInTheDocument()
  })

  it('renders nothing when closed', () => {
    render(<AccessibilityModal open={false} onClose={vi.fn()} />)
    expect(screen.queryByText(accessibilityFallback.title)).not.toBeInTheDocument()
  })
})
