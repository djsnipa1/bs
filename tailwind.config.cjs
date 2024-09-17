const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');
const plugin = require('tailwindcss/plugin');

const textShadowPlugin = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      'text-shadow': (value) => ({
        textShadow: value
      })
    },
    { values: theme('textShadow') }
  );
});

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  daisyui: {
    logs: false,
  },
  theme: {
    extend: {
      fontFamily: {
        sofiasans: ['"Sofia Sans Variable"', 'sans-serif'],
        kiona: ['"Kiona"', 'sans-serif']
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)'
      }
    }
  },

  plugins: [textShadowPlugin, typography, daisyui]
};

module.exports = config;
