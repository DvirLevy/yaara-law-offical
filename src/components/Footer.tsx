import footerFallback from '../../content/footer'
import { useContent } from '@/lib/content'
import { Container } from '@/components/ui/container'

export default function Footer() {
  const t = useContent('footer', footerFallback)
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-[2] bg-charcoal py-[42px] pb-7">
      <Container className="flex flex-wrap items-center justify-between gap-x-7 gap-y-2 text-[13px] text-white/45 max-lg:flex-col max-lg:text-center">
        <div>
          © {year} {t.copyright_suffix}
        </div>
        <div className="max-lg:flex max-lg:flex-col max-lg:gap-1">
          <a href="tel:0544415549" className="hover:text-white/85">
            {t.office_line}
          </a>
          <span className="max-lg:hidden"> · </span>
          <a href="mailto:Yaara@yl-law.net" className="hover:text-white/85">
            {t.email}
          </a>
        </div>
      </Container>
    </footer>
  )
}
