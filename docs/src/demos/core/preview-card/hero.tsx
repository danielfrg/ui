import * as PreviewCard from "@danielfrg/ui-core/preview-card"
import styles from "./index.module.css"

export function DemoPreviewCardHero() {
  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger class={styles.trigger} href="https://github.com/solidjs/solid">
        SolidJS
      </PreviewCard.Trigger>
      <PreviewCard.Portal>
        <PreviewCard.Content class={styles.content}>
          <PreviewCard.Arrow class={styles.arrow} />
          <div class={styles.card}>
            <p class={styles.title}>SolidJS</p>
            <p class={styles.description}>
              A declarative, efficient, and flexible JavaScript library for building user interfaces.
            </p>
            <p class={styles.link}>github.com/solidjs/solid</p>
          </div>
        </PreviewCard.Content>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  )
}
