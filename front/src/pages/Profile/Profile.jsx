import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfileAsync } from '../../store/slices/authSlice'
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
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.auth.loading)

  const [isEditing, setIsEditing] = useState(false)
  const [localFirstName, setLocalFirstName] = useState('')
  const [localLastName, setLocalLastName] = useState('')

  function handleEditClick() {
    setLocalFirstName(user?.firstName ?? '')
    setLocalLastName(user?.lastName ?? '')
    setIsEditing(true)
  }

  async function handleSave() {
    const result = await dispatch(
      updateProfileAsync({ firstName: localFirstName, lastName: localLastName })
    )
    if (updateProfileAsync.fulfilled.match(result)) {
      setIsEditing(false)
    }
  }

  function handleCancel() {
    setLocalFirstName(user?.firstName ?? '')
    setLocalLastName(user?.lastName ?? '')
    setIsEditing(false)
  }

  return (
    <div className={styles.bgDark}>
      <div className={styles.header}>
        <h1>Welcome back{!isEditing && <><br />{user?.firstName} {user?.lastName}!</>}</h1>

        {isEditing ? (
          <div className={styles.editForm}>
            <div className={styles.editInputs}>
              <input
                className={styles.editInput}
                type="text"
                value={localFirstName}
                onChange={(e) => setLocalFirstName(e.target.value)}
                aria-label="First name"
              />
              <input
                className={styles.editInput}
                type="text"
                value={localLastName}
                onChange={(e) => setLocalLastName(e.target.value)}
                aria-label="Last name"
              />
            </div>
            <div className={styles.editActions}>
              <button
                className={styles.editActionButton}
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? 'Saving…' : 'Save'}
              </button>
              <button
                className={styles.editActionButton}
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button className={styles.editButton} onClick={handleEditClick}>
            Edit Name
          </button>
        )}
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
