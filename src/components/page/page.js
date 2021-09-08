import styles from "./page.module.css"

export function Page(props) {
  return <div className={styles.page}>{props.children}</div>
}

export function PageContent(props) {
  return <div className={styles.pageContent}>{props.children}</div>
}
