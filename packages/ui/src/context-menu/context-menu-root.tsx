import { mergeDefaultProps } from "../utils";
import {
	type ParentProps,
	createSignal,
	createUniqueId,
	splitProps,
} from "solid-js";

import { useLocale } from "../i18n";
import {
	InternalMenuRoot,
	type MenuRootOptions,
} from "../menubar/menu-root";
import { createDisclosureState } from "../primitives";
import {
	ContextMenuContext,
	type ContextMenuContextValue,
} from "./context-menu-context";

export interface ContextMenuRootOptions
	extends Omit<MenuRootOptions, "open" | "defaultOpen" | "getAnchorRect"> {
	onOpenChange?: (isOpen: boolean) => void;
}

export interface ContextMenuRootProps
	extends ParentProps<ContextMenuRootOptions> {}

/**
 * Displays a menu located at the pointer, triggered by a right-click or a long-press.
 */
export function ContextMenuRoot(props: ContextMenuRootProps) {
	const defaultId = `contextmenu-${createUniqueId()}`;

	const { direction } = useLocale();

	const mergedProps = mergeDefaultProps(
		{
			id: defaultId,
			placement: direction() === "rtl" ? "left-start" : "right-start",
			gutter: 2,
			shift: 2,
		},
		props,
	);

	const [local, others] = splitProps(mergedProps, ["onOpenChange"]);

	const [anchorRect, setAnchorRect] = createSignal({ x: 0, y: 0 });

	const disclosureState = createDisclosureState({
		defaultOpen: () => false,
		onOpenChange: (isOpen) => local.onOpenChange?.(isOpen),
	});

	const context: ContextMenuContextValue = {
		setAnchorRect,
	};

	return (
		<ContextMenuContext.Provider value={context}>
			<InternalMenuRoot
				open={disclosureState.isOpen()}
				onOpenChange={disclosureState.setIsOpen}
				getAnchorRect={anchorRect}
				{...others}
			/>
		</ContextMenuContext.Provider>
	);
}
