import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import NewProduct from '../../assets/icons/add-to-basket.svg'
import Loupe from '../../assets/icons/loupe.svg'
import { styles, inputStyles } from './styles'

type Props = {
  productsFoundLength: number
  optionSelected: number
  searchText: string
  setOptionSelected(option: number): void
  finishBuy(): void
  findProducts(text: string): Promise<void>
}

const NewListHeader: React.FC<Props> = ({
  productsFoundLength,
  optionSelected,
  finishBuy,
  setOptionSelected,
  searchText,
  findProducts
}) => {
  const [showInputContainer, setShowInputContainer] = useState(true)
  const [showInput, setShowInput] = useState(false)
  const findProductStyle = inputStyles(productsFoundLength > 0)

  const onPressLoupe = () => {
    setShowInput(true)
    setShowInputContainer(false)
    setOptionSelected(0)
  }
  const onPressNewProduct = () => {
    setShowInput(true)
    setShowInputContainer(false)
    setOptionSelected(1)
  }
  return (
    <View style={styles.container}>
      {showInputContainer && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={onPressLoupe}>
            <Loupe width='30' height='30' fill='#000000' />
          </TouchableOpacity>

          <TouchableOpacity onPress={onPressNewProduct}>
            <NewProduct width='50' height='50' fill='#000000' />
          </TouchableOpacity>

          <TouchableOpacity onPress={finishBuy}>
            <MaterialCommunityIcons
              name='playlist-check'
              size={50}
              color='black'
            />
          </TouchableOpacity>
        </View>
      )}
      {showInput && (
        <View style={{ padding: 10 }}>
          <View style={findProductStyle.container}>
            {
              <TouchableOpacity
                onPress={() => {
                  setShowInputContainer(true)
                  setShowInput(false)
                }}
              >
                {optionSelected === 1 ? (
                  <NewProduct width='40' height='40' fill='#000000' />
                ) : (
                  <Loupe width='30' height='30' fill='#000000' />
                )}
              </TouchableOpacity>
            }
            <TextInput
              placeholder='Insira o nome do produto'
              style={findProductStyle.input}
              onChangeText={text => findProducts(text)}
              value={searchText}
            />
          </View>
        </View>
      )}
    </View>
  )
}

export default NewListHeader
