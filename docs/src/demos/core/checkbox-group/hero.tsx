import { createSignal } from "solid-js"
import * as Checkbox from "@danielfrg/ui-core/checkbox"
import * as CheckboxGroup from "@danielfrg/ui-core/checkbox-group"
import styles from "./index.module.css"

export function DemoCheckboxGroupHero() {
  const [value, setValue] = createSignal(["react"])

  return (
    <div>
      <CheckboxGroup.Root class={styles.root} value={value()} onValueChange={setValue}>
        <span class={styles.label}>Frameworks</span>
        <div class={styles.items}>
          <Checkbox.Root
            class={styles.checkbox}
            value="react"
            checked={value().includes("react")}
            onChange={(checked) => {
              if (checked) setValue([...value(), "react"])
              else setValue(value().filter((v) => v !== "react"))
            }}
          >
            <Checkbox.Input class={styles.input} />
            <Checkbox.Control class={styles.control}>
              <Checkbox.Indicator class={styles.indicator}>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Control>
            <Checkbox.Label class={styles["checkbox-label"]}>React</Checkbox.Label>
          </Checkbox.Root>

          <Checkbox.Root
            class={styles.checkbox}
            value="solid"
            checked={value().includes("solid")}
            onChange={(checked) => {
              if (checked) setValue([...value(), "solid"])
              else setValue(value().filter((v) => v !== "solid"))
            }}
          >
            <Checkbox.Input class={styles.input} />
            <Checkbox.Control class={styles.control}>
              <Checkbox.Indicator class={styles.indicator}>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Control>
            <Checkbox.Label class={styles["checkbox-label"]}>SolidJS</Checkbox.Label>
          </Checkbox.Root>

          <Checkbox.Root
            class={styles.checkbox}
            value="vue"
            checked={value().includes("vue")}
            onChange={(checked) => {
              if (checked) setValue([...value(), "vue"])
              else setValue(value().filter((v) => v !== "vue"))
            }}
          >
            <Checkbox.Input class={styles.input} />
            <Checkbox.Control class={styles.control}>
              <Checkbox.Indicator class={styles.indicator}>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Control>
            <Checkbox.Label class={styles["checkbox-label"]}>Vue</Checkbox.Label>
          </Checkbox.Root>
        </div>
      </CheckboxGroup.Root>
      <p class={styles.value}>Selected: {value().join(", ") || "none"}</p>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
