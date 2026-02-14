import type { Orientation } from "../utils";
import { type Accessor, createContext, useContext } from "solid-js";

export interface MenuBarDataSet {
	"data-expanded": string | undefined;
	"data-closed": string | undefined;
}

export interface MenuBarContextValue {
	dataset: Accessor<MenuBarDataSet>;
	value: Accessor<string | undefined>;
	setValue: (value: string | (() => string | undefined) | undefined) => void;
	menus: () => Set<string>;
	menuRefs: () => Map<string, Element[]>;
	menuRefMap: () => Map<string, HTMLElement | undefined>;
	lastValue: Accessor<string | (() => string | undefined) | undefined>;
	setLastValue: (
		value: string | (() => string | undefined) | undefined,
	) => void;
	registerMenu: (value: string, refs: Element[]) => void;
	unregisterMenu: (value: string) => void;
	nextMenu: () => void;
	previousMenu: () => void;
	closeMenu: () => void;
	autoFocusMenu: Accessor<boolean>;
	setAutoFocusMenu: (value: boolean) => void;
	generateId: (part: string) => string;
	orientation: Accessor<Orientation>;
}

export const MenuBarContext = createContext<MenuBarContextValue>();

export function useOptionalMenuBarContext() {
	return useContext(MenuBarContext);
}

export function useMenuBarContext() {
	const context = useContext(MenuBarContext);

	if (context === undefined) {
		throw new Error(
			"[kobalte]: `useMenuBarContext` must be used within a `Menu` component",
		);
	}

	return context;
}
