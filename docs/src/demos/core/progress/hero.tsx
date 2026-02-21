import { createSignal, onCleanup, onMount } from "solid-js"
import * as Progress from "@danielfrg/ui-core/progress"
import styles from "./index.module.css"

export function DemoProgressHero() {
  const [value, setValue] = createSignal(20)

  onMount(() => {
    const interval = setInterval(() => {
      setValue((current) => Math.min(100, Math.round(current + Math.random() * 25)))
    }, 1000)
    onCleanup(() => clearInterval(interval))
  })

  return (
    <Progress.Root class={styles.progress} value={value()}>
      <Progress.Label class={styles.label}>Export data</Progress.Label>
      <Progress.ValueLabel class={styles.value} />
      <Progress.Track class={styles.track}>
        <Progress.Fill class={styles.fill} />
      </Progress.Track>
    </Progress.Root>
  )
}
