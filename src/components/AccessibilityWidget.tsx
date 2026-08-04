import { useEffect, useState } from 'react'
import { Accessibility, Plus, Minus, Contrast, Underline, RotateCcw, X } from 'lucide-react'

const STORAGE_KEY = 'a11y-prefs'
const FONT_SCALE_MIN = 1
const FONT_SCALE_MAX = 1.4
const FONT_SCALE_STEP = 0.1

interface Prefs {
  fontScale: number
  highContrast: boolean
  underlineLinks: boolean
}

const DEFAULT_PREFS: Prefs = { fontScale: 1, highContrast: false, underlineLinks: false }

function loadPrefs(): Prefs {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PREFS
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_PREFS
  }
}

function applyPrefs(prefs: Prefs) {
  const html = document.documentElement
  html.style.setProperty('--a11y-font-scale', String(prefs.fontScale))
  html.dataset.a11yContrast = prefs.highContrast ? 'true' : 'false'
  html.dataset.a11yUnderline = prefs.underlineLinks ? 'true' : 'false'
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS)

  useEffect(() => {
    const loaded = loadPrefs()
    setPrefs(loaded)
    applyPrefs(loaded)
  }, [])

  const update = (next: Prefs) => {
    setPrefs(next)
    applyPrefs(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore storage failures (private browsing, quota, ...)
    }
  }

  return (
    <>
      <button
        type="button"
        className="fixed bottom-7 start-7 z-[90] grid h-[58px] w-[58px] place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_6px_24px_rgba(125,40,37,.38)] transition-transform hover:scale-[1.06]"
        aria-label="פתיחת תפריט נגישות"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Accessibility className="h-7 w-7" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="הגדרות נגישות"
          className="fixed bottom-[100px] start-7 z-[91] w-[280px] border border-hairline bg-card p-5 shadow-card-lg"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-foreground">נגישות</h2>
            <button type="button" aria-label="סגירת תפריט נגישות" className="text-ink-soft hover:text-foreground" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <span className="mb-2 block text-[13px] font-semibold text-ink-soft">גודל טקסט</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="הקטנת גודל טקסט"
                  disabled={prefs.fontScale <= FONT_SCALE_MIN}
                  className="grid h-9 w-9 place-items-center border border-border text-foreground disabled:opacity-40"
                  onClick={() => update({ ...prefs, fontScale: Math.max(FONT_SCALE_MIN, +(prefs.fontScale - FONT_SCALE_STEP).toFixed(2)) })}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm text-foreground">{Math.round(prefs.fontScale * 100)}%</span>
                <button
                  type="button"
                  aria-label="הגדלת גודל טקסט"
                  disabled={prefs.fontScale >= FONT_SCALE_MAX}
                  className="grid h-9 w-9 place-items-center border border-border text-foreground disabled:opacity-40"
                  onClick={() => update({ ...prefs, fontScale: Math.min(FONT_SCALE_MAX, +(prefs.fontScale + FONT_SCALE_STEP).toFixed(2)) })}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              type="button"
              aria-pressed={prefs.highContrast}
              className="flex items-center gap-2.5 border border-border px-3 py-2.5 text-sm text-foreground aria-pressed:bg-primary aria-pressed:text-primary-foreground"
              onClick={() => update({ ...prefs, highContrast: !prefs.highContrast })}
            >
              <Contrast className="h-4 w-4 flex-shrink-0" />
              ניגודיות גבוהה
            </button>

            <button
              type="button"
              aria-pressed={prefs.underlineLinks}
              className="flex items-center gap-2.5 border border-border px-3 py-2.5 text-sm text-foreground aria-pressed:bg-primary aria-pressed:text-primary-foreground"
              onClick={() => update({ ...prefs, underlineLinks: !prefs.underlineLinks })}
            >
              <Underline className="h-4 w-4 flex-shrink-0" />
              הדגשת קישורים
            </button>

            <button
              type="button"
              className="flex items-center gap-2.5 text-sm text-ink-soft hover:text-foreground"
              onClick={() => update(DEFAULT_PREFS)}
            >
              <RotateCcw className="h-4 w-4 flex-shrink-0" />
              איפוס הגדרות
            </button>
          </div>
        </div>
      )}
    </>
  )
}
