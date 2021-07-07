import axios from 'axios'

const api = axios.create({
  baseURL: 'https://bist-api.herokuapp.com'
})

export { api }
