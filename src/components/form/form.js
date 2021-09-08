import styles from "./form.module.css"

export function Form(props) {
  return (
    <form className={styles.form} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  )
}

export function FormItem(props) {
  return (
    <div className={styles.item}>
      <label htmlFor={props.name} className={styles.label}>
        {props.label}
      </label>
      <textarea
        rows={6}
        id={props.name}
        name={props.name}
        className={styles.input}
        required={props.required}
        placeholder={props.placeholder}
      />
    </div>
  )
}
