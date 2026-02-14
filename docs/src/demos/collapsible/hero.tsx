import * as Collapsible from "@danielfrg/ui/collapsible";
import styles from "./index.module.css";

export function DemoCollapsibleHero() {
	return (
		<Collapsible.Root class={styles.collapsible}>
			<Collapsible.Trigger class={styles.trigger}>
				<ChevronIcon class={styles.icon} />
				Recovery keys
			</Collapsible.Trigger>
			<Collapsible.Content class={styles.panel}>
				<div class={styles.content}>
					<div>alien-bean-pasta</div>
					<div>wild-irish-burrito</div>
					<div>horse-battery-staple</div>
				</div>
			</Collapsible.Content>
		</Collapsible.Root>
	);
}

function ChevronIcon(props: Record<string, any>) {
	return (
		<svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
			<path d="M3.5 9L7.5 5L3.5 1" stroke="currentcolor" />
		</svg>
	);
}
