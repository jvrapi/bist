import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 350,
    backgroundColor: '#FFF'
  },

  overlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1
  },

  content: {
    flex: 1
  },
  bar: {
    width: 39,
    height: 2,
    borderRadius: 2,
    backgroundColor: '#495BCC',
    alignSelf: 'center',
    marginTop: 13
  }
})
