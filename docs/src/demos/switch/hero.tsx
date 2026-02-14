import * as Switch from "@danielfrg/ui/switch";
import styles from "./index.module.css";

export function DemoSwitchHero() {
	return (
		<label class={styles.label}>
			<Switch.Root defaultChecked>
				<Switch.Input />
				<Switch.Control class={styles.switch}>
					<Switch.Thumb class={styles.thumb} />
				</Switch.Control>
			</Switch.Root>
			Notifications
		</label>
	);
}
