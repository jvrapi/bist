import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, SafeAreaView } from 'react-native'
import { FloatButton } from '../../components/FloatButton'
import { Lists } from '../../components/Lists'
import { Load } from '../../components/Load'
import { getLists, ListsProps } from '../../services/List'
import { styles } from './styles'
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
    navigation.addListener('focus', () => {
      setLoading(true)
      getData()
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {!loading && (
        <>
          <Lists data={data} />
          <FloatButton navigateTo='NewList' />
        </>
      )}
      {loading && <Load />}
    </SafeAreaView>
  )
}

export { List }
