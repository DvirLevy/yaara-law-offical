import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createRef } from 'react'

import TurnstileField from '../../components/TurnstileField'

describe('TurnstileField', () => {
  it('renders a container for the widget to mount into', () => {
    const ref = createRef<HTMLDivElement>()
    const { container } = render(<TurnstileField containerRef={ref} status="ready" unavailableMessage="לא זמין" />)

    expect(container.querySelector('div')).toBeInTheDocument()
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('shows the unavailable message when the widget failed to load', () => {
    render(<TurnstileField containerRef={createRef()} status="unavailable" unavailableMessage="לא הצלחנו לטעון" />)

    expect(screen.getByText('לא הצלחנו לטעון')).toBeInTheDocument()
  })

  it('does not show the unavailable message while idle, loading, or ready', () => {
    const { rerender } = render(<TurnstileField containerRef={createRef()} status="idle" unavailableMessage="לא הצלחנו לטעון" />)
    expect(screen.queryByText('לא הצלחנו לטעון')).not.toBeInTheDocument()

    rerender(<TurnstileField containerRef={createRef()} status="loading" unavailableMessage="לא הצלחנו לטעון" />)
    expect(screen.queryByText('לא הצלחנו לטעון')).not.toBeInTheDocument()

    rerender(<TurnstileField containerRef={createRef()} status="ready" unavailableMessage="לא הצלחנו לטעון" />)
    expect(screen.queryByText('לא הצלחנו לטעון')).not.toBeInTheDocument()
  })
})
