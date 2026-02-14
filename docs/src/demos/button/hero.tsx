import { Button } from "@danielfrg/ui/button";
import styles from "./index.module.css";

export function DemoButtonHero() {
	return (
		<div class="demo-row">
			<Button class={styles.button}>Default</Button>
			<Button class={styles.button} disabled>
				Disabled
			</Button>
		</div>
	);
}
