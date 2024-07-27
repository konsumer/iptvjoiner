/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'
import prose from '@tailwindcss/typography'
const { addDynamicIconSelectors } = require('@iconify/tailwind')

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [prose, daisyui, addDynamicIconSelectors()],
  daisyui: {
    logs: false
  }
}
