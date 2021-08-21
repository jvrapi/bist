import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { InputAmount } from '../../components/InputAmount'
import { InputPrice } from '../../components/InputPrice'
import { ListProducts } from '../../components/ListProducts'
import { Load } from '../../components/Load'
import { ModalPrice } from '../../components/ModalPrice'
import NewListHeader from '../../components/NewListHeader'
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
import { styles } from './styles'

const NewList: React.FC = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const [optionSelected, setOptionSelected] = useState(0)

  const [showModalPrice, setShowModalPrice] = useState(false)
  const [value, setValue] = useState('')
  const [searchText, setSearchText] = useState('')
  const [listId, setList] = useState('')
  const [data, setData] = useState<ListProduct[]>([])
  const [productsFound, setProductFound] = useState<Product[]>([])
  const [editingItem, setEditingItem] = useState<ListProduct>({} as ListProduct)
  const getListId = async () => {
    try {
      const { data } = await createList()
      setList(data.id)
    } catch (error) {
      Alert.alert('Erro ao criar a lista')
    } finally {
      setLoading(false)
    }
  }

  const getData = async () => {
    try {
      const { data } = await getDetails(listId)
      setData(data)
    } catch (error) {
      Alert.alert('Error')
    }
  }

  const findProducts = async (productName: string) => {
    setSearchText(productName)
    if (productName.length > 1) {
      try {
        if (optionSelected === 0) {
          const filteredData = data.filter(item =>
            item.product.name.toLowerCase().includes(productName.toLowerCase())
          )
          setData(filteredData)
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
    setSearchText('')
    setProductFound([])
    const listProduct: AddItem = {
      listId,
      productId: product.id
    }
    try {
      await addItemToList(listProduct)
      await getData()
    } catch (error) {
      Alert.alert('Erro ao adicionar item a lista')
    }
  }

  const updateListProduct = async (listProduct: ListProduct) => {
    setSearchText('')
    try {
      await updateList(listProduct)
      await getData()
    } catch (error) {
      Alert.alert('Erro ao tentar atualizar')
    }
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

  const finishBuy = async () => {
    navigation.navigate('List')
  }

  useEffect(() => {
    getListId()
  }, [])

  return (
    <View style={styles.container}>
      {!loading && (
        <>
          <NewListHeader
            optionSelected={optionSelected}
            setOptionSelected={option => setOptionSelected(option)}
            finishBuy={finishBuy}
            productsFoundLength={productsFound.length}
            searchText={searchText}
            findProducts={findProducts}
          />
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
                  setEditingItem({
                    ...editingItem,
                    price: parseFloat(rawValue as string)
                  })
                }}
              />
              <InputAmount
                amount={editingItem.amount}
                decrement={() =>
                  setEditingItem({
                    ...editingItem,
                    amount: (editingItem.amount -= 1)
                  })
                }
                increment={() =>
                  setEditingItem({
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
      {loading && <Load />}
    </View>
  )
}

export { NewList }
