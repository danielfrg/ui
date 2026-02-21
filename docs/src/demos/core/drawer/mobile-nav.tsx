import * as Drawer from "@danielfrg/ui-core/drawer"
import * as ScrollArea from "@danielfrg/ui-core/scroll-area"
import styles from "./index.module.css"

const NAV_ITEMS = [
  { href: "#", label: "Overview" },
  { href: "#", label: "Components" },
  { href: "#", label: "Utilities" },
  { href: "#", label: "Releases" },
] as const

const LONG_LIST = Array.from({ length: 50 }, (_, i) => ({
  href: "#",
  label: `Item ${i + 1}`,
}))

export function DemoDrawerMobileNav() {
  return (
    <Drawer.Root side="bottom">
      <Drawer.Trigger class={styles.button}>Open mobile menu</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop class={styles.backdrop} />
        <Drawer.Popup class={`${styles.popup} ${styles["popup-mobile-nav"]}`}>
          <nav aria-label="Navigation" class={styles.panel}>
            <div class={styles.header}>
              <div aria-hidden class={styles["header-spacer"]} />
              <div class={styles.handle} />
              <Drawer.Close aria-label="Close menu" class={styles["close-button"]}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M0.75 0.75L6 6M11.25 11.25L6 6M6 6L0.75 11.25M6 6L11.25 0.75"
                    stroke="currentcolor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Drawer.Close>
            </div>

            <Drawer.Title class={styles["nav-title"]}>Menu</Drawer.Title>
            <Drawer.Description class={styles["nav-description"]}>
              Scroll the long list. Flick down from the top to dismiss.
            </Drawer.Description>

            <ScrollArea.Root class={styles["scroll-area-root"]}>
              <ScrollArea.Viewport class={styles["scroll-area-viewport"]}>
                <ul class={styles.list}>
                  {NAV_ITEMS.map((item) => (
                    <li class={styles.item}>
                      <a class={styles.link} href={item.href}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <ul class={styles["long-list"]} aria-label="Long list">
                  {LONG_LIST.map((item) => (
                    <li class={styles.item}>
                      <a class={styles.link} href={item.href}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar class={styles["scroll-area-scrollbar"]}>
                <ScrollArea.Thumb class={styles["scroll-area-thumb"]} />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </nav>
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
