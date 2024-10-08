module.exports = {
  purge: false, // we do Purge CSS separately
  theme: {
    extend: {
      colors: {
        white: '#fefefe',
        black: '#010101',
        orange: {
          100: '#fffaf0',
          200: '#feebc8',
          300: '#fbd38d',
          400: '#f6ad55',
          500: '#ed8936',
          600: '#dd6b20',
          700: '#c05621',
          800: '#9c4221',
          900: '#7b341e',
        },
        primary: 'var(--color-primary)',
        'primary-shade': 'var(--color-primary-shade)',
        'primary-complement': 'var(--color-primary-complement)',
        'primary-complement-shade': 'var(--color-primary-complement-shade)',
        secondary: 'var(--color-secondary)',
        'secondary-complement': 'var(--color-secondary-complement)',
        'secondary-shade': 'var(--color-secondary-shade)'
      },
      // fontFamily: {
      //   sans: [
      //     'Nunito Sans'
      //   ],
      //   mono: [
      //     'monospace',
      //   ],
      // },
      lineHeight: {
        normal: '1.6',
        loose: '1.75',
      },
      maxWidth: {
        none: 'none',
        '7xl': '80rem',
        '8xl': '88rem'
      },
      spacing: {
        '7': '1.75rem',
        '9': '2.25rem'
      },
      boxShadow: {
        'lg': '0 -1px 27px 0 rgba(0, 0, 0, 0.04), 0 4px 15px 0 rgba(0, 0, 0, 0.08)',
      },
    },
    // fontSize: {
    //   'xs': '.8rem',
    //   'sm': '.925rem',
    //   'base': '1rem',
    //   'lg': '1.125rem',
    //   'xl': '1.25rem',
    //   '2xl': '1.5rem',
    //   '3xl': '1.75rem',
    //   '4xl': '2.125rem',
    //   '5xl': '2.625rem',
    //   '6xl': '10rem',
    // },
  },
  variants: {
    borderRadius: ['responsive', 'focus'],
    borderWidth: ['responsive', 'active', 'focus'],
    width: ['responsive', 'focus']
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.transition-fast': {
          transition: 'all .2s ease-out',
        },
        '.transition': {
          transition: 'all .5s ease-out',
        },
      }
      addUtilities(newUtilities)
    }
  ], 
  content: [
    './source/**/*.{html,md,js,vue,php}',
    './*.php'
  ]
}
