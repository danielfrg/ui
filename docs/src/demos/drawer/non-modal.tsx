import * as Drawer from "@danielfrg/ui/drawer";
import styles from "./index.module.css";

export function DemoDrawerNonModal() {
	return (
		<Drawer.Root side="right" modal={false}>
			<Drawer.Trigger class={styles.button}>
				Open non-modal drawer
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Popup
					class={`${styles.popup} ${styles["popup-right"]} ${styles["popup-non-modal"]}`}
				>
					<Drawer.Title class={styles.title}>Non-modal drawer</Drawer.Title>
					<Drawer.Description class={styles.description}>
						This drawer does not trap focus and allows interaction with the rest
						of the page. Use the close button or swipe to dismiss it.
					</Drawer.Description>
					<div class={styles.actions}>
						<Drawer.Close class={styles.button}>Close</Drawer.Close>
					</div>
				</Drawer.Popup>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
