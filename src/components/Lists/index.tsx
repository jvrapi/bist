import React, { useState } from 'react'

import { Alert, FlatList, View } from 'react-native'
import { RectButtonProps } from 'react-native-gesture-handler'
import { deleteLists, ListsProps } from '../../services/List'
import { ListDivider } from '../ListDivider'
import { ListItem } from '../ListItem'
import { styles } from './styles'

type Props = RectButtonProps & {
  data: ListsProps[]
}

const Lists: React.FC<Props> = ({ data, ...rest }) => {
  const [lists, setLists] = useState(data)

  const removeItemFromList = async (listId: string) => {
    const dataUpdated = lists.filter(list => list.id !== listId)
    setLists(dataUpdated)
    try {
      await deleteLists([listId])
    } catch {
      Alert.alert('Erro ao tentar excluir a lista')
    }
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem data={item} removeItemFromList={removeItemFromList} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        style={styles.lists}
        contentContainerStyle={{ paddingBottom: 68, paddingTop: 50 }}
      />
    </View>
  )
}

export { Lists }
