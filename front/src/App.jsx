import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUserProfile } from './store/slices/authSlice'
import AppRouter from './router/AppRouter.jsx'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(fetchUserProfile())
    }
  }, [dispatch])

  return <AppRouter />
}

export default App
