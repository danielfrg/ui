import { createSignal } from "solid-js";
import * as AlertDialog from "@danielfrg/ui/alert-dialog";
import * as Dialog from "@danielfrg/ui/dialog";
import styles from "./index.module.css";

export function DemoAlertDialogCloseConfirmation() {
	const [dialogOpen, setDialogOpen] = createSignal(false);
	const [confirmationOpen, setConfirmationOpen] = createSignal(false);
	const [textareaValue, setTextareaValue] = createSignal("");

	return (
		<Dialog.Root
			open={dialogOpen()}
			onOpenChange={(open) => {
				if (!open && textareaValue()) {
					setConfirmationOpen(true);
					return;
				}

				setTextareaValue("");
				setDialogOpen(open);
			}}
		>
			<Dialog.Trigger class={styles.button}>Tweet</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay class={styles.overlay} />
				<div class={styles.positioner}>
					<Dialog.Content class={styles.content}>
						<Dialog.Title class={styles.title}>New tweet</Dialog.Title>
						<form
							class={styles.textareaContainer}
							onSubmit={(event) => {
								event.preventDefault();
								setDialogOpen(false);
							}}
						>
							<textarea
								required
								class={styles.textarea}
								placeholder="What's on your mind?"
								value={textareaValue()}
								onInput={(event) => setTextareaValue(event.currentTarget.value)}
							/>
							<div class={styles.actions}>
								<Dialog.CloseButton class={styles.button}>Cancel</Dialog.CloseButton>
								<button type="submit" class={styles.button}>
									Tweet
								</button>
							</div>
						</form>
					</Dialog.Content>
				</div>
			</Dialog.Portal>

			<AlertDialog.Root
				open={confirmationOpen()}
				onOpenChange={setConfirmationOpen}
			>
				<AlertDialog.Portal>
					<div class={styles.positioner}>
						<AlertDialog.Content class={styles.content}>
							<AlertDialog.Title class={styles.title}>
								Discard tweet?
							</AlertDialog.Title>
							<AlertDialog.Description class={styles.description}>
								Your tweet will be lost.
							</AlertDialog.Description>
							<div class={styles.actions}>
								<AlertDialog.CloseButton class={styles.button}>
									Go back
								</AlertDialog.CloseButton>
								<button
									type="button"
									class={`${styles.button} ${styles.red}`}
									onClick={() => {
										setConfirmationOpen(false);
										setDialogOpen(false);
									}}
								>
									Discard
								</button>
							</div>
						</AlertDialog.Content>
					</div>
				</AlertDialog.Portal>
			</AlertDialog.Root>
		</Dialog.Root>
	);
}
