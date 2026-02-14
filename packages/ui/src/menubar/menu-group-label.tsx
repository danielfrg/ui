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
import { useMenuGroupContext } from "./menu-group-context";

export interface MenuGroupLabelOptions {}

export interface MenuGroupLabelCommonProps<
	T extends HTMLElement = HTMLElement,
> {
	id: string;
}

export interface MenuGroupLabelRenderProps extends MenuGroupLabelCommonProps {
	"aria-hidden": "true";
}

export type MenuGroupLabelProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = MenuGroupLabelOptions & Partial<MenuGroupLabelCommonProps<ElementOf<T>>>;

export function MenuGroupLabel<T extends ValidComponent = "span">(
	props: PolymorphicProps<T, MenuGroupLabelProps<T>>,
) {
	const context = useMenuGroupContext();

	const mergedProps = mergeDefaultProps(
		{
			id: context.generateId("label"),
		},
		props as MenuGroupLabelProps,
	);

	const [local, others] = splitProps(mergedProps, ["id"]);

	createEffect(() => onCleanup(context.registerLabelId(local.id!)));

	return (
		<Polymorphic<MenuGroupLabelRenderProps>
			as="span"
			id={local.id}
			aria-hidden="true"
			{...others}
		/>
	);
}
