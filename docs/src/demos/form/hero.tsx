import { createSignal } from "solid-js"
import * as Form from "@danielfrg/ui/form"
import * as Field from "@danielfrg/ui/field"
import styles from "./index.module.css"

export function DemoFormHero() {
  const [name, setName] = createSignal("")
  const [email, setEmail] = createSignal("")
  const [submitted, setSubmitted] = createSignal(false)

  const handleSubmit = () => {
    setSubmitted(true)
  }

  return (
    <div>
      <Form.Root class={styles.root} onSubmit={handleSubmit}>
        <Field.Root class={styles.field} required>
          <Field.Label class={styles.label}>Name</Field.Label>
          <input
            class={styles.input}
            type="text"
            placeholder="John Doe"
            value={name()}
            onInput={(e) => setName(e.currentTarget.value)}
          />
        </Field.Root>

        <Field.Root class={styles.field} required>
          <Field.Label class={styles.label}>Email</Field.Label>
          <input
            class={styles.input}
            type="email"
            placeholder="john@example.com"
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </Field.Root>

        <button class={styles.button} type="submit">
          Submit
        </button>
      </Form.Root>

      {submitted() && (
        <p class={styles.result}>
          Submitted: {name()} ({email()})
        </p>
      )}
    </div>
  )
}
