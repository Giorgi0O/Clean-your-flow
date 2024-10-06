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
      animation: {
        'bg-left-gradient-enter': 'bg-left-gradient-enter 3s ease forwards',
      },
      keyframes: {
        'bg-left-gradient-enter': {
         '0%': { opacity: 0, transform: 'rotate(-90deg)' }, 
          '100%': { opacity: 1, transform: 'rotate(0deg)' } 
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
          "primary": "rgba(30, 186, 192, 1)", //ciano
          "secondary": "rgba(251,209,235)", //rosa chiaro
          "accent": "rgba(219, 91, 169, 1)", //rosa
          //"neutral": "rgba(100, 172, 82, 1)", //verde
          "success": "rgba(100, 172, 82, 1)", //verde
        },
      }
    ]
  },
}

