import { mergeDefaultProps } from "../utils";
import { type ParentProps, createSignal, splitProps } from "solid-js";

import { DialogRoot, type DialogRootOptions } from "../dialog/dialog-root";
import {
	DrawerContext,
	type DrawerContextValue,
	type DrawerSide,
} from "./drawer-context";

export interface DrawerRootOptions extends DialogRootOptions {
	/**
	 * The edge of the viewport the drawer slides in from.
	 * @default "right"
	 */
	side?: DrawerSide;
}

export interface DrawerRootProps extends ParentProps<DrawerRootOptions> {}

/**
 * A drawer is a panel that slides in from the edge of the screen,
 * built on top of Dialog primitives.
 */
export function DrawerRoot(props: DrawerRootProps) {
	const mergedProps = mergeDefaultProps(
		{
			side: "right" as DrawerSide,
		},
		props,
	);

	const [local, dialogProps] = splitProps(mergedProps, ["side"]);

	const [isSwiping, setIsSwiping] = createSignal(false);
	const [swipeMovementX, setSwipeMovementX] = createSignal(0);
	const [swipeMovementY, setSwipeMovementY] = createSignal(0);

	const drawerContext: DrawerContextValue = {
		side: () => local.side!,
		isSwiping,
		swipeMovementX,
		swipeMovementY,
		setIsSwiping,
		setSwipeMovementX,
		setSwipeMovementY,
		// Resets swipe visual state. The actual dialog close is triggered
		// by DrawerPopup which has access to useDialogContext().close().
		onSwipeDismiss: () => {
			setIsSwiping(false);
			setSwipeMovementX(0);
			setSwipeMovementY(0);
		},
	};

	return (
		<DrawerContext.Provider value={drawerContext}>
			<DialogRoot {...dialogProps} />
		</DrawerContext.Provider>
	);
}
