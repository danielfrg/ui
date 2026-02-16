import * as Meter from "@danielfrg/ui/meter"
import styles from "./index.module.css"

export function DemoMeterHero() {
  return (
    <Meter.Root class={styles.meter} value={24}>
      <Meter.Label class={styles.label}>Storage Used</Meter.Label>
      <Meter.ValueLabel class={styles.value} />
      <Meter.Track class={styles.track}>
        <Meter.Fill class={styles.fill} />
      </Meter.Track>
    </Meter.Root>
  )
}
