import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

let storeRef = null

export const injectStore = (store) => {
  storeRef = store
}

api.interceptors.request.use((config) => {
  const token = storeRef?.getState().auth.token ?? localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const loginUser = (credentials) => api.post('/user/login', credentials)

export const getUserProfile = () => api.post('/user/profile')

export const updateUserProfile = (data) => api.put('/user/profile', data)

export default api
