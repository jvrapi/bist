import React from 'react'
import { View } from 'react-native'
import { styles } from './styles'
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text'

const InputPrice: React.FC<TextInputMaskProps> = ({ ...rest }) => {
  return (
    <View style={styles.container}>
      <TextInputMask
        includeRawValueInChangeText
        style={styles.input}
        placeholder='Preço'
        {...rest}
      />
    </View>
  )
}

export { InputPrice }
