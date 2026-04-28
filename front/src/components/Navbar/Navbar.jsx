import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'

const isAuthenticated = false
const userName = 'Tony'

function Navbar() {
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
              {' '}{userName}
            </Link>
            <Link to="/" className={styles.mainNavItem}>
              <i className="fa fa-sign-out" />
              {' '}Sign Out
            </Link>
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
