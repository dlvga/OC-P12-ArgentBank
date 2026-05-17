import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import styles from './Layout.module.scss'
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <Navbar />
      <main className={`${styles.main} ${['/login', '/profile'].includes(pathname) ? styles.mainDark : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
