import {
	type Orientation,
	callHandler,
	mergeDefaultProps,
	mergeRefs,
	scrollIntoViewport,
} from "../utils";
import {
	type Component,
	type JSX,
	type ValidComponent,
	createEffect,
	createMemo,
	on,
	onCleanup,
	splitProps,
} from "solid-js";

import * as Button from "../button";
import { useLocale } from "../i18n";
import type { Direction } from "../i18n/utils";
import { useOptionalMenuBarContext } from "./menu-bar-context";
import type { ElementOf, PolymorphicProps } from "../polymorphic";
import { createTagName } from "../primitives/create-tag-name";
import { type MenuDataSet, useMenuContext } from "./menu-context";
import { useMenuRootContext } from "./menu-root-context";

export interface MenuTriggerOptions {}

export interface MenuTriggerCommonProps<T extends HTMLElement = HTMLElement>
	extends Button.ButtonRootCommonProps<T> {
	id: string;
	onPointerDown: JSX.EventHandlerUnion<T, PointerEvent>;
	onClick: JSX.EventHandlerUnion<T, MouseEvent>;
	onKeyDown: JSX.EventHandlerUnion<T, KeyboardEvent>;
	onMouseOver: JSX.EventHandlerUnion<T, MouseEvent>;
	onFocus: JSX.EventHandlerUnion<T, FocusEvent>;
}

export interface MenuTriggerRenderProps
	extends MenuTriggerCommonProps,
		Button.ButtonRootRenderProps,
		MenuDataSet {
	role: "menuitem" | undefined;
	"data-kb-menu-value-trigger": string | undefined;
}

export type MenuTriggerProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = MenuTriggerOptions & Partial<MenuTriggerCommonProps<ElementOf<T>>>;

export const MENUBAR_KEYS = {
	next: (dir: Direction, orientation: Orientation) =>
		dir === "ltr"
			? orientation === "horizontal"
				? "ArrowRight"
				: "ArrowDown"
			: orientation === "horizontal"
				? "ArrowLeft"
				: "ArrowUp",
	previous: (dir: Direction, orientation: Orientation) =>
		MENUBAR_KEYS.next(dir === "ltr" ? "rtl" : "ltr", orientation),
};

const MENU_KEYS = {
	first: (orientation: Orientation) =>
		orientation === "horizontal" ? "ArrowDown" : "ArrowRight",
	last: (orientation: Orientation) =>
		orientation === "horizontal" ? "ArrowUp" : "ArrowLeft",
};

