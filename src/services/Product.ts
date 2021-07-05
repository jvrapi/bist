import { api } from './Api'

type Product = {
  id: string
  name: string
}

const baseURL = '/product'

const getByName = async (name: string) => {
  const response = await api.get(`${baseURL}/${name}`)
  return response
}

export { Product, getByName }
