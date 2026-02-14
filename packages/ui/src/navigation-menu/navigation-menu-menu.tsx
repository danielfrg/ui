import { mergeDefaultProps } from "../utils";
import {
	batch,
	createEffect,
	createSignal,
	createUniqueId,
	on,
	splitProps,
} from "solid-js";
import type { MenuBarMenuOptions, MenuBarMenuProps } from "../menubar/menu-bar-menu";
import { useMenuBarContext } from "../menubar/menu-bar-context";
import { MenuBarMenu } from "../menubar/menu-bar-menu";
import { useNavigationMenuContext } from "./navigation-menu-context";

export interface NavigationMenuMenuOptions extends MenuBarMenuOptions {}

export interface NavigationMenuMenuProps extends MenuBarMenuProps {}

/**
 * Displays a menu to the user —such as a set of actions or functions— triggered by a button.
 */
export function NavigationMenuMenu(props: NavigationMenuMenuProps) {
	const menubarContext = useMenuBarContext();
	const context = useNavigationMenuContext();

	const [local, others] = splitProps(props, ["value"]);

	const uniqueid = createUniqueId();

	const defaultId = menubarContext.generateId(
		`navigation-menu-menu-${uniqueid}`,
	);

	const mergedPropsWithId = mergeDefaultProps({ id: defaultId }, others);

	const value = () => local.value ?? uniqueid;

	const [forceMount, setForceMount] = createSignal(false);

	const animationEnd = () => {
		if (menubarContext.value() !== value()) {
			setForceMount(false);
		}

		context.viewportRef()?.removeEventListener("animationend", animationEnd);
		context.viewportRef()?.removeEventListener("animationcancel", animationEnd);
	};

	createEffect(
		on(menubarContext.value, (contextValue) => {
			if (contextValue === value()) {
				setForceMount(true);
			} else {
				const viewportRef = context.viewportRef();

				if (
					!viewportRef ||
					["", "none"].includes(
						window.getComputedStyle(viewportRef).animationName,
					)
				) {
					setForceMount(false);
					return;
				}

				viewportRef.addEventListener("animationend", animationEnd);
			}
		}),
	);

	return (
		<MenuBarMenu
			forceMount={forceMount()}
			value={value()}
			{...mergedPropsWithId}
		/>
	);
}
