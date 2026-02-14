import { mergeDefaultProps } from "../utils";
import { type ParentProps, createUniqueId } from "solid-js";

import {
	InternalMenuRoot,
	type MenuRootOptions as InternalMenuRootOptions,
	type MenuRootProps as InternalMenuRootProps,
} from "../menubar/menu-root";

export interface DropdownMenuRootOptions extends InternalMenuRootOptions {}

export interface DropdownMenuRootProps
	extends ParentProps<DropdownMenuRootOptions> {}

/**
 * Displays a menu to the user — such as a set of actions or functions — triggered by a button.
 */
export function DropdownMenuRoot(props: DropdownMenuRootProps) {
	const defaultId = `menu-${createUniqueId()}`;

	const mergedProps = mergeDefaultProps({ id: defaultId }, props);

	return <InternalMenuRoot {...mergedProps} />;
}
