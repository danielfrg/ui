import * as Drawer from "@danielfrg/ui/drawer"
import styles from "./index.module.css"

export function DemoDrawerHero() {
  return (
    <Drawer.Root side="right">
      <Drawer.Trigger class={styles.button}>Open drawer</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop class={styles.backdrop} />
        <Drawer.Popup class={`${styles.popup} ${styles["popup-right"]}`}>
          <Drawer.Title class={styles.title}>Drawer</Drawer.Title>
          <Drawer.Description class={styles.description}>
            This is a drawer that slides in from the side. You can swipe to dismiss it on touch devices.
          </Drawer.Description>
          <div class={styles.actions}>
            <Drawer.Close class={styles.button}>Close</Drawer.Close>
          </div>
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
