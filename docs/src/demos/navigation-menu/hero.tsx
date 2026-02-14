import { NavigationMenu } from "@danielfrg/ui/navigation-menu";
import styles from "./index.module.css";

export function DemoNavigationMenuHero() {
	return (
		<div class={styles.wrapper}>
		<NavigationMenu.Root class={styles.root}>
			<NavigationMenu.Menu>
				<NavigationMenu.Trigger class={styles.trigger}>
					Learn{" "}
					<NavigationMenu.Icon
						aria-hidden="true"
						class={styles["trigger-indicator"]}
					>
						<ChevronDownIcon />
					</NavigationMenu.Icon>
				</NavigationMenu.Trigger>
				<NavigationMenu.Portal>
					<NavigationMenu.Content
						class={`${styles.content} ${styles["content-1"]}`}
					>
						<NavigationMenu.Item
							class={styles["item-callout"]}
							href="https://github.com"
						>
							<NavigationMenu.ItemLabel class={styles["item-label"]}>
								GitHub
							</NavigationMenu.ItemLabel>
							<NavigationMenu.ItemDescription
								class={styles["item-description"]}
							>
								Where the world builds software.
							</NavigationMenu.ItemDescription>
						</NavigationMenu.Item>
						<NavigationMenu.Item
							class={styles.item}
							href="#quick-start"
						>
							<NavigationMenu.ItemLabel class={styles["item-label"]}>
								Quick Start
							</NavigationMenu.ItemLabel>
							<NavigationMenu.ItemDescription
								class={styles["item-description"]}
							>
								Install and assemble your first component.
							</NavigationMenu.ItemDescription>
						</NavigationMenu.Item>
						<NavigationMenu.Item
							class={styles.item}
							href="#accessibility"
						>
							<NavigationMenu.ItemLabel class={styles["item-label"]}>
								Accessibility
							</NavigationMenu.ItemLabel>
							<NavigationMenu.ItemDescription
								class={styles["item-description"]}
							>
								Learn how we build accessible components.
							</NavigationMenu.ItemDescription>
						</NavigationMenu.Item>
						<NavigationMenu.Item class={styles.item} href="#styling">
							<NavigationMenu.ItemLabel class={styles["item-label"]}>
								Styling
							</NavigationMenu.ItemLabel>
							<NavigationMenu.ItemDescription
								class={styles["item-description"]}
							>
								Unstyled and compatible with any styling solution.
							</NavigationMenu.ItemDescription>
						</NavigationMenu.Item>
					</NavigationMenu.Content>
				</NavigationMenu.Portal>
			</NavigationMenu.Menu>

			<NavigationMenu.Menu>
				<NavigationMenu.Trigger class={styles.trigger}>
					Overview{" "}
					<NavigationMenu.Icon class={styles["trigger-indicator"]}>
						<ChevronDownIcon />
					</NavigationMenu.Icon>
				</NavigationMenu.Trigger>
				<NavigationMenu.Portal>
					<NavigationMenu.Content
						class={`${styles.content} ${styles["content-2"]}`}
					>
						<NavigationMenu.Item
							class={styles.item}
							href="#introduction"
						>
							<NavigationMenu.ItemLabel class={styles["item-label"]}>
								Introduction
							</NavigationMenu.ItemLabel>
							<NavigationMenu.ItemDescription
								class={styles["item-description"]}
							>
								Build high-quality, accessible design systems and web apps.
							</NavigationMenu.ItemDescription>
						</NavigationMenu.Item>
						<NavigationMenu.Item
							class={styles.item}
							href="#getting-started"
						>
							<NavigationMenu.ItemLabel class={styles["item-label"]}>
								Getting Started
							</NavigationMenu.ItemLabel>
							<NavigationMenu.ItemDescription
								class={styles["item-description"]}
							>
								A quick tutorial to get you up and running.
							</NavigationMenu.ItemDescription>
						</NavigationMenu.Item>
						<NavigationMenu.Item class={styles.item} href="#animation">
							<NavigationMenu.ItemLabel class={styles["item-label"]}>
								Animation
							</NavigationMenu.ItemLabel>
							<NavigationMenu.ItemDescription
								class={styles["item-description"]}
							>
								Use CSS keyframes or any animation library of your choice.
							</NavigationMenu.ItemDescription>
						</NavigationMenu.Item>
						<NavigationMenu.Item
							class={styles.item}
							href="#composition"
						>
							<NavigationMenu.ItemLabel class={styles["item-label"]}>
								Composition
							</NavigationMenu.ItemLabel>
							<NavigationMenu.ItemDescription
								class={styles["item-description"]}
							>
								Customize behavior or integrate existing libraries.
							</NavigationMenu.ItemDescription>
						</NavigationMenu.Item>
					</NavigationMenu.Content>
				</NavigationMenu.Portal>
			</NavigationMenu.Menu>

			<NavigationMenu.Trigger
				class={styles.trigger}
				as="a"
				href="https://github.com"
				target="_blank"
			>
				GitHub
			</NavigationMenu.Trigger>

			<NavigationMenu.Viewport class={styles.viewport} />
		</NavigationMenu.Root>
		</div>
	);
}

function ChevronDownIcon() {
	return (
		<svg width="15" height="15" viewBox="0 0 15 15" fill="none">
			<path
				d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
				fill="currentColor"
				fill-rule="evenodd"
				clip-rule="evenodd"
			/>
		</svg>
	);
}
