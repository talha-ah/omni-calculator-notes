import React from "react"
import styles from "./heading.module.css"

export function Heading(props) {
  return React.createElement(
    props.elem,
    { className: styles.heading, style: props.style || {} },
    props.text
  )
}
