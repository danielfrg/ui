import { Show } from "solid-js";
import { Portal } from "solid-js/web";
import { useMenuContext } from "../menubar/menu-context";
import { useNavigationMenuContext } from "./navigation-menu-context";

import type { ComponentProps } from "solid-js";

export interface NavigationMenuPortalProps
	extends ComponentProps<typeof Portal> {}

/**
 * Portals its children into the NavigationMenu.Viewport when the menu is open.
 */
export function NavigationMenuPortal(props: NavigationMenuPortalProps) {
	const context = useNavigationMenuContext();
	const menuContext = useMenuContext();

	return (
		<Show when={context.viewportPresent()}>
			<Show when={menuContext.contentPresent()}>
				<Portal
					mount={
						menuContext.parentMenuContext() == null
							? context.viewportRef()
							: undefined
					}
					{...props}
				/>
			</Show>
		</Show>
	);
}
