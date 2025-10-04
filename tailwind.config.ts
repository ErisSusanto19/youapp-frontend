import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/entities/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#09141A',
          DEFAULT: '#0D1D23',
          light: '#1F4247'
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#D1D5DB'
        },
        gradient: {
          cyan: '#62CDCC',
          blue: '#4599D9'
        },
        gold: '#E1C56A'
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif']
      },
      fontSize: {
        'heading': ['24px', {fontWeight: '700', lineHeight: '100%'}],
        'body': ['13px', {fontWeight: 500, lineHeight: '100%'}]
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px'
      }
    },
  },
  plugins: [],
}
export default config
