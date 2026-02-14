import { mergeDefaultProps } from "../utils";
import {
	type ValidComponent,
	createEffect,
	onCleanup,
	splitProps,
} from "solid-js";

import {
	type ElementOf,
	Polymorphic,
	type PolymorphicProps,
} from "../polymorphic";
import { type MenuItemDataSet, useMenuItemContext } from "./menu-item.context";

export interface MenuItemDescriptionOptions {}

export interface MenuItemDescriptionCommonProps<
	T extends HTMLElement = HTMLElement,
> {
	id: string;
}

export interface MenuItemDescriptionRenderProps
	extends MenuItemDescriptionCommonProps,
		MenuItemDataSet {}

export type MenuItemDescriptionProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = MenuItemDescriptionOptions &
	Partial<MenuItemDescriptionCommonProps<ElementOf<T>>>;

export function MenuItemDescription<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, MenuItemDescriptionProps<T>>,
) {
	const context = useMenuItemContext();

	const mergedProps = mergeDefaultProps(
		{
			id: context.generateId("description"),
		},
		props as MenuItemDescriptionProps,
	);

	const [local, others] = splitProps(mergedProps, ["id"]);

	createEffect(() => onCleanup(context.registerDescription(local.id)));

	return (
		<Polymorphic<MenuItemDescriptionRenderProps>
			as="div"
			id={local.id}
			{...context.dataset()}
			{...others}
		/>
	);
}
