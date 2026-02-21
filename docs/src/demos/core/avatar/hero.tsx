import * as Avatar from "@danielfrg/ui-core/avatar"
import styles from "./index.module.css"

export function DemoAvatarHero() {
  return (
    <div class={styles.container}>
      <Avatar.Root class={styles.root}>
        <Avatar.Image class={styles.image} src="https://i.pravatar.cc/128?img=10" alt="Nicole Steeves" />
        <Avatar.Fallback class={styles.fallback}>NS</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root class={styles.root}>
        <Avatar.Image class={styles.image} src="https://i.pravatar.cc/128?img=32" alt="Jane Doe" />
        <Avatar.Fallback class={styles.fallback}>JD</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root class={styles.root}>
        <Avatar.Fallback class={styles.fallback}>AB</Avatar.Fallback>
      </Avatar.Root>
    </div>
  )
}
