import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native'

import AddListIcon from '../../assets/icons/add-list.svg'
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles'
import { ListDivider } from '../../components/ListDivider'
import { Lists } from '../../components/Lists'
import { Load } from '../../components/Load'
import { getLists, ListsProps } from '../../services/List'

const List = () => {
  const navigation = useNavigation()
  const [data, setData] = useState<ListsProps[]>([])
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    try {
      const { data } = await getLists()
      setData(data)
    } catch (error) {
      Alert.alert('Erro ao listar as listas de compras')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {!loading && (
        <View style={styles.listContainer}>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Lists data={item} />}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            ListHeaderComponent={() => <ListDivider isCentered />}
            style={styles.lists}
            contentContainerStyle={{ paddingBottom: 68, paddingTop: 50 }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('NewList')}
            >
              <AddListIcon width='40' height='40' fill='#000000' />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {loading && <Load />}
    </SafeAreaView>
  )
}

export { List }
