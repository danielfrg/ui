import { createSignal } from "solid-js";

export interface DialogHandle {
	isOpen: () => boolean;
	setOpen: (open: boolean) => void;
	open: () => void;
	close: () => void;
	toggle: () => void;
}

export function createDialogHandle(defaultOpen = false): DialogHandle {
	const [isOpen, setOpen] = createSignal(defaultOpen);

	return {
		isOpen,
		setOpen,
		open: () => setOpen(true),
		close: () => setOpen(false),
		toggle: () => setOpen((value) => !value),
	};
}
