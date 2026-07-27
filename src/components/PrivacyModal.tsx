import type { ReactNode } from 'react'

import privacyFallback from '../../content/privacy'
import { useContent } from '@/lib/content'
import { s3 } from '../config/media'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import LazyImage from './LazyImage'

interface Props {
  open: boolean
  onClose: () => void
}

export default function PrivacyModal({ open, onClose }: Props) {
  const t = useContent('privacy', privacyFallback)

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="gap-0 p-0">
        <DialogHeader>
          <LazyImage priority src={s3('logo-transparent.png')} alt="YL Law" className="h-[38px] w-auto" />
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
              משרד עורכי דין יערה לוי (להלן: <strong className="font-semibold text-foreground">&quot;המשרד&quot;</strong>) מחויב
              לשמירה על פרטיות המבקרים באתר ולקוחותיו, ומתייחס בכובד ראש לאבטחת המידע האישי המועבר אליו.
            </p>
            <p className="text-lg leading-[1.8] text-ink-soft">
              מדיניות זו מתארת כיצד המשרד אוסף, מעבד ומשתמש במידע אישי המועבר דרך האתר{' '}
              <strong className="font-semibold text-foreground">yl-law.net</strong>, בהתאם לחוק הגנת הפרטיות, התשמ&quot;א–1981.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-[22px] font-bold leading-tight text-foreground">
              איזה מידע <em>נאסף</em>?
            </h2>
            <p className="text-lg leading-[1.8] text-ink-soft">המשרד אוסף מידע אישי הנמסר מרצונכם דרך טפסי יצירת הקשר:</p>
            <ul className="mt-2.5 mb-[.85em] flex flex-col gap-1.5">
              <PrivacyListItem>
                <strong className="font-semibold text-foreground">שם מלא</strong> — לצורך פנייה אישית ומתן שירות.
              </PrivacyListItem>
              <PrivacyListItem>
                <strong className="font-semibold text-foreground">מספר טלפון</strong> — ליצירת קשר וחזרה אליכם.
              </PrivacyListItem>
              <PrivacyListItem>
                <strong className="font-semibold text-foreground">כתובת דוא״ל</strong> — לתכתובת ועדכונים רלוונטיים.
              </PrivacyListItem>
              <PrivacyListItem>
                <strong className="font-semibold text-foreground">תוכן הפנייה</strong> — תיאור העניין המשפטי שבו מבוקשת עזרה.
              </PrivacyListItem>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-[22px] font-bold leading-tight text-foreground">
              מטרות <em>השימוש</em>
            </h2>
            <ul className="mt-2.5 mb-[.85em] flex flex-col gap-1.5">
              <PrivacyListItem>חזרה אליכם בתגובה לפנייתכם ומתן ייעוץ ראשוני.</PrivacyListItem>
              <PrivacyListItem>ניהול תיק הלקוח ומתן שירותים משפטיים.</PrivacyListItem>
              <PrivacyListItem>משלוח עדכונים מקצועיים רלוונטיים — בהסכמתכם בלבד.</PrivacyListItem>
              <PrivacyListItem>עמידה בחובות חוקיות החלות על המשרד.</PrivacyListItem>
            </ul>
            <p className="text-lg leading-[1.8] text-ink-soft">
              המשרד <strong className="font-semibold text-foreground">לא ימכור, לא ישכיר ולא יעביר</strong> את פרטיכם
              לגורמים שלישיים, למעט כנדרש על פי דין.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-[22px] font-bold leading-tight text-foreground">
              זכויותיכם <em>על פי חוק</em>
            </h2>
            <p className="text-lg leading-[1.8] text-ink-soft">
              בהתאם לחוק הגנת הפרטיות, התשמ&quot;א–1981, זכאים אתם לעיין במידע השמור אודותיכם, לדרוש תיקונו או מחיקתו,
              ולהתנגד לשימוש בו לצרכי דיוור ישיר.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-[22px] font-bold leading-tight text-foreground">
              צרו <em>קשר</em>
            </h2>
            <p className="text-lg leading-[1.8] text-ink-soft">לשאלות או בקשות הנוגעות למדיניות הפרטיות:</p>
            <div className="mt-[18px] border-e-[3px] border-primary bg-panel-2 px-6 py-5">
              <p className="mb-1 text-[13.5px] leading-[1.8] text-ink-soft last:mb-0">
                <strong className="font-semibold text-foreground">משרד עורכי דין יערה לוי — YL Law</strong>
              </p>
              <p className="mb-1 text-[13.5px] leading-[1.8] text-ink-soft last:mb-0">שד׳ הרכס 13, בניין A, קומה 4, מודיעין</p>
              <p className="mb-1 text-[13.5px] leading-[1.8] text-ink-soft last:mb-0">
                משרד: <a href="tel:0559569556" className="text-primary">055-956-9556</a> · נייד:{' '}
                <a href="tel:0544415549" className="text-primary">054-441-5549</a> · דוא״ל:{' '}
                <a href="mailto:Yaara@yl-law.net" className="text-primary">Yaara@yl-law.net</a>
              </p>
            </div>
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

function PrivacyListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-[11px] text-lg leading-[1.75] text-ink-soft before:mt-[9px] before:h-[5px] before:w-[5px] before:flex-shrink-0 before:rounded-full before:bg-primary before:opacity-70 before:content-['']">
      {children}
    </li>
  )
}
