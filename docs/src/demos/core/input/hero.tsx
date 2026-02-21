import * as Input from "@danielfrg/ui-core/input"
import styles from "./index.module.css"

export function DemoInputHero() {
  return (
    <Input.Root class={styles.root}>
      <Input.Label class={styles.label}>Email</Input.Label>
      <Input.Field class={styles.input} type="email" placeholder="you@example.com" />
      <Input.Description class={styles.description}>We'll never share your email.</Input.Description>
    </Input.Root>
  )
}
