import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'

import navFallback from '../../content/navbar'
import { useContent } from '@/lib/content'
import { s3 } from '../config/media'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import LazyImage from './LazyImage'

export default function Navbar() {
  const t = useContent('navbar', navFallback)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  const NAV_ITEMS = [
    { id: 'about', label: t.nav_about },
    { id: 'areas', label: t.nav_areas },
    { id: 'testimonials', label: t.nav_testimonials },
    { id: 'contact', label: t.nav_contact },
  ]

  useEffect(() => {
    const sections = NAV_ITEMS.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[]

    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      let cur = ''
      for (const s of sections) {
        const r = s.getBoundingClientRect()
        if (r.top <= 140 && r.bottom > 140) {
          cur = s.id
          break
        }
      }
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className={cn(
          'fixed inset-x-0 top-0 z-[100] transition-[background-color,box-shadow] duration-200',
          scrolled && 'bg-background/85 shadow-[0_1px_0_rgba(24,28,32,.1)] backdrop-blur-md'
        )}
      >
        <Container className="flex items-center justify-between gap-6 py-4">
          <a
            href="#top"
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('top')
            }}
          >
            <LazyImage
              priority
              src={s3('logo-transparent.png')}
              alt="Yaara Levy Law Office"
              className="block h-[52px] w-auto transition-opacity hover:opacity-80"
            />
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  'border-b-2 border-transparent px-[18px] py-[10px] text-[14.5px] tracking-[.01em] text-ink-soft transition-colors hover:text-foreground',
                  active === id && 'border-primary text-primary'
                )}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(id)
                }}
              >
                {label}
              </a>
            ))}
          </div>

          <Button
            asChild
            size="pill"
            className="hidden lg:inline-flex"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('contact')
            }}
          >
            <a href="#contact">{t.cta_label}</a>
          </Button>

          <button
            className="grid h-10 w-10 place-items-center text-foreground lg:hidden"
            aria-label="תפריט"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </Container>
      </nav>

      <div
        className={cn(
          'fixed inset-x-0 top-16 bottom-0 z-[99] flex -translate-y-3 flex-col gap-1 bg-background/95 p-7 opacity-0 backdrop-blur-lg transition-all duration-200 pointer-events-none lg:hidden',
          menuOpen && 'translate-y-0 opacity-100 pointer-events-auto'
        )}
      >
        {NAV_ITEMS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className="border-b border-hairline py-3.5 font-serif text-[28px] font-bold text-foreground last:border-0"
            onClick={(e) => {
              e.preventDefault()
              scrollTo(id)
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
