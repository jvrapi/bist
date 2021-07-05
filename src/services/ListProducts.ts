import { api } from './Api'

type ListProduct = {
  id: string
  productId: string
  listId: string
  amount: number
  price: string
  product: {
    id: string
    name: string
  }
}

const baseURL = '/list-products'

const getDetails = async (listId: string) => {
  const response = await api.get(`${baseURL}/${listId}`)
  return response
}

const updateList = async (listProduct: ListProduct) => {
  const response = await api.put(`${baseURL}/`, listProduct)
  return response
}

export { ListProduct, getDetails, updateList }
