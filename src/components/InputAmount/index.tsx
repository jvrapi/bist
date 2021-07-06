import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import { AntDesign } from '@expo/vector-icons'

type Props = {
  amount: number
  increment(): void
  decrement(): void
}

const InputAmount: React.FC<Props> = ({ amount, increment, decrement }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={decrement}>
        <AntDesign name='minus' size={24} color='black' />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.input}>{amount}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={increment}>
        <AntDesign name='plus' size={24} color='black' />
      </TouchableOpacity>
    </View>
  )
}

export { InputAmount }
