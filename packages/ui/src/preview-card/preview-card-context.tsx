import { type Accessor, createContext, useContext } from "solid-js";

export interface PreviewCardDataSet {
	"data-expanded": string | undefined;
	"data-closed": string | undefined;
}

export interface PreviewCardContextValue {
	dataset: Accessor<PreviewCardDataSet>;
	isOpen: Accessor<boolean>;
	contentPresent: Accessor<boolean>;
	openWithDelay: () => void;
	closeWithDelay: () => void;
	cancelOpening: () => void;
	cancelClosing: () => void;
	close: () => void;
	isTargetOnPreviewCard: (target: Node | null) => boolean;
	setTriggerRef: (el: HTMLElement) => void;
	setContentRef: (el: HTMLElement) => void;
}

export const PreviewCardContext = createContext<PreviewCardContextValue>();

export function usePreviewCardContext() {
	const context = useContext(PreviewCardContext);

	if (context === undefined) {
		throw new Error(
			"[ui]: `usePreviewCardContext` must be used within a `PreviewCard` component",
		);
	}

	return context;
}
