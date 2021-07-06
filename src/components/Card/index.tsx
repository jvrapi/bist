import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacityProps,
  View,
  ViewStyle
} from 'react-native'

interface Props extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>
}

const Card: React.FC<Props> = ({ children, ...props }) => {
  return (
    <View {...props} style={[styles.container, props.style]}>
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    backgroundColor: '#ffffff',
    borderRadius: 5
  }
})
