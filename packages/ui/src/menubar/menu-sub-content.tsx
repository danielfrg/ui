import {
	type Orientation,
	callHandler,
	contains,
	focusWithoutScrolling,
} from "../utils";
import {
	type Component,
	type JSX,
	type ValidComponent,
	splitProps,
} from "solid-js";

import { type Direction, useLocale } from "../i18n";
import type { ElementOf, PolymorphicProps } from "../polymorphic";
import type { FocusOutsideEvent } from "../primitives";
import {
	MenuContentBase,
	type MenuContentBaseCommonProps,
	type MenuContentBaseOptions,
	type MenuContentBaseRenderProps,
} from "./menu-content-base";
import { useMenuContext } from "./menu-context";
import { useMenuRootContext } from "./menu-root-context";

export interface MenuSubContentOptions
	extends Omit<
		MenuContentBaseOptions,
		"onOpenAutoFocus" | "onCloseAutoFocus"
	> {}

export interface MenuSubContentCommonProps<T extends HTMLElement = HTMLElement>
	extends MenuContentBaseCommonProps<T> {
	onKeyDown: JSX.EventHandlerUnion<T, KeyboardEvent>;
}

export interface MenuSubContentRenderProps
	extends MenuSubContentCommonProps,
		MenuContentBaseRenderProps {}

export type MenuSubContentProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = MenuSubContentOptions & Partial<MenuSubContentCommonProps<ElementOf<T>>>;

const SUB_CLOSE_KEYS = {
	close: (dir: Direction, orientation: Orientation) => {
		if (dir === "ltr") {
			return [orientation === "horizontal" ? "ArrowLeft" : "ArrowUp"];
		}
		return [orientation === "horizontal" ? "ArrowRight" : "ArrowDown"];
	},
};

export function MenuSubContent<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, MenuSubContentProps<T>>,
) {
	const context = useMenuContext();
	const rootContext = useMenuRootContext();

	const [local, others] = splitProps(props as MenuSubContentProps, [
		"onFocusOutside",
		"onKeyDown",
	]);

	const { direction } = useLocale();

	const onOpenAutoFocus = (e: Event) => {
		e.preventDefault();
	};

	const onCloseAutoFocus = (e: Event) => {
		e.preventDefault();
	};

	const onFocusOutside = (e: FocusOutsideEvent) => {
		local.onFocusOutside?.(e);

		const target = e.target as HTMLElement | null;

		if (!contains(context.triggerRef(), target)) {
			context.close();
		}
	};

	const onKeyDown: JSX.EventHandlerUnion<HTMLElement, KeyboardEvent> = (e) => {
		callHandler(e, local.onKeyDown);

		const isKeyDownInside = contains(e.currentTarget, e.target);
		const isCloseKey = SUB_CLOSE_KEYS.close(
			direction(),
			rootContext.orientation(),
		).includes(e.key);
		const isSubMenu = context.parentMenuContext() != null;

		if (isKeyDownInside && isCloseKey && isSubMenu) {
			context.close();
			focusWithoutScrolling(context.triggerRef());
		}
	};

	return (
		<MenuContentBase<
			Component<
				Omit<MenuSubContentRenderProps, keyof MenuContentBaseRenderProps>
			>
		>
			onOpenAutoFocus={onOpenAutoFocus}
			onCloseAutoFocus={onCloseAutoFocus}
			onFocusOutside={onFocusOutside}
			onKeyDown={onKeyDown}
			{...others}
		/>
	);
}
