// import styles
import styles from "./header.module.css"

import { Heading } from "../heading/heading"

function Header() {
  return (
    <div className={styles.header}>
      <Heading elem="h4" text="Notes App" />
    </div>
  )
}

export default Header
