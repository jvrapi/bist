import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import NewProduct from '../../assets/icons/add-to-basket.svg'
import Loupe from '../../assets/icons/loupe.svg'
import { ListProducts } from '../../components/ListProducts'
import { ModalPrice } from '../../components/ModalPrice'
import { InputPrice } from '../../components/InputPrice'
import { InputAmount } from '../../components/InputAmount'
import { createList } from '../../services/List'
import {
  AddItem,
  addItemToList,
  getDetails,
  ListProduct,
  updateList
} from '../../services/ListProducts'
import { getByName, Product } from '../../services/Product'
import { calculateTotalPerItem } from '../../utils/calculateTotalPerItem'
import { inputStyles, styles } from './styles'

const NewList: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [showInputContainer, setShowInputContainer] = useState(true)
  const [showInput, setShowInput] = useState(false)
  const [showModalPrice, setShowModalPrice] = useState(false)
  const [optionSelected, setOptionSelected] = useState(0)
  const [value, setValue] = useState('')
  const [searchText, setSearchText] = useState('')
  const [listId, setList] = useState('30afea7e-c4dc-4e9c-b507-be8def596d10')
  const [data, setData] = useState<ListProduct[]>([])
  const [productsFound, setProductFound] = useState<Product[]>([])
  const [editingItem, setEditingItem] = useState<ListProduct>({} as ListProduct)

  const findProductStyle = inputStyles(productsFound.length > 0)

  const getListId = async () => {
    try {
      const { data } = await createList()
      setList(data.id)
    } catch (error) {
      Alert.alert('Erro ao criar a lista')
    }
  }

  const getData = async () => {
    try {
      const { data } = await getDetails(listId)
      setData(data)
    } catch (error) {
      Alert.alert('Error')
    } finally {
      setLoading(false)
    }
  }

  const findProducts = async (productName: string) => {
    setSearchText(productName)
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

  const addItem = async (product: Product) => {
    const listProduct: AddItem = {
      listId,
      productId: product.id
    }
    try {
      await addItemToList(listProduct)
      await getData()
    } catch (error) {
      Alert.alert('Erro ao adicionar item a lista')
    } finally {
      setSearchText('')
      setProductFound([])
    }
  }

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
    setEditingItem(listProduct)
    if (listProduct.price) {
      setValue(parseFloat(listProduct.price.toString()).toFixed(2))
    }
    setShowModalPrice(true)
  }

  const handleModalClosed = async () => {
    setShowModalPrice(false)
    setValue('')
    await updateListProduct(editingItem)
  }

  const finishBuy = async () => { }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View style={styles.container}>
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
                  value={searchText}
                />
              </View>
            </View>
          )}

          <ListProducts data={data} onPress={handleModalOpened} />

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
                    onPress={() => addItem(product)}
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
              <InputAmount
                amount={editingItem.amount}
                decrement={() =>
                  updateListProduct({
                    ...editingItem,
                    amount: (editingItem.amount -= 1)
                  })
                }
                increment={() =>
                  updateListProduct({
                    ...editingItem,
                    amount: (editingItem.amount += 1)
                  })
                }
              />
              <TouchableOpacity
                style={styles.finishModalButton}
                onPress={handleModalClosed}
                activeOpacity={0.5}
              >
                <Text style={styles.finishModalButtonText}>Finalizar</Text>
              </TouchableOpacity>
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
    </View>
  )
}

export default NewList
