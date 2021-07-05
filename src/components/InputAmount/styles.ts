import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  inputContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: theme.colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10
  },
  input: {
    fontSize: 20,
    fontFamily: theme.fonts.title700
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70
  }
})
