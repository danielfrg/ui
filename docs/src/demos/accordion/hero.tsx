import * as Accordion from "@danielfrg/ui/accordion";
import styles from "./index.module.css";

export function DemoAccordionHero() {
	return (
		<Accordion.Root class={styles.accordion}>
			<Accordion.Item value="base-ui" class={styles.item}>
				<Accordion.Header class={styles.header}>
					<Accordion.Trigger class={styles.trigger}>
						What is Base UI?
						<PlusIcon class={styles.triggerIcon} />
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content class={styles.panel}>
					<div class={styles.content}>
						Base UI is a library of high-quality unstyled React components for
						design systems and web apps.
					</div>
				</Accordion.Content>
			</Accordion.Item>

			<Accordion.Item value="getting-started" class={styles.item}>
				<Accordion.Header class={styles.header}>
					<Accordion.Trigger class={styles.trigger}>
						How do I get started?
						<PlusIcon class={styles.triggerIcon} />
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content class={styles.panel}>
					<div class={styles.content}>
						Head to the "Quick start" guide in the docs. If you've used
						unstyled libraries before, you'll feel at home.
					</div>
				</Accordion.Content>
			</Accordion.Item>

			<Accordion.Item value="license" class={styles.item}>
				<Accordion.Header class={styles.header}>
					<Accordion.Trigger class={styles.trigger}>
						Can I use it for my project?
						<PlusIcon class={styles.triggerIcon} />
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content class={styles.panel}>
					<div class={styles.content}>
						Of course! Base UI is free and open source.
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	);
}

function PlusIcon(props: Record<string, any>) {
	return (
		<svg viewBox="0 0 12 12" fill="currentcolor" {...props}>
			<path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />
		</svg>
	);
}
