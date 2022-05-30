import styles from "../styles/NotConnected.module.css"
export default function NotConnected({ connectWalletHandler }) {
  return (
    <div className={styles.notConnected}>
      <h1 className={styles.title}>
        Welcome to <span>Tasky</span>
      </h1>
      <p className={styles.description}>Please connect your wallet 😉</p>
      <button className={styles.btnConnect}onClick={connectWalletHandler} >Connect Wallet</button>
    </div>
  )
}
