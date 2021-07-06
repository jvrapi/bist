import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    height: '85%'
  },

  lists: {
    width: '100%'
  },

  buttonContainer: {
    alignItems: 'center',
    position: 'absolute',
    borderColor: 'green',
    borderWidth: 3,
    borderRadius: 70,
    textAlign: 'center',
    justifyContent: 'center',
    bottom: -100,
    right: 160,
    height: 80,
    width: 80
  },
  button: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})
