import * as RadioGroup from "@danielfrg/ui-core/radio-group"
import styles from "./index.module.css"

export function DemoRadioGroupHero() {
  return (
    <RadioGroup.Root defaultValue="fuji-apple" class={styles.radiogroup} aria-label="Best apple">
      <div class={styles.caption}>Best apple</div>

      <label class={styles.item}>
        <RadioGroup.Item value="fuji-apple">
          <RadioGroup.ItemInput />
          <RadioGroup.ItemControl class={styles.radio}>
            <RadioGroup.ItemIndicator class={styles.indicator} />
          </RadioGroup.ItemControl>
        </RadioGroup.Item>
        Fuji
      </label>

      <label class={styles.item}>
        <RadioGroup.Item value="gala-apple">
          <RadioGroup.ItemInput />
          <RadioGroup.ItemControl class={styles.radio}>
            <RadioGroup.ItemIndicator class={styles.indicator} />
          </RadioGroup.ItemControl>
        </RadioGroup.Item>
        Gala
      </label>

      <label class={styles.item}>
        <RadioGroup.Item value="granny-smith-apple">
          <RadioGroup.ItemInput />
          <RadioGroup.ItemControl class={styles.radio}>
            <RadioGroup.ItemIndicator class={styles.indicator} />
          </RadioGroup.ItemControl>
        </RadioGroup.Item>
        Granny Smith
      </label>
    </RadioGroup.Root>
  )
}
