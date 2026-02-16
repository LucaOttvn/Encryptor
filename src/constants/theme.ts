import { StyleSheet } from 'react-native'

export const Colors = {
  light: {
    foreground: '#000000',
    background: '#fff',
    grey: '#707070',
  },
  dark: {
    foreground: '#ECEDEE',
    background: '#101010',
    grey: '#404040',
  },
};

export const typography = StyleSheet.create({
  h1: { fontSize: 30, fontFamily: 'Montserrat_700Bold' },
  h2: { fontSize: 24, fontFamily: 'Montserrat_700Bold' },
  h3: { fontSize: 16, fontFamily: 'Montserrat_700Bold' },
});