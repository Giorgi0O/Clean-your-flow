/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        number: ['Inter', 'sans-serif'],
        titolo: ['Spectral', 'serif'],
        corpo: ['Cabin', 'sans-serif'],
      },
      colors: {
        ciano: {
          DEFAULT: 'rgba(30, 186, 192, 1)',
          dark: 'rgba(13, 83, 85, 1)',
          light: 'rgba(166, 236, 238, 1)',
          opacity: 'rgba(166,236,238,0.4)',
        },
        rosa: {
          DEFAULT: 'rgba(219, 91, 169, 1)',
          dark: 'rgba(122, 51, 94, 1)',
          light: 'rgba(251,209,235)',
          opacity: 'rgba(251,209,235,0.4)',
        },
        verde: {
          DEFAULT: 'rgba(100, 172, 82, 1)',
          dark: 'rgba(30, 52, 25, 1)',
          light: 'rgba(193,222,186)',
          opacity: 'rgba(193,222,186,0.4)',
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        ligth: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "rgba(30, 186, 192, 1)",
          "secondary": "rgba(100, 172, 82, 1)",
          "accent": "rgba(219, 91, 169, 1)",
          "neutral": "rgba(166, 236, 238, 1)",
        },
      }
    ]
  },
}

