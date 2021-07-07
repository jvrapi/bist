import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-svg'
import AddListIcon from '../../assets/icons/add-list.svg'

import { styles } from './styles'

type Props = {
  navigateTo: string
}

const FloatButton: React.FC<Props> = ({ navigateTo }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(navigateTo)}
      >
        <Text>Botão</Text>
        <AddListIcon width='40' height='40' fill='#000000' />
      </TouchableOpacity>
    </View>
  )
}

export { FloatButton }