export function MenuTrigger<T extends ValidComponent = "button">(
	props: PolymorphicProps<T, MenuTriggerProps<T>>,
) {
	const rootContext = useMenuRootContext();
	const context = useMenuContext();
	const optionalMenuBarContext = useOptionalMenuBarContext();

	const { direction } = useLocale();

	const mergedProps = mergeDefaultProps(
		{
			id: rootContext.generateId("trigger"),
		},
		props as MenuTriggerProps,
	);

	const [local, others] = splitProps(mergedProps, [
		"ref",
		"id",
		"disabled",
		"onPointerDown",
		"onClick",
		"onKeyDown",
		"onMouseOver",
		"onFocus",
	]);

	let key = () => rootContext.value();

	if (optionalMenuBarContext !== undefined) {
		key = () => rootContext.value() ?? local.id!;
		if (optionalMenuBarContext.lastValue() === undefined)
			optionalMenuBarContext.setLastValue(key);
	}

	const tagName = createTagName(
		() => context.triggerRef(),
		() => "button",
	);

	const isNativeLink = createMemo(() => {
		return (
			tagName() === "a" && context.triggerRef()?.getAttribute("href") != null
		);
	});

	createEffect(
		on(
			() => optionalMenuBarContext?.value(),
			(value) => {
				if (!isNativeLink()) return;
				if (value === key()) context.triggerRef()?.focus();
			},
		),
	);

	const handleClick = () => {
		if (optionalMenuBarContext !== undefined) {
			if (!context.isOpen()) {
				if (!optionalMenuBarContext.autoFocusMenu()) {
					optionalMenuBarContext.setAutoFocusMenu(true);
				}
				context.open(false);
			} else {
				if (optionalMenuBarContext.value() === key())
					optionalMenuBarContext.closeMenu();
			}
		} else context.toggle(true);
	};

	const onPointerDown: JSX.EventHandlerUnion<HTMLElement, PointerEvent> = (
		e,
	) => {
		callHandler(e, local.onPointerDown);

		e.currentTarget.dataset.pointerType = e.pointerType;

		if (!local.disabled && e.pointerType !== "touch" && e.button === 0) {
			handleClick();
		}
	};

	const onClick: JSX.EventHandlerUnion<HTMLElement, MouseEvent> = (e) => {
		callHandler(e, local.onClick);

		if (!local.disabled) {
			if (e.currentTarget.dataset.pointerType === "touch") handleClick();
		}
	};

	const onKeyDown: JSX.EventHandlerUnion<HTMLElement, KeyboardEvent> = (e) => {
		callHandler(e, local.onKeyDown);

		if (local.disabled) {
			return;
		}

		if (isNativeLink()) {
			switch (e.key) {
				case "Enter":
				case " ":
					return;
			}
		}

		switch (e.key) {
			case "Enter":
			case " ":
			case MENU_KEYS.first(rootContext.orientation()):
				e.stopPropagation();
				e.preventDefault();
				scrollIntoViewport(e.currentTarget);
				context.open("first");
				optionalMenuBarContext?.setAutoFocusMenu(true);
				optionalMenuBarContext?.setValue(key);
				break;
			case MENU_KEYS.last(rootContext.orientation()):
				e.stopPropagation();
				e.preventDefault();
				context.open("last");
				break;
			case MENUBAR_KEYS.next(direction(), rootContext.orientation()):
				if (optionalMenuBarContext === undefined) break;
				e.stopPropagation();
				e.preventDefault();
				optionalMenuBarContext.nextMenu();
				break;
			case MENUBAR_KEYS.previous(direction(), rootContext.orientation()):
				if (optionalMenuBarContext === undefined) break;
				e.stopPropagation();
				e.preventDefault();
				optionalMenuBarContext.previousMenu();
				break;
		}
	};

	const onMouseOver: JSX.EventHandlerUnion<HTMLElement, MouseEvent> = (e) => {
		callHandler(e, local.onMouseOver);

		if (context.triggerRef()?.dataset.pointerType === "touch") return;

		if (
			!local.disabled &&
			optionalMenuBarContext !== undefined &&
			optionalMenuBarContext.value() !== undefined
		) {
			optionalMenuBarContext.setValue(key);
		}
	};

	const onFocus: JSX.EventHandlerUnion<HTMLElement, FocusEvent> = (e) => {
		callHandler(e, local.onFocus);

		if (
			optionalMenuBarContext !== undefined &&
			e.currentTarget.dataset.pointerType !== "touch"
		)
			optionalMenuBarContext.setValue(key);
	};

	createEffect(() => onCleanup(context.registerTriggerId(local.id!)));

	return (
		<Button.Root<
			Component<
				Omit<
					MenuTriggerRenderProps,
					Exclude<keyof Button.ButtonRootRenderProps, "role">
				>
			>
		>
			ref={mergeRefs(context.setTriggerRef, local.ref)}
			data-kb-menu-value-trigger={rootContext.value()}
			id={local.id}
			disabled={local.disabled}
			aria-haspopup="true"
			aria-expanded={context.isOpen()}
			aria-controls={context.isOpen() ? context.contentId() : undefined}
			data-highlighted={
				key() !== undefined && optionalMenuBarContext?.value() === key()
					? true
					: undefined
			}
			tabIndex={
				optionalMenuBarContext !== undefined
					? optionalMenuBarContext.value() === key() ||
						optionalMenuBarContext.lastValue() === key()
						? 0
						: -1
					: undefined
			}
			onPointerDown={onPointerDown}
			onMouseOver={onMouseOver}
			onClick={onClick}
			onKeyDown={onKeyDown}
			onFocus={onFocus}
			role={optionalMenuBarContext !== undefined ? "menuitem" : undefined}
			{...context.dataset()}
			{...others}
		/>
	);
}
