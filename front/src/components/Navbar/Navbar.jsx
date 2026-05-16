import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import styles from './Navbar.module.scss'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)

  function handleSignOut() {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className={styles.mainNav}>
      <Link to="/" className={styles.mainNavLogo}>
        <img
          className={styles.mainNavLogoImage}
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className={styles.srOnly}>Argent Bank</h1>
      </Link>

      <div>
        {isAuthenticated ? (
          <>
            <Link to="/profile" className={styles.mainNavItem}>
              <i className="fa fa-user-circle" />
              {' '}{user?.firstName}
            </Link>
            <button className={styles.mainNavItem} onClick={handleSignOut}>
              <i className="fa fa-sign-out" />
              {' '}Sign Out
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.mainNavItem}>
            <i className="fa fa-user-circle" />
            {' '}Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
