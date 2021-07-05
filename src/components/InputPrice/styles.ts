import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '50%',
    borderRadius: 15,
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: theme.colors.inputBackground,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 50,
    paddingHorizontal: 10
  },
  input: {
    flex: 1,
    width: '100%',
    fontSize: 20,
    fontFamily: theme.fonts.title700,
    textAlign: 'center'
  }
})
