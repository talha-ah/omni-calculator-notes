import styles from "./button.module.css"

import colors from "../../utils/colors"

export function Button(props) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.loading}
      className={styles.button}
      type={props.type || "button"}
      style={{
        color: colors.text,
      }}
    >
      {props.loading ? "Loading..." : props.text}
    </button>
  )
}

export function DangerButton(props) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.loading}
      className={styles.button}
      type={props.type || "button"}
      style={{
        color: colors.white,
        backgroundColor: colors.red,
      }}
    >
      {props.loading ? "Loading..." : props.text}
    </button>
  )
}

export function BorderedButton(props) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.loading}
      className={styles.button}
      type={props.type || "button"}
      style={{
        color: colors.text,
        backgroundColor: colors.white,
        border: `1px solid ${colors.border}`,
      }}
    >
      {props.loading ? "Loading..." : props.text}
    </button>
  )
}

export function ButtonContainer(props) {
  return <div className={styles.buttonContainer}>{props.children}</div>
}
