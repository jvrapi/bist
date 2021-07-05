import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
    padding: 10
  },

  scrollContainer: {
    width: '100%',
    minHeight: 30,
    maxHeight: '40%',
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
    borderBottomColor: '#000'
  },

  productContainer: {
    padding: 3,
    marginLeft: 10,
    marginBottom: 10
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

export const buyListStyles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: '100%',
    height: '70%'
  },

  scroll: {
    width: '100%'
  },

  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    paddingHorizontal: 20
  },

  card: {
    backgroundColor: theme.colors.primary,
    margin: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row'
  },

  textContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    marginHorizontal: 20
  },

  productName: {
    fontSize: 20,
    color: theme.colors.heading,
    fontFamily: theme.fonts.title700
  },
  productAmount: {
    fontSize: 20,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text500
  },
  productTotal: {
    fontSize: 17,
    color: theme.colors.heading,
    fontFamily: theme.fonts.title500
  },

  input: {
    fontSize: 17
  }
})
