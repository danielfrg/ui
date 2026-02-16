import * as Accordion from "@danielfrg/ui/accordion"
import styles from "./index.module.css"

export function DemoAccordionHero() {
  return (
    <Accordion.Root class={styles.accordion} defaultValue={["item-1"]}>
      <Accordion.Item value="item-1" class={styles.item}>
        <Accordion.Header class={styles.header}>
          <Accordion.Trigger class={styles.trigger}>
            <span>Is it accessible?</span>
            <PlusIcon class={styles.triggerIcon} />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content class={styles.panel}>
          <div class={styles.content}>Yes. It adheres to the WAI-ARIA design pattern.</div>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="item-2" class={styles.item}>
        <Accordion.Header class={styles.header}>
          <Accordion.Trigger class={styles.trigger}>
            <span>Is it unstyled?</span>
            <PlusIcon class={styles.triggerIcon} />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content class={styles.panel}>
          <div class={styles.content}>Yes. It's unstyled by default, giving you freedom over the look and feel.</div>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="item-3" class={styles.item}>
        <Accordion.Header class={styles.header}>
          <Accordion.Trigger class={styles.trigger}>
            <span>Can it be animated?</span>
            <PlusIcon class={styles.triggerIcon} />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content class={styles.panel}>
          <div class={styles.content}>Yes! You can animate the Accordion with CSS or JavaScript.</div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}

function PlusIcon(props: Record<string, any>) {
  return (
    <svg viewBox="0 0 12 12" fill="currentcolor" {...props}>
      <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />
    </svg>
  )
}
