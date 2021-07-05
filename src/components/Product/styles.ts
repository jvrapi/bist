import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: theme.colors.primary,
    height: 100
  },

  amount: {
    backgroundColor: '#FAFAFA',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },

  amountText: {
    fontSize: 20,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text500
  },
  textContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    paddingRight: 10
  },
  productName: {
    fontSize: 20,
    color: theme.colors.heading,
    fontFamily: theme.fonts.title700
  },

  productTotal: {
    fontSize: 20,
    color: theme.colors.heading,
    fontFamily: theme.fonts.title500
  },

  modalContent: {
    paddingHorizontal: 10
  }
})
