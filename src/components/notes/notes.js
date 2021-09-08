import styles from "./notes.module.css"
import Markdown from "../markdown/markdown"
import { DangerButton } from "../button/button"

export function Note(props) {
  const date = new Date(props.date)
  return (
    <div className={styles.note}>
      <div className={styles.noteContent}>
        <div className={styles.noteText}>
          <Markdown text={props.text} />
        </div>
        <p className={styles.noteDate} onClick={props.onDateClick}>
          {`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`}
        </p>
      </div>
      <div className={styles.noteButtonContainer}>
        <DangerButton text="Delete note" onClick={props.onDeleteClick} />
      </div>
    </div>
  )
}

export function NoteSingle(props) {
  const date = new Date(props.date)
  return (
    <div className={styles.noteSingle}>
      <div className={styles.noteSingleText}>
        <Markdown text={props.text} />
      </div>
      <p
        className={styles.noteSingleDate}
      >{`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`}</p>
    </div>
  )
}
