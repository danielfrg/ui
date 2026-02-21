import * as AlertDialog from "@danielfrg/ui-core/alert-dialog"
import styles from "./index.module.css"

export function DemoAlertDialogHero() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger class={`${styles.button} ${styles.red}`}>Discard draft</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay class={styles.overlay} />
        <div class={styles.positioner}>
          <AlertDialog.Content class={styles.content}>
            <AlertDialog.Title class={styles.title}>Discard draft?</AlertDialog.Title>
            <AlertDialog.Description class={styles.description}>You can't undo this action.</AlertDialog.Description>
            <div class={styles.actions}>
              <AlertDialog.CloseButton class={styles.button}>Cancel</AlertDialog.CloseButton>
              <AlertDialog.CloseButton class={`${styles.button} ${styles.red}`}>Discard</AlertDialog.CloseButton>
            </div>
          </AlertDialog.Content>
        </div>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
