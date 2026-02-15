import { mergeRefs } from "../utils";
import {
	type JSX,
	type ValidComponent,
	createEffect,
	on,
	onCleanup,
	splitProps,
} from "solid-js";

import { combineStyle } from "@solid-primitives/props";
import {
	type ElementOf,
	Polymorphic,
	type PolymorphicProps,
} from "../polymorphic";
import { useScrollAreaContext } from "./scroll-area-context";

export interface ScrollAreaViewportOptions {}

export interface ScrollAreaViewportCommonProps<
	T extends HTMLElement = HTMLElement,
> {
	ref: T | ((el: T) => void);
	style: JSX.CSSProperties | string;
	onScroll: JSX.EventHandlerUnion<T, Event>;
}

export interface ScrollAreaViewportRenderProps
	extends ScrollAreaViewportCommonProps {}

export type ScrollAreaViewportProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = ScrollAreaViewportOptions &
	Partial<ScrollAreaViewportCommonProps<ElementOf<T>>>;

/**
 * The scrollable container. Hides native scrollbars.
 */
export function ScrollAreaViewport<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, ScrollAreaViewportProps<T>>,
) {
	let viewportEl: HTMLElement | undefined;
	const context = useScrollAreaContext();

	const [local, others] = splitProps(props as ScrollAreaViewportProps, [
		"ref",
		"style",
	]);

	// Set up ResizeObserver to recompute on size changes
	createEffect(() => {
		const el = context.viewportRef();
		if (!el) return;

		const ro = new ResizeObserver(() => {
			context.computeThumb();
		});
		ro.observe(el);

		// Also observe direct children for content size changes
		for (const child of el.children) {
			ro.observe(child);
		}

		onCleanup(() => ro.disconnect());
	});

	// Initial computation after mount
	createEffect(
		on(
			() => context.viewportRef(),
			(el) => {
				if (el) {
					// Defer to next frame to allow layout
					requestAnimationFrame(() => context.computeThumb());
				}
			},
		),
	);

	const baseStyle: JSX.CSSProperties = {
		overflow: "scroll",
		// Hide native scrollbars
		"scrollbar-width": "none",
	};

	return (
		<Polymorphic<ScrollAreaViewportRenderProps>
			as="div"
			ref={mergeRefs((el: HTMLElement) => {
				viewportEl = el;
				context.setViewportRef(el);
			}, local.ref)}
			style={combineStyle(baseStyle, local.style)}
			onScroll={(context as any)._onViewportScroll}
			{...others}
		/>
	);
}
