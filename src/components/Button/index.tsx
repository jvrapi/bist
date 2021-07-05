import React from 'react'
import { View, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { styles } from './styles'
import { Feather } from '@expo/vector-icons'

type Props = RectButtonProps & {
  label: string
}

const Button: React.FC<Props> = ({ label, ...rest }) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <View style={styles.iconWrapper}>
        <Feather
          name='check-circle'
          size={24}
          color='black'
          style={styles.icon}
        />
      </View>
      <Text style={styles.title}>{label}</Text>
    </RectButton>
  )
}

export { Button }
