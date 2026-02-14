import { Button } from "@danielfrg/ui/button"
import styles from "./index.module.css"

export function DemoButtonAsTag() {
  return (
    <Button as="div" class={styles.button}>
      Button that can contain complex children
    </Button>
  )
}
