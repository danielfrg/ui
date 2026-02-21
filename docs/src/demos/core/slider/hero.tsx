import * as Slider from "@danielfrg/ui-core/slider"
import styles from "./index.module.css"

export function DemoSliderHero() {
  return (
    <Slider.Root class={styles.root} defaultValue={[50]}>
      <div class={styles.header}>
        <Slider.Label class={styles.label}>Volume</Slider.Label>
        <Slider.ValueLabel class={styles["value-label"]} />
      </div>
      <Slider.Track class={styles.track}>
        <Slider.Fill class={styles.fill} />
        <Slider.Thumb class={styles.thumb}>
          <Slider.Input />
        </Slider.Thumb>
      </Slider.Track>
    </Slider.Root>
  )
}
