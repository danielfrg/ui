import type { JSX } from "solid-js"
import * as ToggleGroup from "@danielfrg/ui/toggle-group"
import styles from "./index.module.css"

export function DemoToggleGroupHero() {
  return (
    <ToggleGroup.Root defaultValue="left" class={styles.panel}>
      <ToggleGroup.Item aria-label="Align left" value="left" class={styles.button}>
        <AlignLeftIcon class={styles.icon} />
      </ToggleGroup.Item>
      <ToggleGroup.Item aria-label="Align center" value="center" class={styles.button}>
        <AlignCenterIcon class={styles.icon} />
      </ToggleGroup.Item>
      <ToggleGroup.Item aria-label="Align right" value="right" class={styles.button}>
        <AlignRightIcon class={styles.icon} />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}

function AlignLeftIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentcolor" stroke-linecap="round" {...props}>
      <path d="M2.5 3.5H13.5" />
      <path d="M2.5 9.5H13.5" />
      <path d="M2.5 6.5H10.5" />
      <path d="M2.5 12.5H10.5" />
    </svg>
  )
}

function AlignCenterIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentcolor" stroke-linecap="round" {...props}>
      <path d="M3 3.5H14" />
      <path d="M3 9.5H14" />
      <path d="M4.5 6.5H12.5" />
      <path d="M4.5 12.5H12.5" />
    </svg>
  )
}

function AlignRightIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentcolor" stroke-linecap="round" {...props}>
      <path d="M2.5 3.5H13.5" />
      <path d="M2.5 9.5H13.5" />
      <path d="M5.5 6.5H13.5" />
      <path d="M5.5 12.5H13.5" />
    </svg>
  )
}
