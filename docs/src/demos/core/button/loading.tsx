import { createSignal } from "solid-js"
import { Button } from "@danielfrg/ui-core/button"
import styles from "./index.module.css"

export function DemoButtonLoading() {
  const [loading, setLoading] = createSignal(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1200)
  }

  return (
    <Button class={styles.button} disabled={loading()} onClick={handleClick}>
      {loading() ? "Loading..." : "Start action"}
    </Button>
  )
}
