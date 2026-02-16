import * as Switch from "@danielfrg/ui/switch"
import styles from "./index.module.css"

export function DemoSwitchHero() {
  return (
    <Switch.Root class={styles.switch} defaultChecked>
      <Switch.Label class={styles.label}>Notifications</Switch.Label>
      <Switch.Input class={styles.input} />
      <Switch.Control class={styles.control}>
        <Switch.Thumb class={styles.thumb} />
      </Switch.Control>
    </Switch.Root>
  )
}
