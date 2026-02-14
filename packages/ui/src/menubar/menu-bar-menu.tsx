import { mergeDefaultProps } from "../utils";
import { type ParentProps, createUniqueId, splitProps } from "solid-js";

import { useMenuBarContext } from "./menu-bar-context";
import { InternalMenuRoot, type MenuRootOptions } from "./menu-root";

export interface MenuBarMenuOptions extends Omit<MenuRootOptions, "modal"> {}

export interface MenuBarMenuProps extends ParentProps<MenuBarMenuOptions> {}

export function MenuBarMenu(props: MenuBarMenuProps) {
	const menuBarContext = useMenuBarContext();

	const defaultValue = `menu-${createUniqueId()}`;

	const [local, others] = splitProps(props, ["value"]);

	return (
		<InternalMenuRoot
			modal={false}
			value={local.value ?? defaultValue}
			{...others}
		/>
	);
}
