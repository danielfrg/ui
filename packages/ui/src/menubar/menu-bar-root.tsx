/*
 * Portions of this file are based on code from radix-ui-primitives.
 * MIT Licensed, Copyright (c) 2022 WorkOS.
 *
 * Credits to the Radix UI team:
 * https://github.com/radix-ui/primitives/blob/81b25f4b40c54f72aeb106ca0e64e1e09655153e/packages/react/menubar/src/Menubar.tsx
 */

import {
	type Orientation,
	contains,
	createGenerateId,
	mergeDefaultProps,
} from "../utils";
import {
	type Accessor,
	type ParentProps,
	type ValidComponent,
	createEffect,
	createMemo,
	createSignal,
	createUniqueId,
	onCleanup,
	splitProps,
} from "solid-js";

import { useLocale } from "../i18n";
import {
	type ElementOf,
	Polymorphic,
	type PolymorphicProps,
} from "../polymorphic";
import { createControllableSignal, createInteractOutside } from "../primitives";
import {
	MenuBarContext,
	type MenuBarContextValue,
	type MenuBarDataSet,
} from "./menu-bar-context";

export interface MenuBarRootOptions {
	/** The controlled value of the currently open menu. */
	value?: string;

	/** The default value of the currently open menu when initially rendered. */
	defaultValue?: string;

	/** Event handler called when the value changes. */
	onValueChange?: (value: string | undefined) => void;

	/** Whether the menu should loop keyboard navigation. */
	loop?: boolean;

	/** Whether to focus the menubar on Alt key press. */
	focusOnAlt?: boolean;

	/** Whether to auto-focus the menu when it opens. */
	autoFocusMenu?: boolean;

	/** The orientation of the menubar. */
	orientation?: Orientation;

	/** Whether the menubar is disabled. */
	disabled?: boolean;

	/**
	 * Used to force mounting when more control is needed.
	 * Useful when controlling animation with SolidJS animation libraries.
	 */
	forceMount?: boolean;

	/**
	 * A unique identifier for the component.
	 * The id is used to generate id attributes for nested components.
	 * If no id prop is provided, a generated id will be used.
	 */
	id?: string;
}

export interface MenuBarRootCommonProps<T extends HTMLElement = HTMLElement> {
	id: string;
	ref: T | ((el: T) => void);
}

export interface MenuBarRootRenderProps
	extends MenuBarRootCommonProps,
		MenuBarDataSet {
	role: "menubar";
	"data-orientation": Orientation;
	"aria-orientation": Orientation;
}

export type MenuBarRootProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = MenuBarRootOptions & Partial<MenuBarRootCommonProps<ElementOf<T>>>;

