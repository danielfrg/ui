import * as Fieldset from "@danielfrg/ui-core/fieldset"
import * as Field from "@danielfrg/ui-core/field"
import styles from "./index.module.css"

export function DemoFieldsetHero() {
  return (
    <Fieldset.Root class={styles.root}>
      <Fieldset.Legend class={styles.legend}>Shipping Address</Fieldset.Legend>

      <Field.Root class={styles.field}>
        <Field.Label class={styles.label}>Street</Field.Label>
        <input class={styles.input} type="text" placeholder="123 Main St" />
      </Field.Root>

      <Field.Root class={styles.field}>
        <Field.Label class={styles.label}>City</Field.Label>
        <input class={styles.input} type="text" placeholder="Springfield" />
      </Field.Root>

      <div class={styles.row}>
        <Field.Root class={styles.field}>
          <Field.Label class={styles.label}>State</Field.Label>
          <input class={styles.input} type="text" placeholder="IL" />
        </Field.Root>

        <Field.Root class={styles.field}>
          <Field.Label class={styles.label}>Zip Code</Field.Label>
          <input class={styles.input} type="text" placeholder="62701" />
        </Field.Root>
      </div>
    </Fieldset.Root>
  )
}
