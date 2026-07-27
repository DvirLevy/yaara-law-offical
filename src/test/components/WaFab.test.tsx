import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import WaFab from '../../components/WaFab'

describe('WaFab', () => {
  it('links out to the office WhatsApp number', () => {
    render(<WaFab />)

    const link = screen.getByLabelText('WhatsApp')
    expect(link).toHaveAttribute('href', 'https://wa.me/972544415549')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })
})
