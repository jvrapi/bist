import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { Card } from '../Card'
import { ListsProps } from '../../services/List'

type Props = RectButtonProps & {
  data: ListsProps
}
const ListItem: React.FC<Props> = ({ data }) => {
  const parseDate = (date: string) => {
    const dateArray = date.split('T')[0].split('-')
    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
  }
  return (
    <RectButton>
      <Card style={styles.container}>
        <View>
          <Text style={styles.dateText}>{parseDate(data.createdAt)}</Text>
        </View>
        <View>
          <Text style={styles.totalText}>Total R$ {data.total}</Text>
        </View>
      </Card>
    </RectButton>
  )
}

export { ListItem }
