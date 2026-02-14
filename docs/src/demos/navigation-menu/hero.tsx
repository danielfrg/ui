import { NavigationMenu } from "@danielfrg/ui/navigation-menu";
import styles from "./index.module.css";

const overviewLinks = [
	{
		href: "#quick-start",
		title: "Quick Start",
		description: "Install and assemble your first component.",
	},
	{
		href: "#accessibility",
		title: "Accessibility",
		description: "Learn how we build accessible components.",
	},
	{
		href: "#releases",
		title: "Releases",
		description: "See what's new in the latest versions.",
	},
	{
		href: "#about",
		title: "About",
		description: "Learn more about our mission and goals.",
	},
] as const;

const handbookLinks = [
	{
		href: "#styling",
		title: "Styling",
		description:
			"Components can be styled with plain CSS, Tailwind CSS, or CSS Modules.",
	},
	{
		href: "#animation",
		title: "Animation",
		description:
			"Components can be animated with CSS transitions, CSS animations, or JS libraries.",
	},
	{
		href: "#composition",
		title: "Composition",
		description:
			"Components can be composed with your own existing components.",
	},
] as const;

export function DemoNavigationMenuHero() {
	return (
		<NavigationMenu.Root class={styles.root}>
			<NavigationMenu.Menu>
				<NavigationMenu.Trigger class={styles.trigger}>
					Overview
					<ChevronDownIcon class={styles.icon} />
				</NavigationMenu.Trigger>
				<NavigationMenu.Portal>
					<NavigationMenu.Content class={styles.content}>
						<ul class={styles["grid-link-list"]}>
							{overviewLinks.map((item) => (
								<li>
									<a class={styles["link-card"]} href={item.href}>
										<h3 class={styles["link-title"]}>{item.title}</h3>
										<p class={styles["link-description"]}>
											{item.description}
										</p>
									</a>
								</li>
							))}
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Portal>
			</NavigationMenu.Menu>

			<NavigationMenu.Menu>
				<NavigationMenu.Trigger class={styles.trigger}>
					Handbook
					<ChevronDownIcon class={styles.icon} />
				</NavigationMenu.Trigger>
				<NavigationMenu.Portal>
					<NavigationMenu.Content class={styles.content}>
						<ul class={styles["flex-link-list"]}>
							{handbookLinks.map((item) => (
								<li>
									<a class={styles["link-card"]} href={item.href}>
										<h3 class={styles["link-title"]}>{item.title}</h3>
										<p class={styles["link-description"]}>
											{item.description}
										</p>
									</a>
								</li>
							))}
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Portal>
			</NavigationMenu.Menu>

			<NavigationMenu.Trigger class={styles.trigger} as="a" href="#">
				GitHub
			</NavigationMenu.Trigger>

			<NavigationMenu.Viewport class={styles.viewport} />
		</NavigationMenu.Root>
	);
}

function ChevronDownIcon(props: { class?: string }) {
	return (
		<svg
			width="10"
			height="10"
			viewBox="0 0 10 10"
			fill="none"
			class={props.class}
		>
			<path d="M1 3.5L5 7.5L9 3.5" stroke="currentcolor" stroke-width="1.5" />
		</svg>
	);
}
