import { useSelector } from 'react-redux'
import styles from './Profile.module.scss'

const ACCOUNTS = [
  {
    title: 'Argent Bank Checking (x8349)',
    amount: '$2,082.79',
    description: 'Available Balance',
  },
  {
    title: 'Argent Bank Savings (x6712)',
    amount: '$10,928.42',
    description: 'Available Balance',
  },
  {
    title: 'Argent Bank Credit Card (x8349)',
    amount: '$184.30',
    description: 'Current Balance',
  },
]

function Profile() {
  const user = useSelector((state) => state.auth.user)

  return (
    <div className={styles.bgDark}>
      <div className={styles.header}>
        <h1>
          Welcome back
          <br />
          {user?.firstName} {user?.lastName}!
        </h1>
        <button className={styles.editButton}>Edit Name</button>
      </div>

      <h2 className={styles.srOnly}>Accounts</h2>

      {ACCOUNTS.map((account) => (
        <section key={account.title} className={styles.account}>
          <div className={styles.accountContentWrapper}>
            <h3 className={styles.accountTitle}>{account.title}</h3>
            <p className={styles.accountAmount}>{account.amount}</p>
            <p className={styles.accountAmountDescription}>{account.description}</p>
          </div>
          <div className={`${styles.accountContentWrapper} ${styles.cta}`}>
            <button className={styles.transactionButton}>View transactions</button>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Profile
