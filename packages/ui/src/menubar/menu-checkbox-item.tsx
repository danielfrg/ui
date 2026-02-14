import { mergeDefaultProps } from "../utils";
import { type Component, type ValidComponent, splitProps } from "solid-js";
import type { ElementOf, PolymorphicProps } from "../polymorphic";

import { createToggleState } from "../primitives";
import {
	MenuItemBase,
	type MenuItemBaseCommonProps,
	type MenuItemBaseOptions,
	type MenuItemBaseRenderProps,
} from "./menu-item-base";

export interface MenuCheckboxItemOptions
	extends Omit<MenuItemBaseOptions, "checked"> {
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (isChecked: boolean) => void;
}

export interface MenuCheckboxItemCommonProps<
	T extends HTMLElement = HTMLElement,
> extends MenuItemBaseCommonProps<T> {}

export interface MenuCheckboxItemRenderProps
	extends MenuCheckboxItemCommonProps,
		MenuItemBaseRenderProps {
	role: "menuitemcheckbox";
}

export type MenuCheckboxItemProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = MenuCheckboxItemOptions &
	Partial<MenuCheckboxItemCommonProps<ElementOf<T>>>;

export function MenuCheckboxItem<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, MenuCheckboxItemProps<T>>,
) {
	const mergedProps = mergeDefaultProps(
		{
			closeOnSelect: false,
		},
		props as MenuCheckboxItemProps,
	);

	const [local, others] = splitProps(mergedProps, [
		"checked",
		"defaultChecked",
		"onChange",
		"onSelect",
	]);

	const state = createToggleState({
		isSelected: () => local.checked,
		defaultIsSelected: () => local.defaultChecked,
		onSelectedChange: (checked) => local.onChange?.(checked),
		isDisabled: () => others.disabled,
	});

	const onSelect = () => {
		local.onSelect?.();
		state.toggle();
	};

	return (
		<MenuItemBase<
			Component<
				Omit<MenuCheckboxItemRenderProps, keyof MenuItemBaseRenderProps>
			>
		>
			role="menuitemcheckbox"
			checked={state.isSelected()}
			onSelect={onSelect}
			{...others}
		/>
	);
}
