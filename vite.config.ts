/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// Section components that are React.lazy()-loaded from App.tsx (see src/App.tsx).
// Naming them explicitly here guarantees each one always lands in its own
// named chunk (section-hero.js, section-about.js, ...) instead of leaving
// Rollup's default chunking heuristics to decide, and keeps vendor code
// (React, Radix primitives, icons) split into shared chunks the section
// chunks can reuse instead of duplicating.
const SECTION_COMPONENTS = [
  'Navbar', 'Hero', 'CtaCard', 'Pillars', 'About',
  'Testimonials', 'Areas', 'Contact', 'Footer', 'PrivacyModal',
  'AccessibilityModal', 'AccessibilityWidget', 'WaFab',
]

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'vendor-react'
            if (/[\\/]node_modules[\\/](@radix-ui|lucide-react|class-variance-authority|tailwind-merge|clsx)[\\/]/.test(id)) return 'vendor-ui'
            return 'vendor'
          }
          const match = id.match(/[\\/]src[\\/]components[\\/](\w+)\.tsx$/)
          if (match && SECTION_COMPONENTS.includes(match[1])) {
            return `section-${match[1].toLowerCase()}`
          }
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    css: false,
  },
})
