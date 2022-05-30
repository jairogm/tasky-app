//Styles
import Image from "next/image"
import styles from "../styles/NoProvider.module.css"

//Images
import screeshot from "../static/images/screenshot.png"
export default function NoProvider() {
    return (
        <div className={styles.NoProvider}>

            <div className={styles.title}>
                <h1>Welcome to Tasky</h1>
                <p>It seems like you dont have Metamask installed, <a href="https://metamask.io/download/" className={styles.link} target="_blank" rel="noreferrer">Click Here</a> to download it in order to use Tasky App</p>
            </div>
            <div className={styles.imgContainer}>
                <Image
                    src={screeshot}
                    alt="tasky app screenshot"
                    width={700}
                    height={500}
                />
            </div>

            <a href="https://metamask.io/download/" target="_blank" rel="noreferrer">

                <button className={styles.btnDownload}>Download Metamask 🦊</button>
            </a>
        </div>
    )
}
