import { AxiosResponse } from 'axios'
import { api } from './Api'

type ListProduct = {
  id: string
  productId: string
  listId: string
  amount: number
  price: number
  product: {
    id: string
    name: string
  }
}

type AddItem = {
  productId: string
  listId: string
}

const baseURL = '/list-products'

const getDetails = async (
  listId: string
): Promise<AxiosResponse<ListProduct[]>> => {
  const response = await api.get(`${baseURL}/${listId}`)
  return response
}

const updateList = async (listProduct: ListProduct) => {
  const response = await api.put(`${baseURL}/`, listProduct)
  return response
}

const addItemToList = async (listProduct: AddItem) => {
  const response = await api.post(`${baseURL}/`, listProduct)
  return response
}

export { ListProduct, AddItem, getDetails, updateList, addItemToList }
