import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { ListProduct } from '../../services/ListProducts'
import { styles } from './styles'
import Card from '../Card'
import { calculateTotalPerItem } from '../../utils/calculateTotalPerItem'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

type Props = RectButtonProps & {
  data: ListProduct
  handleSelectedProduct(listProduct: ListProduct): void
}

const Product: React.FC<Props> = ({ data, handleSelectedProduct, ...rest }) => {
  return (
    <RectButton onPress={() => handleSelectedProduct(data)} {...rest}>
      <Card style={styles.container}>
        <View style={styles.amount}>
          <Text style={styles.amountText}>{data.amount}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{data.product.name}</Text>
          <TouchableWithoutFeedback>
            <Text style={styles.productTotal}>
              Total: R${calculateTotalPerItem(data.price, data.amount)}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </Card>
    </RectButton>
  )
}

export { Product }
