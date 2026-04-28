import styles from './Home.module.scss'

const features = [
  {
    icon: '/img/icon-chat.png',
    alt: 'Chat Icon',
    title: 'You are our #1 priority',
    text: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
  },
  {
    icon: '/img/icon-money.png',
    alt: 'Money Icon',
    title: 'More savings means higher rates',
    text: 'The more you save with us, the higher your interest rate will be!',
  },
  {
    icon: '/img/icon-security.png',
    alt: 'Security Icon',
    title: 'Security you can trust',
    text: 'We use top of the line encryption to make sure your data and money is always safe.',
  },
]

function Home() {
  return (
    <>
      <div className={styles.hero}>
        <section className={styles.heroContent}>
          <h2 className={styles.srOnly}>Promoted Content</h2>
          <p className={styles.subtitle}>No fees.</p>
          <p className={styles.subtitle}>No minimum deposit.</p>
          <p className={styles.subtitle}>High interest rates.</p>
          <p className={styles.text}>Open a savings account with Argent Bank today!</p>
        </section>
      </div>

      <section className={styles.features}>
        <h2 className={styles.srOnly}>Features</h2>
        {features.map((feature) => (
          <div key={feature.title} className={styles.featureItem}>
            <img
              src={feature.icon}
              alt={feature.alt}
              className={styles.featureIcon}
            />
            <h3 className={styles.featureItemTitle}>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </section>
    </>
  )
}

export default Home
