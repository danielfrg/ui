import type { ValidComponent } from "solid-js";

import type { ElementOf, PolymorphicProps } from "../polymorphic";
import { useOptionalMenuBarContext } from "./menu-bar-context";
import { useOptionalMenuContext } from "./menu-context";
import { MenuBarMenu } from "./menu-bar-menu";
import {
	MenuTrigger,
	type MenuTriggerCommonProps,
	type MenuTriggerOptions,
	type MenuTriggerProps,
	type MenuTriggerRenderProps,
} from "./menu-trigger";

export interface MenuBarTriggerOptions extends MenuTriggerOptions {}

export interface MenuBarTriggerCommonProps<T extends HTMLElement = HTMLElement>
	extends MenuTriggerCommonProps<T> {}

export interface MenuBarTriggerRenderProps
	extends MenuBarTriggerCommonProps,
		MenuTriggerRenderProps {}

export type MenuBarTriggerProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = MenuBarTriggerOptions & Partial<MenuBarTriggerCommonProps<ElementOf<T>>>;

export function MenuBarTrigger<T extends ValidComponent = "button">(
	props: PolymorphicProps<T, MenuBarTriggerProps<T>>,
) {
	const menuBarContext = useOptionalMenuBarContext();
	const menuContext = useOptionalMenuContext();

	// If there's no parent MenuContext and the trigger has an href, wrap in a MenuBarMenu
	if (
		menuContext === undefined &&
		menuBarContext !== undefined &&
		(props as any).href !== undefined
	) {
		const linkTriggerId = `link-trigger-${Math.random().toString(36).slice(2)}`;
		return (
			<MenuBarMenu value={linkTriggerId}>
				<MenuTrigger {...(props as MenuTriggerProps)} />
			</MenuBarMenu>
		);
	}

	return <MenuTrigger {...(props as MenuTriggerProps)} />;
}
