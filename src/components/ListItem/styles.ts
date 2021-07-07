import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: theme.colors.primary,
    height: 100
  },
  dateText: {
    fontSize: 18,
    fontFamily: theme.fonts.text500,
    color: theme.colors.heading
  },
  totalText: {
    fontSize: 18,
    fontFamily: theme.fonts.text500,
    color: theme.colors.heading
  }
})
