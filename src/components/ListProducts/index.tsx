import React from 'react'
import { View, FlatList } from 'react-native'
import { ListProduct } from '../../services/ListProducts'
import { ListDivider } from '../ListDivider'
import { Product } from '../Product'
import { styles } from './styles'

type Props = {
  data: ListProduct[]
  onPress(listProduct: ListProduct): void
}

const ListProducts: React.FC<Props> = ({ data, onPress }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Product data={item} handleSelectedProduct={onPress} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        ListHeaderComponent={() => <ListDivider isCentered />}
        style={styles.products}
        contentContainerStyle={{ paddingBottom: 68, paddingTop: 50 }}
      />
    </View>
  )
}

export { ListProducts }
