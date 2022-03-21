import { createStitches, createTheme } from '@stitches/react';
import {
  blue,
  green,
  gray,
  red,
  grayDark,
  blueDark,
  greenDark,
  redDark,
} from '@radix-ui/colors';

export const { styled, globalCss, keyframes, theme, css } = createStitches({
  theme: {
    colors: {
      ...blue,
      ...gray,
      ...green,
      ...red,
    },
    radii: {
      button: '0.25rem',
      image: '0.5rem',
      main: '1rem',
    },
    space: {
      button: '0.5rem 1rem',
    },
    sizes: {
      button: '8em',
    },
    transitions: {
      main: 'all 0.1s ease-in-out',
    },
    fonts: {
      accent: 'Syncopate, system-ui, sans-serif',
      body: 'Quicksand, system-ui, sans-serif',
    },
    fontSizes: {
      minFluid: '2rem',
      fluid: 'clamp(2rem, 4vw, 4rem)',
      maxFluid: '4rem',
    },
    shadows: {
      high: `rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px`,
      medium: `rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px`,
      low: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px`,
    },
  },
  media: {
    xs: '(min-width: 200px)',
    md: '(min-width: 350px)',
    lg: '(min-width: 600px)',
    xl: '(min-width: 800px)',
    xxl: '(min-width: 1200px)',
  },
});

export const darkTheme = createTheme({
  colors: {
    ...grayDark,
    ...blueDark,
    ...greenDark,
    ...redDark,
  },
});
