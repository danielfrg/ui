import * as AlertDialog from "@danielfrg/ui-core/alert-dialog"
import styles from "./index.module.css"

export function DemoAlertDialogMultipleTriggers() {
  const dialogHandle = AlertDialog.createHandle()

  return (
    <>
      <div class={styles.triggerRow}>
        <AlertDialog.Trigger handle={dialogHandle} class={styles.button}>
          Delete album
        </AlertDialog.Trigger>
        <AlertDialog.Trigger handle={dialogHandle} class={styles.button}>
          Delete playlist
        </AlertDialog.Trigger>
      </div>
      <AlertDialog.Root handle={dialogHandle}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay class={styles.overlay} />
          <div class={styles.positioner}>
            <AlertDialog.Content class={styles.content}>
              <AlertDialog.Title class={styles.title}>Delete item?</AlertDialog.Title>
              <AlertDialog.Description class={styles.description}>
                This action cannot be undone.
              </AlertDialog.Description>
              <div class={styles.actions}>
                <AlertDialog.CloseButton class={styles.button}>Cancel</AlertDialog.CloseButton>
                <AlertDialog.CloseButton class={`${styles.button} ${styles.red}`}>Delete</AlertDialog.CloseButton>
              </div>
            </AlertDialog.Content>
          </div>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  )
}
