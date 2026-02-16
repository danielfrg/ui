import * as Drawer from "@danielfrg/ui/drawer"
import styles from "./index.module.css"

export function DemoDrawerPosition() {
  return (
    <Drawer.Root side="bottom">
      <Drawer.Trigger class={styles.button}>Open bottom drawer</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop class={styles.backdrop} />
        <Drawer.Popup class={`${styles.popup} ${styles["popup-bottom"]}`}>
          <div class={styles.handle} />
          <Drawer.Title class={styles.title}>Notifications</Drawer.Title>
          <Drawer.Description class={styles.description}>You are all caught up. Good job!</Drawer.Description>
          <div class={styles.actions}>
            <Drawer.Close class={styles.button}>Close</Drawer.Close>
          </div>
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
