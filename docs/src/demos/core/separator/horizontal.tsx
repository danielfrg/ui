import { Separator } from "@danielfrg/ui-core/separator"
import styles from "./index.module.css"

export function DemoSeparatorHorizontal() {
  return (
    <div class={styles.horizontalContainer}>
      <span>Content above</span>
      <Separator class={styles.separator} />
      <span>Content below</span>
    </div>
  )
}
