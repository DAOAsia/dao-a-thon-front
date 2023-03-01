import { extendTheme } from '@chakra-ui/react'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = {
  sm: '320px',
  md: '959px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: '#16161D',
        _dark: '#ade3b8',
      },
      heroGradientStart: {
        default: '#7928CA',
        _dark: '#e3a7f9',
      },
      heroGradientEnd: {
        default: '#FF0080',
        _dark: '#fbec8f',
      },
    },
    radii: {
      button: '12px',
    },
  },
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints,
})

export default theme
