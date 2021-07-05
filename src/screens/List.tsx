import React from 'react'
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity
} from 'react-native'
import Card from '../components/Card'
import { numberToReal } from '../assets/functions'
import AddListIcon from '../assets/icons/add-list.svg'
import { useNavigation } from '@react-navigation/native'

interface Items {
  price: number
  amount: number
}

const List = () => {
  const navigation = useNavigation()

  const totalList = (items: Items[]) => {
    let total = 0
    items.forEach(item => {
      const sum = item.price * item.amount
      total += sum
    })
    return numberToReal(total)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.scroll}>
          <View style={styles.scrollContent} />
          {/* BuyLists.map((list, i) => (
          <Card style={styles.card} key={i}>
            <View style={styles.cardContent}>
              <Text style={[styles.text, styles.strong]}>{list.name}</Text>
              <Text style={[styles.text, styles.strong]}>
                Total: {totalList(list.items)}
              </Text>
            </View>
          </Card>
          )) */}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('NewList')}
          >
            <AddListIcon width='40' height='40' fill='#000000' />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '85%'
  },
  scroll: {
    width: '100%',
    backgroundColor: '#fff'
  },

  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },

  card: {
    backgroundColor: '#b9e8b9',
    margin: 10
  },

  cardContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    paddingVertical: 10
  },

  text: {
    fontSize: 16
  },

  strong: {
    fontWeight: 'bold'
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

export default List
