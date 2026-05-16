import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginAsync } from '../../store/slices/authSlice'
import styles from './Login.module.scss'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile')
    }
  }, [isAuthenticated, navigate])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    dispatch(loginAsync({ email: formData.email, password: formData.password, rememberMe: formData.rememberMe }))
  }

  return (
    <div className={styles.bgDark}>
      <section className={styles.signInContent}>
        <i className={`fa fa-user-circle ${styles.signInIcon}`} />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">Username</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputRemember}>
            <input
              type="checkbox"
              id="remember-me"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className={styles.signInButton} disabled={loading}>
            {loading ? 'Connexion…' : 'Sign In'}
          </button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </section>
    </div>
  )
}

export default Login
