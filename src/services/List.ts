import { AxiosResponse } from 'axios'
import { api } from './Api'

const baseURL = '/list'

type CreateListProps = {
  id: string
  createdAt: string
  updatedAt: string
}

type ListsProps = {
  id: string
  createdAt: string
  total: number
}

const createList = async (): Promise<AxiosResponse<CreateListProps>> => {
  const response = await api.post(`${baseURL}`)
  return response
}

const getLists = async () => {
  const response = await api.get(`${baseURL}`)
  return response
}

const deleteList = async (listId: string) => {
  const response = await api.delete(`${baseURL}/${listId}`)
  return response
}
export { createList, ListsProps, getLists, deleteList }
