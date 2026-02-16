import * as Dialog from "@danielfrg/ui/dialog"
import styles from "./index.module.css"

export function DemoDialogHero() {
  return (
    <Dialog.Root>
      <Dialog.Trigger class={styles.button}>View notifications</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class={styles.overlay} />
        <div class={styles.positioner}>
          <Dialog.Content class={styles.content}>
            <Dialog.Title class={styles.title}>Notifications</Dialog.Title>
            <Dialog.Description class={styles.description}>You are all caught up. Good job!</Dialog.Description>
            <div class={styles.actions}>
              <Dialog.CloseButton class={styles.button}>Close</Dialog.CloseButton>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
