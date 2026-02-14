import { mergeDefaultProps } from "../utils";
import {
	type Component,
	type ValidComponent,
	createUniqueId,
	splitProps,
} from "solid-js";

import type { ElementOf, PolymorphicProps } from "../polymorphic";
import { createControllableSignal } from "../primitives";
import {
	MenuGroup,
	type MenuGroupCommonProps,
	type MenuGroupRenderProps,
} from "./menu-group";
import {
	MenuRadioGroupContext,
	type MenuRadioGroupContextValue,
} from "./menu-radio-group-context";
import { useMenuRootContext } from "./menu-root-context";

export interface MenuRadioGroupOptions<TValue = string> {
	value?: TValue;
	defaultValue?: TValue;
	onChange?: (value: TValue) => void;
	disabled?: boolean;
}

export interface MenuRadioGroupCommonProps<T extends HTMLElement = HTMLElement>
	extends MenuGroupCommonProps<T> {
	id: string;
}

export interface MenuRadioGroupRenderProps
	extends MenuRadioGroupCommonProps,
		MenuGroupRenderProps {}

export type MenuRadioGroupProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
	TValue = string,
> = MenuRadioGroupOptions<TValue> &
	Partial<MenuRadioGroupCommonProps<ElementOf<T>>>;

export function MenuRadioGroup<
	TValue = string,
	T extends ValidComponent = "div",
>(props: PolymorphicProps<T, MenuRadioGroupProps<T, TValue>>) {
	const rootContext = useMenuRootContext();

	const defaultId = rootContext.generateId(`radiogroup-${createUniqueId()}`);

	const mergedProps = mergeDefaultProps(
		{
			id: defaultId,
		},
		props as MenuRadioGroupProps<T, TValue>,
	);

	const [local, others] = splitProps(mergedProps, [
		"value",
		"defaultValue",
		"onChange",
		"disabled",
	]);

	const [selected, setSelected] = createControllableSignal<TValue>({
		value: () => local.value,
		defaultValue: () => local.defaultValue,
		onChange: (value) => local.onChange?.(value),
	});

	const context: MenuRadioGroupContextValue<TValue> = {
		isDisabled: () => local.disabled,
		isSelectedValue: (value: TValue) => value === selected(),
		setSelectedValue: (value: TValue) =>
			setSelected(value as Exclude<TValue, Function>),
	};

	return (
		<MenuRadioGroupContext.Provider value={context}>
			<MenuGroup<
				Component<Omit<MenuRadioGroupRenderProps, keyof MenuGroupRenderProps>>
			>
				{...others}
			/>
		</MenuRadioGroupContext.Provider>
	);
}
