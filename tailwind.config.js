const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    fontFamily: {
      satoshi: ['Satoshi', 'sans-serif']
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      backgroundImage: () => ({
        'yourLoot-brand-gradient':
          'linear-gradient(rgba(195, 162, 241, 1) 0%, rgba(102, 78, 171, 1) 100%)',
        'gradient-brand-outline':
          'linear-gradient(180deg, rgba(195, 162, 241, 0.25) 0%, rgba(102, 78, 171, 0.25) 100%)',
        'gradient-brand-hover':
          'linear-gradient(0deg, rgba(154, 103, 255, 0.20) 0%, rgba(154, 103, 255, 0.20) 100%), radial-gradient(103.94% 265.37% at 59.95% -118.74%, #654EC8 0%, #372864 100%)',
        'gradient-brand-active':
          'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), radial-gradient(103.94% 265.37% at 59.95% -118.74%, #654EC8 0%, #372864 100%)',

        // button
        'gradient-default':
          'radial-gradient(103.94% 265.37% at 59.95% -118.74%, #654EC8 0%, #372864 100%)',
        'gradient-default-hover':
          'linear-gradient(0deg, rgba(154, 103, 255, 0.20) 0%, rgba(154, 103, 255, 0.20) 100%), radial-gradient(103.94% 265.37% at 59.95% -118.74%, #654EC8 0%, #372864 100%)',
        'gradient-default-active':
          'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), radial-gradient(103.94% 265.37% at 59.95% -118.74%, #654EC8 0%, #372864 100%)',
        'gradient-default-disabled':
          'radial-gradient(103.94% 265.37% at 59.95% -118.74%, #474747 0%, #1C1C1C 100%)',

        'gradient-muted':
          'linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.10) 100%)',
        'gradient-muted-hover':
          'linear-gradient(0deg, rgba(154, 103, 255, 0.20) 0%, rgba(154, 103, 255, 0.20) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.10) 100%)',
        'gradient-muted-active':
          'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.10) 100%)',
        'gradient-muted-disabled':
          'linear-gradient(0deg, rgba(97, 97, 97, 0.20) 0%, rgba(97, 97, 97, 0.20) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.10) 100%)',

        'gradient-cta':
          'radial-gradient(103.94% 265.37% at 59.95% -118.74%, #43F45E 0%, #107A27 100%)',
        'gradient-cta-hover':
          'linear-gradient(0deg, rgba(151, 255, 170, 0.40) 0%, rgba(151, 255, 170, 0.40) 100%), radial-gradient(103.94% 265.37% at 59.95% -118.74%, #43F45E 0%, #107A27 100%)',
        'gradient-cta-active':
          'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), radial-gradient(103.94% 265.37% at 59.95% -118.74%, #43F45E 0%, #107A27 100%)',
        'gradient-cta-disabled':
          'radial-gradient(103.94% 265.37% at 59.95% -118.74%, #474747 0%, #1C1C1C 100%)',

        'yourLoot-cta-gradient':
          'radial-gradient(103.94% 265.37% at 59.95% -118.74%, #43F45E 0%, #107A27 100%)',
        'yourLoot-cta-outline':
          'linear-gradient(180deg, rgba(166, 241, 162, 0.25) 0%, rgba(78, 171, 89, 0.25) 100%)',
        'gradient-cta-hover':
          'linear-gradient(0deg, rgba(151, 255, 170, 0.40) 0%, rgba(151, 255, 170, 0.40) 100%), radial-gradient(103.94% 265.37% at 59.95% -118.74%, #43F45E 0%, #107A27 100%)',
        'gradient-cta-active':
          'linear-gradient(rgba(67, 244, 94, 1) 0%, rgba(16, 122, 39, 1) 100%)',
        'gradient-cta-disabled':
          'linear-gradient(rgba(71, 71, 71, 1) 0%, rgba(28, 28, 28, 1) 100%)',
        'yourLoot-brand-gradient':
          'radial-gradient(103.94% 265.37% at 59.95% -118.74%, #654EC8 0%, #372864 100%)',
        'yourLoot-brand-outline':
          'linear-gradient(180deg, rgba(195, 162, 241, 0.25) 0%, rgba(102, 78, 171, 0.25) 100%)',
        'yourtLoot-brand-gradient-hover':
          'linear-gradient(0deg, rgba(154, 103, 255, 0.20) 0%, rgba(154, 103, 255, 0.20) 100%), radial-gradient(103.94% 265.37% at 59.95% -118.74%, #654EC8 0%, #372864 100%)',
        'yourLoot-brand-gradient-active':
          'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), radial-gradient(103.94% 265.37% at 59.95% -118.74%, #654EC8 0%, #372864 100%)',
        'yourLoot-gray-gradient':
          'radial-gradient(103.94% 265.37% at 59.95% -118.74%, #474747 0%, #1C1C1C 100%)',
        'yourLoot-brand-light':
          'linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.10) 100%);',

        // header
        'header-balance':
          'linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.10) 100%)',
        'header-deposit':
          'radial-gradient(103.94% 265.37% at 59.95% -118.74%, #43F45E 0%, #107A27 100%);',

        // home
        'home-banner':
          'linear-gradient(180deg, rgba(64, 53, 85, 0.20) 0%, rgba(0, 0, 0, 0.10) 100%)',
        'home-withdraw':
          'radial-gradient(237.29% 116.82% at 60.95% -22.92%, #362C5A 0%, #181526 100%)',

        // footer:
        'footer-background-active':
          'linear-gradient(0deg, rgba(154, 103, 255, 0.20) 0%, rgba(154, 103, 255, 0.20) 100%)',
        'sidebar-active':
          'radial-gradient(103.94% 265.37% at 59.95% -118.74%, #654EC8 0%, #372864 100%)',
        'sidebar-active-light':
          'radial-gradient(103.94% 265.37% at 59.95% -118.74%, rgba(101, 78, 200, 0.40) 0%, rgba(55, 40, 100, 0.40) 100%)',

        // custom gradient
        'gradient-custom':
          'linear-gradient(193.7deg, #9CAEEF -1.38%, #C693DF 54.15%, #E8CCCC 111.97%)',
        'gradient-border':
          'linear-gradient(194deg, #9CAEEF -1.38%, #C693DF 54.15%, #E8CCCC 111.97%)',
        'gradient-scrollbar':
          'linear-gradient(180deg, rgba(194.88, 161.80, 241.19, 0.25) 0%, rgba(101.57, 78.40, 171.06, 0.25) 100%)'
      }),
      boxShadow: {
        'header-balance':
          '6px 6px 12px 0px rgba(22, 20, 24, 0.50), -6px -6px 24px 0px rgba(148, 95, 255, 0.15)',
        'header-deposit':
          '6px 6px 12px 0px rgba(22, 20, 24, 0.50), -6px -6px 24px 0px rgba(113, 255, 95, 0.15)',
        'header-account-level':
          '6px 6px 12px 0px rgba(22, 20, 24, 0.50), -6px -6px 24px 0px rgba(148, 95, 255, 0.15)',
        'scrollbar-shadow': '-1px -1px 4px rgba(148.04, 94.56, 255, 0.15)'
      },
      colors: {
        'app-brand-light': '#D9CEFF',
        'app-brand-medium': '#9E90CF',
        'app-brand-dark': '#6C6395',
        'app-warning': '#E3B075',
        // surface tokens for category chips
        'app-surface': '#191524',
        'app-surface-hover': '#302945',
        'app-cta-light': '#97FFAA',
        'app-gray': '#605E68',
        'app-pale': '#C5C0D8',
        'app-white': '#FFF',
        'app-danger': '#D94244',
        'app-success': '#48E364',
        'app-primary': '#654EC8',
        'app-primary-dark': '#372864',
        'app-primary-light': '#C3A2F1',
        'app-cta': '#43F45E',
        'app-cta-dark': '#29B935',
        'app-cta-darker': '#1E9935',
        'app-background': '#0B0A11',
        'app-background-darker': '#040305',
        'app-border': '#2A2242',
        'app-gradient-start': '#9CAEEF'
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      fontSize: {
        'app-main-24': ['24px', { lineHeight: 'normal', fontWeight: '900' }],
        'app-main-20': ['20px', { lineHeight: 'normal', fontWeight: '900' }],
        'app-medium-14': ['14px', { lineHeight: 'normal', fontWeight: '500' }],
        'app-bold-14': ['14px', { lineHeight: 'normal', fontWeight: '900' }],
        'app-medium-16': ['16px', { lineHeight: 'normal', fontWeight: '500' }],
        'app-medium-12': ['12px', { lineHeight: 'normal', fontWeight: '500' }],
        'app-bold-12': ['12px', { lineHeight: 'normal', fontWeight: '900' }],
        'app-bold-10': ['10px', { lineHeight: 'normal', fontWeight: '700' }],
        'v2-app-medium-16': ['16px', { lineHeight: '16px', fontWeight: '500' }],
        'v2-app-medium-14': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'v2-app-medium-12': ['12px', { lineHeight: '12px', fontWeight: '500' }],
        'v2-app-medium-20': ['20px', { lineHeight: '20px', fontWeight: '900' }],
        'v2-app-medium-24': ['24px', { lineHeight: '24px', fontWeight: '900' }]
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.border-app-default': {
          border: '1px solid rgba(92, 70, 123, 0.5)'
        },
        '.border-app-v2': {
          border: '1px solid #2A2242'
        },
        '.outline-app-default': {
          outline: '1px solid rgba(92, 70, 123, 0.5)'
        },
        '.scrollbar-custom': {
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent'
          },
          '&::-webkit-scrollbar-thumb': {
            background:
              'linear-gradient(180deg, rgba(194.88, 161.80, 241.19, 0.25) 0%, rgba(101.57, 78.40, 171.06, 0.25) 100%)',
            borderRadius: '15px',
            boxShadow: '-1px -1px 4px rgba(148.04, 94.56, 255, 0.15)'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background:
              'linear-gradient(180deg, rgba(194.88, 161.80, 241.19, 0.4) 0%, rgba(101.57, 78.40, 171.06, 0.4) 100%)'
          }
        }
      })
    })
  ]
}