export function MenuBarRoot<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, MenuBarRootProps<T>>,
) {
	let ref: HTMLElement | undefined;

	const defaultId = `menubar-${createUniqueId()}`;

	const { direction } = useLocale();

	const mergedProps = mergeDefaultProps(
		{
			id: defaultId,
			loop: true,
			orientation: "horizontal" as Orientation,
		},
		props as MenuBarRootProps,
	);

	const [local, others] = splitProps(mergedProps, [
		"ref",
		"value",
		"defaultValue",
		"onValueChange",
		"loop",
		"focusOnAlt",
		"autoFocusMenu",
		"orientation",
		"disabled",
		"forceMount",
	]);

	const [value, setValue] = createControllableSignal<string>({
		value: () => local.value,
		defaultValue: () => local.defaultValue,
		onChange: (value) => local.onValueChange?.(value),
	});

	const [autoFocusMenu, setAutoFocusMenu] = createControllableSignal<boolean>({
		value: () => local.autoFocusMenu,
		defaultValue: () => false,
	});

	const [lastValue, setLastValue] = createSignal<
		string | (() => string | undefined) | undefined
	>();

	const menus = new Set<string>();
	const menuRefs = new Map<string, Element[]>();
	const menuRefMap = new Map<string, HTMLElement | undefined>();

	const registerMenu = (menuValue: string, refs: Element[]) => {
		menus.add(menuValue);
		menuRefs.set(menuValue, refs);

		const triggerEl = document.querySelector(
			`[data-kb-menu-value-trigger="${menuValue}"]`,
		);
		menuRefMap.set(menuValue, triggerEl as HTMLElement | undefined);
	};

	const unregisterMenu = (menuValue: string) => {
		menus.delete(menuValue);
		menuRefs.delete(menuValue);
		menuRefMap.delete(menuValue);
	};

	const getMenuValues = () => [...menus];

	const getNextMenu = (currentValue: string) => {
		const values = getMenuValues();
		const currentIndex = values.indexOf(currentValue);
		if (currentIndex === -1) return values[0];
		const nextIndex = currentIndex + 1;
		if (nextIndex >= values.length) {
			return local.loop ? values[0] : values[currentIndex];
		}
		return values[nextIndex];
	};

	const getPreviousMenu = (currentValue: string) => {
		const values = getMenuValues();
		const currentIndex = values.indexOf(currentValue);
		if (currentIndex === -1) return values[values.length - 1];
		const prevIndex = currentIndex - 1;
		if (prevIndex < 0) {
			return local.loop ? values[values.length - 1] : values[currentIndex];
		}
		return values[prevIndex];
	};

	const nextMenu = () => {
		const currentVal = typeof value() === "function" ? (value() as any)() : value();
		const lastVal = typeof lastValue() === "function" ? (lastValue() as any)() : lastValue();
		const resolvedValue = currentVal ?? lastVal;

		if (!resolvedValue) return;

		const next = getNextMenu(resolvedValue);
		if (next) {
			setValue(next as any);
			setLastValue(next as any);
		}
	};

	const previousMenu = () => {
		const currentVal = typeof value() === "function" ? (value() as any)() : value();
		const lastVal = typeof lastValue() === "function" ? (lastValue() as any)() : lastValue();
		const resolvedValue = currentVal ?? lastVal;

		if (!resolvedValue) return;

		const prev = getPreviousMenu(resolvedValue);
		if (prev) {
			setValue(prev as any);
			setLastValue(prev as any);
		}
	};

	const closeMenu = () => {
		setAutoFocusMenu(false as any);
		setValue(undefined as any);
	};

	createInteractOutside(
		{
			onInteractOutside: () => {
				closeMenu();
			},
			shouldExcludeElement: (el) => {
				// Don't close if clicking on a menu trigger or content
				for (const [, refs] of menuRefs) {
					for (const menuRef of refs) {
						if (menuRef && contains(menuRef, el)) {
							return true;
						}
					}
				}

				// Don't close if clicking on a trigger
				for (const [, triggerEl] of menuRefMap) {
					if (triggerEl && contains(triggerEl, el)) {
						return true;
					}
				}

				return false;
			},
		},
		() => ref,
	);

	// Handle Alt key focus
	createEffect(() => {
		if (!local.focusOnAlt) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Alt") {
				e.preventDefault();
				const values = getMenuValues();
				const resolvedLastValue = typeof lastValue() === "function" ? (lastValue() as any)() : lastValue();
				if (value() !== undefined) {
					closeMenu();
				} else if (resolvedLastValue) {
					setValue(resolvedLastValue as any);
				} else if (values.length > 0) {
					setValue(values[0]! as any);
					setLastValue(values[0]! as any);
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		onCleanup(() => {
			document.removeEventListener("keydown", handleKeyDown);
		});
	});

	const dataset: Accessor<MenuBarDataSet> = createMemo(() => ({
		"data-expanded": value() !== undefined ? "" : undefined,
		"data-closed": value() === undefined ? "" : undefined,
	}));

	const context: MenuBarContextValue = {
		dataset,
		value: value as Accessor<string | undefined>,
		setValue: setValue as any,
		menus: () => menus,
		menuRefs: () => menuRefs,
		menuRefMap: () => menuRefMap,
		lastValue,
		setLastValue,
		registerMenu,
		unregisterMenu,
		nextMenu,
		previousMenu,
		closeMenu,
		autoFocusMenu: () => autoFocusMenu() ?? false,
		setAutoFocusMenu: (v: boolean) => setAutoFocusMenu(v as any),
		generateId: createGenerateId(() => mergedProps.id!),
		orientation: () => local.orientation ?? "horizontal",
	};

	return (
		<MenuBarContext.Provider value={context}>
			<Polymorphic<MenuBarRootRenderProps>
				as="div"
				ref={(el: HTMLElement) => {
					ref = el;
				}}
				role="menubar"
				data-orientation={local.orientation}
				aria-orientation={local.orientation}
				{...dataset()}
				{...others}
			/>
		</MenuBarContext.Provider>
	);
}
