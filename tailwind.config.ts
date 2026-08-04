import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'

/**
 * Single source of truth for design tokens.
 * Values are lifted 1:1 from the original `[data-direction="elegant"]`
 * palette in the legacy index.css — the only theme the site ships with.
 * The site is always light: no `dark:` variants are used anywhere, and
 * `darkMode: ['class']` means even an accidental `dark:` utility would
 * only ever activate if something adds a literal `dark` class (nothing
 * does), never from the visitor's OS/browser color-scheme setting.
 */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // shadcn/ui structural tokens
        background: '#f4f1eb',
        foreground: '#1d2024',
        border: 'rgba(24,28,32,.16)',
        input: 'rgba(24,28,32,.16)',
        ring: '#7d2825',
        primary: { DEFAULT: '#7d2825', foreground: '#ffffff' },
        secondary: { DEFAULT: '#fffdfa', foreground: '#1d2024' },
        muted: { DEFAULT: '#f7f3ec', foreground: '#5b5650' },
        accent: { DEFAULT: '#f7f3ec', foreground: '#1d2024' },
        destructive: { DEFAULT: '#b54040', foreground: '#ffffff' },
        card: { DEFAULT: '#fffdfa', foreground: '#1d2024' },
        popover: { DEFAULT: '#fffdfa', foreground: '#1d2024' },
        // brand tokens used directly by marketing sections
        brand: {
          DEFAULT: '#7d2825',
          2: '#9c3330',
          3: '#b54040',
          soft: 'rgba(125,40,37,.1)',
          line: 'rgba(125,40,37,.26)',
        },
        ink: { DEFAULT: '#1d2024', soft: '#5b5650', faint: '#9a948c' },
        panel: { DEFAULT: '#fffdfa', 2: '#f7f3ec' },
        charcoal: '#181c20',
        hairline: 'rgba(24,28,32,.1)',
      },
      fontFamily: {
        serif: ['Assistant', '-apple-system', 'system-ui', 'sans-serif'],
        sans: ['Assistant', 'Inter', '-apple-system', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1260px',
      },
      boxShadow: {
        card: '0 2px 24px rgba(24,28,32,.07), 0 1px 4px rgba(24,28,32,.05)',
        'card-lg': '0 18px 60px rgba(24,28,32,.12), 0 4px 12px rgba(24,28,32,.06)',
      },
      keyframes: {
        'wa-pulse': {
          '0%': { boxShadow: '0 6px 24px rgba(31,142,61,.38), 0 0 0 0 rgba(31,142,61,.5)' },
          '70%': { boxShadow: '0 6px 24px rgba(31,142,61,.38), 0 0 0 20px rgba(31,142,61,0)' },
          '100%': { boxShadow: '0 6px 24px rgba(31,142,61,.38), 0 0 0 0 rgba(31,142,61,0)' },
        },
        'pin-pulse': {
          '0%,100%': { boxShadow: '0 0 0 8px rgba(125,40,37,.15), 0 0 0 18px rgba(125,40,37,.06)' },
          '50%': { boxShadow: '0 0 0 12px rgba(125,40,37,.2), 0 0 0 26px rgba(125,40,37,.03)' },
        },
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: {
        'wa-pulse': 'wa-pulse 2.4s ease-out infinite',
        'pin-pulse': 'pin-pulse 2.4s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config
