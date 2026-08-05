import type { ReactNode } from 'react'

import accessibilityFallback from '../../content/accessibility'
import { useContent } from '@/lib/content'
import { s3 } from '../config/media'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import LazyImage from './LazyImage'

interface Props {
  open: boolean
  onClose: () => void
}

export default function AccessibilityModal({ open, onClose }: Props) {
  const t = useContent('accessibility', accessibilityFallback)

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="gap-0 p-0">
        <DialogHeader>
          <LazyImage priority src={s3('logo-transparent.png')} alt="יערה לוי משרד עורכי דין" className="h-[38px] w-auto" />
          <div className="flex-1 text-center">
            <DialogTitle>{t.title}</DialogTitle>
            <DialogDescription>{t.subtitle}</DialogDescription>
          </div>
          <div className="h-9 w-9 flex-shrink-0" aria-hidden="true" />
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-8 py-9 pb-10 [&_section]:mb-4 [&_section]:border-b [&_section]:border-hairline [&_section]:pb-4 [&_section:last-child]:mb-0 [&_section:last-child]:border-0 [&_section:last-child]:pb-0">
          <section>
            <h2 className="mb-2 font-serif text-[22px] font-bold leading-tight text-foreground">כללי</h2>
            <p className="mb-[.3em] text-lg leading-[1.8] text-ink-soft">
              משרד עורכי דין יערה לוי (להלן: <strong className="font-semibold text-foreground">&quot;המשרד&quot;</strong>) רואה
              חשיבות רבה במתן שירות שוויוני ונגיש לכלל הגולשים באתר, לרבות אנשים עם מוגבלות.
            </p>
            <p className="text-lg leading-[1.8] text-ink-soft">
              אתר זה פועל להנגשה בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ&quot;ח–1998, ולתקנות שהותקנו מכוחו,
              תוך התבססות על המלצות התקן הישראלי (ת&quot;י 5568) המבוסס על הנחיות WCAG 2.0 ברמה AA.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-[22px] font-bold leading-tight text-foreground">
              התאמות <em>שבוצעו</em>
            </h2>
            <ul className="mt-2.5 mb-[.85em] flex flex-col gap-1.5">
              <AccessibilityListItem>תמיכה בניווט מלא באמצעות מקלדת בכל רכיבי האתר.</AccessibilityListItem>
              <AccessibilityListItem>תיאורים חלופיים (alt) לתמונות עבור קוראי מסך.</AccessibilityListItem>
              <AccessibilityListItem>תוויות מפורשות לכל שדות הטפסים באתר.</AccessibilityListItem>
              <AccessibilityListItem>מבנה סמנטי ברור של כותרות ואזורי תוכן.</AccessibilityListItem>
              <AccessibilityListItem>
                כלי נגישות צף המאפשר שינוי גודל טקסט, הגברת ניגודיות והדגשת קישורים.
              </AccessibilityListItem>
            </ul>
            <p className="text-lg leading-[1.8] text-ink-soft">
              ההתאמות שבוצעו הן <strong className="font-semibold text-foreground">חלקיות</strong>, והמשרד ממשיך לפעול
              לשיפור הנגישות באתר על בסיס שוטף.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-[22px] font-bold leading-tight text-foreground">
              נתקלתם <em>בבעיה</em>?
            </h2>
            <p className="text-lg leading-[1.8] text-ink-soft">
              אם נתקלתם בקושי נגישות באתר, או שיש לכם הצעה לשיפור, נשמח שתפנו אלינו — רכזת הנגישות של המשרד היא עו&quot;ד
              יערה לוי, והפנייה תטופל בהקדם האפשרי.
            </p>
            <div className="mt-[18px] border-e-[3px] border-primary bg-panel-2 px-6 py-5">
              <p className="mb-1 text-[13.5px] leading-[1.8] text-ink-soft last:mb-0">
                <strong className="font-semibold text-foreground">רכזת נגישות: עו&quot;ד יערה לוי</strong>
              </p>
              <p className="mb-1 text-[13.5px] leading-[1.8] text-ink-soft last:mb-0">
                משרד: <a href="tel:0559569556" className="text-primary">055-956-9556</a> · נייד:{' '}
                <a href="tel:0544415549" className="text-primary">054-441-5549</a> · דוא״ל:{' '}
                <a href="mailto:Yaara@yl-law.net" className="text-primary">Yaara@yl-law.net</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-[22px] font-bold leading-tight text-foreground">
              עדכון <em>אחרון</em>
            </h2>
            <p className="text-lg leading-[1.8] text-ink-soft">
              {t.updated_label}: {t.updated_date}.
            </p>
          </section>
        </div>

        <DialogFooter>
          <Button size="pill" onClick={onClose}>
            {t.close_btn}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function AccessibilityListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-[11px] text-lg leading-[1.75] text-ink-soft before:mt-[9px] before:h-[5px] before:w-[5px] before:flex-shrink-0 before:rounded-full before:bg-primary before:opacity-70 before:content-['']">
      {children}
    </li>
  )
}
