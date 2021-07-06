import React from 'react'
import { View, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { ListsProps } from '../../services/List'
import Card from '../Card'
import { styles } from './styles'

type Props = RectButtonProps & {
  data: ListsProps
}

const Lists: React.FC<Props> = ({ data, ...rest }) => {
  const parseDate = (date: string) => {
    const dateArray = date.split('T')[0].split('-')
    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
  }
  return (
    <RectButton {...rest}>
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

export { Lists }
