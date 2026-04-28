import { useState } from 'react'
import styles from './Login.module.scss'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Login submit:', formData)
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
          <button type="submit" className={styles.signInButton}>
            Sign In
          </button>
        </form>
      </section>
    </div>
  )
}

export default Login
