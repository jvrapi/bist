import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
    padding: 10
  }
})

export const inputStyles = (hasData: boolean) =>
  StyleSheet.create({
    container: {
      width: '100%',
      borderWidth: 2,
      borderColor: '#000',

      borderBottomStartRadius: hasData ? 0 : 20,
      borderBottomEndRadius: hasData ? 0 : 20,
      borderBottomColor: hasData ? '#ccc' : '#000',

      borderTopEndRadius: 20,
      borderTopStartRadius: 20,

      height: 50,
      flexDirection: 'row',
      paddingHorizontal: 15,
      alignItems: 'center',

      padding: 10
    },
    input: {
      flex: 1,
      fontSize: 15,
      marginLeft: 10,
      fontFamily: theme.fonts.title700
    }
  })
