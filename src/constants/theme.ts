import { StyleSheet } from 'react-native'

export const Colors = {
  light: {
    background: '#fff',
    foreground: '#000000',
    grey: '#707070',
    lightGrey: '#909090',
    accent: '#CDFD02',
  },
  dark: {
    background: '#101010',
    foreground: '#ffffff',
    grey: '#404040',
    lightGrey: '#909090',
    accent: '#dcff42',
    // Paper
    // accent: '#FFDB9C',
  },
};

export const typography = StyleSheet.create({
  h1: { fontSize: 32, fontFamily: 'Montserrat_700Bold' },
  h2: { fontSize: 24, fontFamily: 'Montserrat_700Bold' },
  h3: { fontSize: 16, fontFamily: 'Montserrat_700Bold' },
  digitalH1: { fontSize: 50, fontFamily: 'draco' },
  digitalParagraph: { fontSize: 35, fontFamily: 'draco' }
});