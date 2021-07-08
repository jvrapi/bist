import Icon from '@expo/vector-icons/FontAwesome5'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ListsProps } from '../../services/List'
import { styles } from './styles'

type Props = {
  data: ListsProps
  removeItemFromList(listId: string): Promise<void>
}
const ListItem: React.FC<Props> = ({ data, removeItemFromList }) => {
  const parseDate = (date: string) => {
    const dateArray = date.split('T')[0].split('-')
    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
  }

  const handleDeleteList = async () => {
    await removeItemFromList(data.id)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteList}>
        <Icon name='times-circle' size={20} color='#000' />
      </TouchableOpacity>
      <View>
        <Text style={styles.dateText}>{parseDate(data.createdAt)}</Text>
      </View>
      <View>
        <Text style={styles.totalText}>Total R$ {data.total}</Text>
      </View>
    </View>
  )
}

export { ListItem }
