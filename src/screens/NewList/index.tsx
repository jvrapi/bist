import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import NewProduct from '../../assets/icons/add-to-basket.svg'
import Loupe from '../../assets/icons/loupe.svg'
import Card from '../../components/Card'
import {
  getDetails,
  ListProduct,
  updateList
} from '../../services/ListProducts'
import { getByName, Product } from '../../services/Product'
import { ModalPrice } from '../../components/ModalPrice'
import { styles, inputStyles, buyListStyles } from './styles'
import { InputPrice } from '../../components/PriceInput'

const NewList: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [showInputContainer, setShowInputContainer] = useState(true)
  const [showInput, setShowInput] = useState(false)
  const [optionSelected, setOptionSelected] = useState(0)
  const [data, setData] = useState<ListProduct[]>([])
  const [productsFound, setProductFound] = useState<Product[]>([])
  const [showModalPrice, setShowModalPrice] = useState(false)
  const [value, setValue] = useState('')
  const [editingItem, setEditingItem] = useState<ListProduct>({} as ListProduct)

  const findProductStyle = inputStyles(productsFound.length > 0)

  const getData = async () => {
    try {
      const { data } = await getDetails('30afea7e-c4dc-4e9c-b507-be8def596d10')
      setData(data)
    } catch (error) {
      Alert.alert('Error')
    } finally {
      setLoading(false)
    }
  }

  const findProducts = async (productName: string) => {
    if (productName) {
      try {
        if (optionSelected === 0) {
          return null
        } else {
          const { data } = await getByName(productName)
          setProductFound(data)
        }
      } catch (error) {
        Alert.alert('Erro ao pesquisar o produto')
      }
    } else {
      setProductFound([])
      getData()
    }
  }

  const addItemToList = async (product: Product) => { }

  const updateListProduct = async (listProduct: ListProduct) => {
    try {
      await updateList(listProduct)
      await getData()
    } catch (error) {
      Alert.alert('Erro ao tentar atualizar')
    }
  }

  const updatePrice = (value: string) => {
    editingItem.price = parseFloat(value)
    setEditingItem(editingItem)
    updateListProduct(editingItem)
  }

  const calculateTotalPerItem = (price: number, amount: number) => {
    const total = parseFloat(price.toString()) * amount
    return total
  }

  const calculateTotalListValue = () => {
    let totalList = 0
    data.forEach(item => {
      const totalPerItem = calculateTotalPerItem(item.price, item.amount)
      if (totalPerItem) {
        totalList += totalPerItem
      }
    })
    return totalList
  }

  const handleModalOpened = (listProduct: ListProduct) => {
    setShowModalPrice(true)
    if (listProduct.price) {
      setValue(parseFloat(listProduct.price.toString()).toFixed(2))
    }
  }

  const handleModalClosed = async () => {
    setShowModalPrice(false)
    setValue('')
    await updateListProduct(editingItem)
  }

  const changeEditingItemState = (listProduct: ListProduct) => {
    setEditingItem(listProduct)
  }

  const finishBuy = async () => { }

  useEffect(() => {
    getData()
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {!loading && (
        <>
          {showInputContainer && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => {
                  setShowInput(true)
                  setShowInputContainer(false)
                  setOptionSelected(0)
                }}
              >
                <Loupe width='30' height='30' fill='#000000' />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setShowInput(true)
                  setShowInputContainer(false)
                  setOptionSelected(1)
                }}
              >
                <NewProduct width='50' height='50' fill='#000000' />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => finishBuy()}>
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
                />
              </View>
            </View>
          )}

          <View style={buyListStyles.container}>
            <ScrollView style={buyListStyles.scroll}>
              <View style={buyListStyles.content}>
                {data.map((item, i) => (
                  <Card key={i} style={buyListStyles.card}>
                    <TouchableOpacity
                      onPress={() =>
                        updateListProduct({
                          ...item,
                          amount: (item.amount -= 1)
                        })
                      }
                    >
                      <AntDesign name='minus' size={24} color='black' />
                    </TouchableOpacity>

                    <View style={buyListStyles.textContainer}>
                      <Text style={buyListStyles.productName}>
                        {item.product.name}
                      </Text>
                      <Text style={buyListStyles.productAmount}>
                        {item.amount}
                      </Text>

                      <TouchableWithoutFeedback
                        onPress={() => {
                          changeEditingItemState(item)
                          handleModalOpened(item)
                        }}
                      >
                        <Text style={buyListStyles.productTotal}>
                          Total: R$
                          {calculateTotalPerItem(item.price, item.amount)}
                        </Text>
                      </TouchableWithoutFeedback>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        updateListProduct({
                          ...item,
                          amount: (item.amount += 1)
                        })
                      }
                    >
                      <AntDesign name='plus' size={24} color='black' />
                    </TouchableOpacity>
                  </Card>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.totalListContainer}>
            <Text style={styles.totalListText}>
              Total da Lista:{' '}
              <Text style={styles.totalListValueText}>
                R$ {calculateTotalListValue()}
              </Text>
            </Text>
          </View>

          {productsFound.length > 0 && (
            <View style={styles.scrollContainer}>
              <ScrollView style={styles.scroll}>
                {productsFound.map((product, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.productContainer}
                    onPress={() => addItemToList(product)}
                  >
                    <Text key={i}>{product.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <ModalPrice visible={showModalPrice} closeModal={handleModalClosed}>
            <View style={styles.modalContent}>
              <InputPrice
                type={'money'}
                value={value}
                onChangeText={(value, rawValue) => {
                  setValue(rawValue as string)
                  updatePrice(rawValue as string)
                }}
              />
            </View>
          </ModalPrice>
        </>
      )}
      {loading && (
        <ActivityIndicator
          size='large'
          color='#000000'
          style={styles.loading}
        />
      )}
    </KeyboardAvoidingView>
  )
}

export default NewList
