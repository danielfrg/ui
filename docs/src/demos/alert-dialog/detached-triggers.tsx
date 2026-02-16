import * as AlertDialog from "@danielfrg/ui/alert-dialog"
import styles from "./index.module.css"

export function DemoAlertDialogDetachedTriggers() {
  const dialogHandle = AlertDialog.createHandle()

  return (
    <div class={styles.triggerRow}>
      <AlertDialog.Trigger class={`${styles.button} ${styles.red}`} handle={dialogHandle}>
        Discard draft
      </AlertDialog.Trigger>

      <AlertDialog.Root handle={dialogHandle}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay class={styles.overlay} />
          <div class={styles.positioner}>
            <AlertDialog.Content class={styles.content}>
              <AlertDialog.Title class={styles.title}>Discard draft?</AlertDialog.Title>
              <AlertDialog.Description class={styles.description}>
                This action cannot be undone.
              </AlertDialog.Description>
              <div class={styles.actions}>
                <AlertDialog.CloseButton class={styles.button}>Cancel</AlertDialog.CloseButton>
                <AlertDialog.CloseButton class={`${styles.button} ${styles.red}`}>Discard</AlertDialog.CloseButton>
              </div>
            </AlertDialog.Content>
          </div>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  )
}
