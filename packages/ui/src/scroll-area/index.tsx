import {
	ScrollAreaCorner as Corner,
	type ScrollAreaCornerCommonProps,
	type ScrollAreaCornerOptions,
	type ScrollAreaCornerProps,
	type ScrollAreaCornerRenderProps,
} from "./scroll-area-corner";
import {
	ScrollAreaRoot as Root,
	type ScrollAreaRootCommonProps,
	type ScrollAreaRootOptions,
	type ScrollAreaRootProps,
	type ScrollAreaRootRenderProps,
} from "./scroll-area-root";
import {
	ScrollAreaScrollbar as Scrollbar,
	type ScrollAreaScrollbarCommonProps,
	type ScrollAreaScrollbarOptions,
	type ScrollAreaScrollbarProps,
	type ScrollAreaScrollbarRenderProps,
} from "./scroll-area-scrollbar";
import {
	ScrollAreaThumb as Thumb,
	type ScrollAreaThumbCommonProps,
	type ScrollAreaThumbOptions,
	type ScrollAreaThumbProps,
	type ScrollAreaThumbRenderProps,
} from "./scroll-area-thumb";
import {
	ScrollAreaViewport as Viewport,
	type ScrollAreaViewportCommonProps,
	type ScrollAreaViewportOptions,
	type ScrollAreaViewportProps,
	type ScrollAreaViewportRenderProps,
} from "./scroll-area-viewport";

export type {
	ScrollAreaCornerOptions,
	ScrollAreaCornerCommonProps,
	ScrollAreaCornerRenderProps,
	ScrollAreaCornerProps,
	ScrollAreaRootOptions,
	ScrollAreaRootCommonProps,
	ScrollAreaRootRenderProps,
	ScrollAreaRootProps,
	ScrollAreaScrollbarOptions,
	ScrollAreaScrollbarCommonProps,
	ScrollAreaScrollbarRenderProps,
	ScrollAreaScrollbarProps,
	ScrollAreaThumbOptions,
	ScrollAreaThumbCommonProps,
	ScrollAreaThumbRenderProps,
	ScrollAreaThumbProps,
	ScrollAreaViewportOptions,
	ScrollAreaViewportCommonProps,
	ScrollAreaViewportRenderProps,
	ScrollAreaViewportProps,
};

export { Corner, Root, Scrollbar, Thumb, Viewport };

export const ScrollArea = Object.assign(Root, {
	Corner,
	Scrollbar,
	Thumb,
	Viewport,
});

export {
	useScrollAreaContext,
	type ScrollAreaContextValue,
} from "./scroll-area-context";
