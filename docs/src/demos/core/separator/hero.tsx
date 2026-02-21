import { Separator } from "@danielfrg/ui-core/separator"
import styles from "./index.module.css"

export function DemoSeparatorHero() {
  return (
    <div class={styles.container}>
      <a class={styles.link} href="#">
        Home
      </a>
      <a class={styles.link} href="#">
        Pricing
      </a>
      <a class={styles.link} href="#">
        Blog
      </a>
      <a class={styles.link} href="#">
        Support
      </a>

      <Separator orientation="vertical" class={styles.separator} />

      <a class={styles.link} href="#">
        Log in
      </a>
      <a class={styles.link} href="#">
        Sign up
      </a>
    </div>
  )
}
