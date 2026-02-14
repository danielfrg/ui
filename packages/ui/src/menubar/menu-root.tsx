import {
	type Orientation,
	createGenerateId,
	mergeDefaultProps,
} from "../utils";
import { type ParentProps, createUniqueId, splitProps } from "solid-js";

import { useOptionalMenuBarContext } from "./menu-bar-context";
import { createDisclosureState } from "../primitives";
import { InternalMenu, type InternalMenuOptions } from "./menu";
import {
	MenuRootContext,
	type MenuRootContextValue,
} from "./menu-root-context";

export interface MenuRootOptions extends InternalMenuOptions {
	id?: string;
	modal?: boolean;
	preventScroll?: boolean;
	forceMount?: boolean;
	orientation?: Orientation;
	value?: string;
}

export interface MenuRootProps extends ParentProps<MenuRootOptions> {}

export function InternalMenuRoot(props: MenuRootProps) {
	const optionalMenuBarContext = useOptionalMenuBarContext();

	const defaultId = `menu-${createUniqueId()}`;

	const mergedProps = mergeDefaultProps(
		{
			id: defaultId,
			modal: true,
		},
		props,
	);

	const [local, others] = splitProps(mergedProps as any, [
		"id",
		"modal",
		"preventScroll",
		"forceMount",
		"open",
		"defaultOpen",
		"onOpenChange",
		"value",
		"orientation",
	]);

	const disclosureState = createDisclosureState({
		open: () => local.open,
		defaultOpen: () => local.defaultOpen,
		onOpenChange: (isOpen: boolean) => local.onOpenChange?.(isOpen),
	});

	const context: MenuRootContextValue = {
		isModal: () => local.modal ?? true,
		preventScroll: () => local.preventScroll ?? context.isModal(),
		forceMount: () => local.forceMount ?? false,
		generateId: createGenerateId(() => local.id!),
		value: () => local.value,
		orientation: () =>
			local.orientation ??
			optionalMenuBarContext?.orientation() ??
			"horizontal",
	};

	return (
		<MenuRootContext.Provider value={context}>
			<InternalMenu
				open={disclosureState.isOpen()}
				onOpenChange={disclosureState.setIsOpen}
				{...others}
			/>
		</MenuRootContext.Provider>
	);
}
