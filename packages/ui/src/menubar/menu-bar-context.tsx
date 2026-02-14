import type { Orientation } from "../utils";
import {
	type Accessor,
	type Setter,
	createContext,
	useContext,
} from "solid-js";

export interface MenuBarDataSet {
	"data-expanded": string | undefined;
	"data-closed": string | undefined;
}

export interface MenuBarContextValue {
	dataset: Accessor<MenuBarDataSet>;
	value: Accessor<string | undefined | null>;
	setValue: (
		next:
			| string
			| ((prev: string | undefined | null) => string | undefined)
			| undefined
			| null,
	) => void;
	menus: Accessor<Set<string>>;
	menuRefs: Accessor<Array<HTMLElement>>;
	menuRefMap: Accessor<Map<string, Array<HTMLElement>>>;
	lastValue: Accessor<string | undefined>;
	setLastValue: (
		next:
			| string
			| ((prev: string | undefined) => string | undefined)
			| undefined,
	) => void;
	registerMenu: (value: string, refs: Array<HTMLElement>) => void;
	unregisterMenu: (value: string) => void;
	nextMenu: () => void;
	previousMenu: () => void;
	closeMenu: () => void;
	setAutoFocusMenu: Setter<boolean>;
	autoFocusMenu: Accessor<boolean>;
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
