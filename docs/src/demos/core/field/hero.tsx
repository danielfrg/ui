import { createSignal } from "solid-js"
import * as Field from "@danielfrg/ui-core/field"
import styles from "./index.module.css"

export function DemoFieldHero() {
  const [value, setValue] = createSignal("")
  const [touched, setTouched] = createSignal(false)

  const isInvalid = () => touched() && value().length === 0

  return (
    <Field.Root class={styles.root} validationState={isInvalid() ? "invalid" : undefined} required>
      <Field.Label class={styles.label}>Email</Field.Label>
      <Field.Description class={styles.description}>We'll never share your email.</Field.Description>
      <input
        class={styles.input}
        type="email"
        placeholder="you@example.com"
        value={value()}
        onInput={(e) => setValue(e.currentTarget.value)}
        onBlur={() => setTouched(true)}
      />
      <Field.Error class={styles.error}>Email is required.</Field.Error>
    </Field.Root>
  )
}
