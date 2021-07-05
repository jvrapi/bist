import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    paddingHorizontal: 10
  },
  input: {
    flex: 1,
    width: '100%',
    fontSize: 20,
    fontFamily: theme.fonts.title700
  }
})
