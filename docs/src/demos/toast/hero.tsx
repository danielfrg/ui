import * as Toast from "@danielfrg/ui/toast";
import * as Button from "@danielfrg/ui/button";
import styles from "./index.module.css";

export function DemoToastHero() {
	return (
		<>
			<Button.Root
				class={styles.trigger}
				onClick={() =>
					Toast.toaster.show((props) => (
						<Toast.Root toastId={props.toastId} class={styles.root}>
							<div class={styles.content}>
								<Toast.Title class={styles.title}>
									Event has been created
								</Toast.Title>
								<Toast.Description class={styles.description}>
									Monday, January 3rd at 6:00pm
								</Toast.Description>
							</div>
							<Toast.CloseButton class={styles.closeButton}>
								<CloseIcon />
							</Toast.CloseButton>
							<Toast.ProgressTrack class={styles.progressTrack}>
								<Toast.ProgressFill class={styles.progressFill} />
							</Toast.ProgressTrack>
						</Toast.Root>
					))
				}
			>
				Show Toast
			</Button.Root>

			<Toast.Region>
				<Toast.List class={styles.list} />
			</Toast.Region>
		</>
	);
}

function CloseIcon() {
	return (
		<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
			<path
				d="M11 3L3 11M3 3L11 11"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}
