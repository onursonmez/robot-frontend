/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {      
      colors: {
      fountainblue: {
        100: '#D7F0EC',
        300: '#69C1B6',
        400: '#53AEA5',
        500: '#3A928C',
        600: '#2C7570',
        700: '#275E5C',
        800: '#244B4A',
        900: '#505D6A'
      },
      paradiso: {
        300: '#7ECAC1'
      },
      swansdown: {
        50: '#F0F9F8'
      },
      porcelain: {
        50: '#FCFDFD',
        100: '#ECF2F2',
        150: '#E9F3F3'
        // 150: '#E8F0F0'
      },
      palesky: {
        50: '#F4F6F7',
        100: '#E3E7EA',
        200: '#CAD2D7',
        300: '#A5B1BB',
        400: '#798A97',
        500: '#657786',
        600: '#505D6A',
        700: '#454E59',
        800: '#3E454C',
        900: '#373C42'
      },
      bostonblue: {
        500: '#3B85C4',
        700: '#225282'
      },
      blackhaze: {
        50: '#FAFBFB'
      },
      astronaut: {
        600: '#335796',
        700: '#2C497F'
      },
      towerGray: {
        300: '#ADBABA'
      },
      athensGray: {
        50: '#F4F7FA',
        80: '#EEF2F6',
        100: '#E7ECF2',
        200: '#D5DDE8',
        300: '#BDCADB'
      },
      regalBlue: {
        800: '#095183',
        900: '#0E456D',
        950: '#092C48'
      },
      secondBlue: {
        50: '#F1F8FE',
        100: '#E3F1FD',
        500: '#65aef5'
      },
      secondRed: {
        100: '#FAF0EF',
        500: '#EF8489'
      },
      secondYellow: {
        100: '#FFF8E6',
        500: '#F4CA4D'
      },
      secondGreen: {
        100: '#E5F5F4',
        500: '#5CC1B7'
      }
    },
  },
  },
  plugins: [],
};
