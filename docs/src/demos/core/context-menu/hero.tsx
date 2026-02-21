import { ContextMenu } from "@danielfrg/ui-core/context-menu"
import styles from "./index.module.css"

export function DemoContextMenuHero() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger class={styles.trigger}>Right click here</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Popup class={styles.popup}>
          <ContextMenu.Item class={styles.item}>Add to Library</ContextMenu.Item>
          <ContextMenu.Item class={styles.item}>Add to Playlist</ContextMenu.Item>
          <ContextMenu.Separator class={styles.separator} />
          <ContextMenu.Item class={styles.item}>Play Next</ContextMenu.Item>
          <ContextMenu.Item class={styles.item}>Play Last</ContextMenu.Item>
          <ContextMenu.Separator class={styles.separator} />
          <ContextMenu.Item class={styles.item}>Favorite</ContextMenu.Item>
          <ContextMenu.Item class={styles.item}>Share</ContextMenu.Item>
        </ContextMenu.Popup>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
