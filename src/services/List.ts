import { AxiosResponse } from 'axios'
import { api } from './Api'

const baseURL = '/list'

type CreateListProps = {
  id: string
  createdAt: string
  updatedAt: string
}

const createList = async (): Promise<AxiosResponse<CreateListProps>> => {
  const response = await api.post(`${baseURL}`)
  return response
}
export { createList }
