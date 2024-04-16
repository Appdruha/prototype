import axios from 'axios'
import { RequestData } from '../models/Request-data.ts'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': 'true',
  'X-Requested-With': 'XMLHttpRequest',
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers,
  withCredentials: true,
})

export const getRequests = async () => {
  return instance.get<RequestData[]>('/')
}

export const createRequest = async (requestData: RequestData) => {
  return instance.post<RequestData[]>('/create', {...requestData})
}

export const updateRequest = async (requestData: RequestData) => {
  const data = instance.post<RequestData[]>('/update', {...requestData})
  return data
}