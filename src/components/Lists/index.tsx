import React from 'react'
import { FlatList, View } from 'react-native'
import { RectButtonProps } from 'react-native-gesture-handler'
import { ListsProps } from '../../services/List'
import { ListDivider } from '../ListDivider'
import { ListItem } from '../ListItem'
import { styles } from './styles'

type Props = RectButtonProps & {
  data: ListsProps[]
}

const Lists: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ListItem data={item} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        style={styles.lists}
        contentContainerStyle={{ paddingBottom: 68, paddingTop: 50 }}
      />
    </View>
  )
}

export { Lists }
