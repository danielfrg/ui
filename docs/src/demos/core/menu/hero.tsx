import { Menu } from "@danielfrg/ui-core/menu"
import styles from "./index.module.css"

export function DemoMenuHero() {
  return (
    <Menu.Root gutter={8}>
      <Menu.Trigger class={styles.trigger}>
        Song <ChevronDownIcon />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Popup class={styles.popup}>
          <Menu.Arrow class={styles.arrow} />
          <Menu.Item class={styles.item}>Add to Library</Menu.Item>
          <Menu.Item class={styles.item}>Add to Playlist</Menu.Item>
          <Menu.Separator class={styles.separator} />
          <Menu.Item class={styles.item}>Play Next</Menu.Item>
          <Menu.Item class={styles.item}>Play Last</Menu.Item>
          <Menu.Separator class={styles.separator} />
          <Menu.Item class={styles.item}>Favorite</Menu.Item>
          <Menu.Item class={styles.item}>Share</Menu.Item>
        </Menu.Popup>
      </Menu.Portal>
    </Menu.Root>
  )
}

function ChevronDownIcon() {
  return (
    <svg class={styles["trigger-icon"]} width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" stroke-width="1.5" />
    </svg>
  )
}
