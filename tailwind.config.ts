import type { Config } from 'tailwindcss'


const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'yellow': '#e9f542',
        'green': '#35d415',
        'blue': '#171ee8',
        'red': '#ff0008',
        'pink': '#eb1097',
        'cyan': '#02b296',
        'purple': '#a50cad',
        'black': '#000000',
        'white': '#ffffff',
      }
    },
  },
  plugins: [],
}
export default config
