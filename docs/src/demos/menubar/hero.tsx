import { Menubar } from "@danielfrg/ui/menubar";
import styles from "./index.module.css";

export function DemoMenubarHero() {
	return (
		<Menubar.Root class={styles.menubar}>
			<Menubar.Menu>
				<Menubar.Trigger class={styles.trigger}>File</Menubar.Trigger>
				<Menubar.Portal>
					<Menubar.Popup class={styles.content}>
						<Menubar.Item
							class={styles.item}
							onSelect={() => console.log("New")}
						>
							New
						</Menubar.Item>
						<Menubar.Item
							class={styles.item}
							onSelect={() => console.log("Open")}
						>
							Open
						</Menubar.Item>
						<Menubar.Item
							class={styles.item}
							onSelect={() => console.log("Save")}
						>
							Save
						</Menubar.Item>
						<Menubar.SubmenuRoot>
							<Menubar.SubmenuTrigger class={styles.item}>
								Export
								<ChevronRightIcon />
							</Menubar.SubmenuTrigger>
							<Menubar.Portal>
								<Menubar.SubmenuPopup class={styles.content}>
									<Menubar.Item
										class={styles.item}
										onSelect={() => console.log("PDF")}
									>
										PDF
									</Menubar.Item>
									<Menubar.Item
										class={styles.item}
										onSelect={() => console.log("PNG")}
									>
										PNG
									</Menubar.Item>
									<Menubar.Item
										class={styles.item}
										onSelect={() => console.log("SVG")}
									>
										SVG
									</Menubar.Item>
								</Menubar.SubmenuPopup>
							</Menubar.Portal>
						</Menubar.SubmenuRoot>
						<Menubar.Separator class={styles.separator} />
						<Menubar.Item
							class={styles.item}
							onSelect={() => console.log("Print")}
						>
							Print
						</Menubar.Item>
					</Menubar.Popup>
				</Menubar.Portal>
			</Menubar.Menu>

			<Menubar.Menu>
				<Menubar.Trigger class={styles.trigger}>Edit</Menubar.Trigger>
				<Menubar.Portal>
					<Menubar.Popup class={styles.content}>
						<Menubar.Item
							class={styles.item}
							onSelect={() => console.log("Cut")}
						>
							Cut
						</Menubar.Item>
						<Menubar.Item
							class={styles.item}
							onSelect={() => console.log("Copy")}
						>
							Copy
						</Menubar.Item>
						<Menubar.Item
							class={styles.item}
							onSelect={() => console.log("Paste")}
						>
							Paste
						</Menubar.Item>
					</Menubar.Popup>
				</Menubar.Portal>
			</Menubar.Menu>

			<Menubar.Menu>
				<Menubar.Trigger class={styles.trigger}>View</Menubar.Trigger>
				<Menubar.Portal>
					<Menubar.Popup class={styles.content}>
						<Menubar.Item
							class={styles.item}
							onSelect={() => console.log("Zoom In")}
						>
							Zoom In
						</Menubar.Item>
						<Menubar.Item
							class={styles.item}
							onSelect={() => console.log("Zoom Out")}
						>
							Zoom Out
						</Menubar.Item>
						<Menubar.SubmenuRoot>
							<Menubar.SubmenuTrigger class={styles.item}>
								Layout
								<ChevronRightIcon />
							</Menubar.SubmenuTrigger>
							<Menubar.Portal>
								<Menubar.SubmenuPopup class={styles.content}>
									<Menubar.Item
										class={styles.item}
										onSelect={() => console.log("Single Page")}
									>
										Single Page
									</Menubar.Item>
									<Menubar.Item
										class={styles.item}
										onSelect={() => console.log("Two Pages")}
									>
										Two Pages
									</Menubar.Item>
									<Menubar.Item
										class={styles.item}
										onSelect={() => console.log("Continuous")}
									>
										Continuous
									</Menubar.Item>
								</Menubar.SubmenuPopup>
							</Menubar.Portal>
						</Menubar.SubmenuRoot>
						<Menubar.Separator class={styles.separator} />
						<Menubar.Item
							class={styles.item}
							onSelect={() => console.log("Full Screen")}
						>
							Full Screen
						</Menubar.Item>
					</Menubar.Popup>
				</Menubar.Portal>
			</Menubar.Menu>
		</Menubar.Root>
	);
}

function ChevronRightIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				d="M6 12L10 8L6 4"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}
