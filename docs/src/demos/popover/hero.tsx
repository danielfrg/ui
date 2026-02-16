import * as Popover from "@danielfrg/ui/popover"
import styles from "./index.module.css"

export function DemoPopoverHero() {
  return (
    <Popover.Root>
      <Popover.Trigger class={styles.button}>View notifications</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content class={styles.content}>
          <Popover.Arrow />
          <Popover.Title class={styles.title}>Notifications</Popover.Title>
          <Popover.Description class={styles.description}>You are all caught up. Good job!</Popover.Description>
          <div class={styles.actions}>
            <Popover.CloseButton class={styles.button}>Close</Popover.CloseButton>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
