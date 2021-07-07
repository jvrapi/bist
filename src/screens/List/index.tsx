import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, SafeAreaView, View } from 'react-native'

import { FloatButton } from '../../components/FloatButton'
import { Lists } from '../../components/Lists'
import { Load } from '../../components/Load'
import { getLists, ListsProps } from '../../services/List'
import { styles } from './styles'

const List = () => {
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
  useFocusEffect(
    useCallback(() => {
      getData()
    }, [data])
  )

  useEffect(() => {
    getData()
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
