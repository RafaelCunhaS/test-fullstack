import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://18.216.84.173:3001'
})
