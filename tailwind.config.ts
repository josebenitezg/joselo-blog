import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./app/**/*.{ts,tsx}', './content/**/*.mdx', './public/**/*.svg'],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        grey: {
            50: "#f7f6f6",
            100: "#e6e2e1",
            200: "#cdc5c2",
            300: "#aca19c",
            400: "#8a7d77",
            500: "#70615c",
            600: "#584e49",
            700: "#48423d",
            800: "#3c3633",
            900: "#342f2d",
            950: "#1c1917",
        },
    },
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
