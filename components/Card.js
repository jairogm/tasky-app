import { deleteTask, toggleDone } from "../functions/TaskFunctions"
import styles from "../styles/Task.module.css"
export default function Card({ id, title, description, done, createdat, deletetask }) {


    const handleToggle = (id) => {
        toggleDone(id)
    }

    return (
        <div className={done ? styles.done : styles.card}>
            <div className={styles.cardHead}>
                <p>{title}</p>
                <span><input type="checkbox" checked={done} onChange={() => handleToggle(id.toNumber())} /></span>
            </div>
            <div className={styles.cardBody}>
                <p>
                    {description}
                </p>
            </div>

            <div className={styles.cardFooter}>
                <p> Task created on: {new Date(createdat * 1000).toLocaleString()}</p>
                <button className={styles.btnDelete} onClick={() => deletetask(id.toNumber())}>Delete</button>
            </div>
        </div>
    )
}
