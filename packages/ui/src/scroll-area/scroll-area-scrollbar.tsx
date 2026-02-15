import { mergeRefs } from "../utils";
import {
	type JSX,
	Show,
	type ValidComponent,
	splitProps,
} from "solid-js";

import { combineStyle } from "@solid-primitives/props";
import {
	type ElementOf,
	Polymorphic,
	type PolymorphicProps,
} from "../polymorphic";
import { useScrollAreaContext } from "./scroll-area-context";

export interface ScrollAreaScrollbarOptions {
	/** Whether the scrollbar controls vertical or horizontal scroll. */
	orientation?: "vertical" | "horizontal";

	/** Whether to keep the scrollbar in the DOM when there's no overflow. */
	keepMounted?: boolean;
}

export interface ScrollAreaScrollbarCommonProps<
	T extends HTMLElement = HTMLElement,
> {
	ref: T | ((el: T) => void);
	style: JSX.CSSProperties | string;
	onPointerDown: JSX.EventHandlerUnion<T, PointerEvent>;
	onWheel: JSX.EventHandlerUnion<T, WheelEvent>;
}

export interface ScrollAreaScrollbarRenderProps
	extends ScrollAreaScrollbarCommonProps {
	"data-orientation": "vertical" | "horizontal";
	"data-scrolling": string | undefined;
	"data-hovering": string | undefined;
}

export type ScrollAreaScrollbarProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = ScrollAreaScrollbarOptions &
	Partial<ScrollAreaScrollbarCommonProps<ElementOf<T>>>;

/**
 * A custom scrollbar track. Contains the Thumb.
 */
export function ScrollAreaScrollbar<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, ScrollAreaScrollbarProps<T>>,
) {
	const context = useScrollAreaContext();

	const [local, others] = splitProps(props as ScrollAreaScrollbarProps, [
		"ref",
		"style",
		"orientation",
		"keepMounted",
	]);

	const orientation = () => local.orientation ?? "vertical";
	const isVertical = () => orientation() === "vertical";
	const hasOverflow = () =>
		isVertical() ? context.hasOverflowY() : context.hasOverflowX();

	const onRef = (el: HTMLElement) => {
		if (isVertical()) {
			context.setScrollbarYRef(el);
		} else {
			context.setScrollbarXRef(el);
		}
	};

	// Click on track = jump to position
	const onPointerDown = (e: PointerEvent) => {
		// Don't handle if clicking on the thumb itself
		const thumb = isVertical() ? context.thumbYRef() : context.thumbXRef();
		if (thumb && (e.target === thumb || thumb.contains(e.target as Node))) {
			return;
		}

		const viewport = context.viewportRef();
		const track = isVertical() ? context.scrollbarYRef() : context.scrollbarXRef();
		if (!viewport || !track) return;

		const trackRect = track.getBoundingClientRect();

		if (isVertical()) {
			const thumbH = context.thumbHeight();
			const clickPos = e.clientY - trackRect.top - thumbH / 2;
			const maxOffset = track.clientHeight - thumbH;
			if (maxOffset <= 0) return;
			const ratio = Math.max(0, Math.min(1, clickPos / maxOffset));
			viewport.scrollTop =
				ratio * (viewport.scrollHeight - viewport.clientHeight);
		} else {
			const thumbW = context.thumbWidth();
			const clickPos = e.clientX - trackRect.left - thumbW / 2;
			const maxOffset = track.clientWidth - thumbW;
			if (maxOffset <= 0) return;
			const ratio = Math.max(0, Math.min(1, clickPos / maxOffset));
			viewport.scrollLeft =
				ratio * (viewport.scrollWidth - viewport.clientWidth);
		}

		e.preventDefault();
	};

	// Forward wheel events on scrollbar to viewport
	const onWheel = (e: WheelEvent) => {
		const viewport = context.viewportRef();
		if (!viewport) return;
		if (isVertical()) {
			viewport.scrollTop += e.deltaY;
		} else {
			viewport.scrollLeft += e.deltaX || e.deltaY;
		}
		e.preventDefault();
	};

	const positionStyle = (): JSX.CSSProperties =>
		isVertical()
			? {
					position: "absolute",
					top: "0",
					bottom: `var(--scroll-area-corner-height, 0px)`,
					right: "0",
					width: undefined,
					"touch-action": "none",
					"user-select": "none",
				}
			: {
					position: "absolute",
					bottom: "0",
					left: "0",
					right: `var(--scroll-area-corner-width, 0px)`,
					height: undefined,
					"touch-action": "none",
					"user-select": "none",
				};

	const thumbSizeStyle = (): Record<string, string> =>
		isVertical()
			? { "--scroll-area-thumb-height": `${context.thumbHeight()}px` }
			: { "--scroll-area-thumb-width": `${context.thumbWidth()}px` };

	const content = () => (
		<Polymorphic<ScrollAreaScrollbarRenderProps>
			as="div"
			ref={mergeRefs(onRef, local.ref)}
			style={combineStyle(
				combineStyle(positionStyle(), thumbSizeStyle()),
				local.style,
			)}
			data-orientation={orientation()}
			data-scrolling={context.scrolling() ? "" : undefined}
			data-hovering={context.hovering() ? "" : undefined}
			onPointerDown={onPointerDown}
			onWheel={onWheel}
			{...others}
		/>
	);

	if (local.keepMounted) {
		return content();
	}

	return <Show when={hasOverflow()}>{content()}</Show>;
}
