import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfileAsync } from '../../store/slices/authSlice'
import styles from './Profile.module.scss'

const ACCOUNTS = [
  {
    id: 'checking',
    title: 'Argent Bank Checking (x8349)',
    amount: '$2,082.79',
    description: 'Available Balance',
  },
  {
    id: 'savings',
    title: 'Argent Bank Savings (x6712)',
    amount: '$10,928.42',
    description: 'Available Balance',
  },
  {
    id: 'credit',
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
  const [saveError, setSaveError] = useState(null)

  if (!user && loading) {
    return (
      <div className={styles.bgDark}>
        <div className={styles.spinnerWrapper}>
          <span className={styles.spinner} aria-label="Loading profile" />
        </div>
      </div>
    )
  }

  function handleEditClick() {
    setSaveError(null)
    setLocalFirstName(user?.firstName ?? '')
    setLocalLastName(user?.lastName ?? '')
    setIsEditing(true)
  }

  async function handleSave() {
    setSaveError(null)
    const result = await dispatch(
      updateProfileAsync({ firstName: localFirstName, lastName: localLastName })
    )
    if (updateProfileAsync.fulfilled.match(result)) {
      setIsEditing(false)
    } else {
      setSaveError(result.payload ?? 'Server error, please try again later.')
    }
  }

  function handleCancel() {
    setSaveError(null)
    setLocalFirstName(user?.firstName ?? '')
    setLocalLastName(user?.lastName ?? '')
    setIsEditing(false)
  }

  return (
    <div className={styles.bgDark}>
      <div className={styles.header}>
        <h1>
          Welcome back
          {!isEditing && (
            <>
              <br />
              {user?.firstName} {user?.lastName}!
            </>
          )}
        </h1>

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
            {saveError && <p className={styles.saveError}>{saveError}</p>}
            <div className={styles.editActions}>
              <button
                className={styles.editActionButton}
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
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
        <section key={account.id} className={styles.account}>
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
