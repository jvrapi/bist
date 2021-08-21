import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  scrollContainer: {
    width: '100%',
    minHeight: 30,
    maxHeight: '70%',
    position: 'absolute',
    top: 60,
    paddingHorizontal: 10
  },

  scroll: {
    backgroundColor: '#ffffff',
    borderColor: '#000',

    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderRightWidth: 2,

    borderLeftWidth: 2,

    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingBottom: 50
  },

  productContainer: {
    padding: 3,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10
  },

  loading: {
    flex: 1
  },

  totalListContainer: {
    backgroundColor: '#b9e8b9',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  totalListText: {
    fontSize: 18
  },
  totalListValueText: {
    fontWeight: 'bold',
    fontSize: 19
  },

  modalContent: {
    paddingHorizontal: 10
  },

  finishModalButton: {
    width: '70%',
    backgroundColor: theme.colors.on,
    height: 60,
    marginTop: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  finishModalButtonText: {
    fontSize: 20,
    color: theme.colors.secondary100,
    fontFamily: theme.fonts.title700
  }
})
