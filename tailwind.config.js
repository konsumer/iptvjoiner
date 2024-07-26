/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'
import prose from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [prose, daisyui],
  daisyui: {
    logs: false
  }
}
