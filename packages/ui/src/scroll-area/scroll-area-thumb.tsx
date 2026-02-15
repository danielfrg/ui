import { mergeRefs } from "../utils";
import {
	type JSX,
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

export interface ScrollAreaThumbOptions {}

export interface ScrollAreaThumbCommonProps<
	T extends HTMLElement = HTMLElement,
> {
	ref: T | ((el: T) => void);
	style: JSX.CSSProperties | string;
	onPointerDown: JSX.EventHandlerUnion<T, PointerEvent>;
	onPointerMove: JSX.EventHandlerUnion<T, PointerEvent>;
	onPointerUp: JSX.EventHandlerUnion<T, PointerEvent>;
}

export interface ScrollAreaThumbRenderProps
	extends ScrollAreaThumbCommonProps {
	"data-orientation": "vertical" | "horizontal";
}

export type ScrollAreaThumbProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = ScrollAreaThumbOptions & Partial<ScrollAreaThumbCommonProps<ElementOf<T>>>;

/**
 * The draggable thumb inside a scrollbar.
 * Must be a child of ScrollArea.Scrollbar.
 */
export function ScrollAreaThumb<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, ScrollAreaThumbProps<T>>,
) {
	const context = useScrollAreaContext();

	const [local, others] = splitProps(props as ScrollAreaThumbProps, [
		"ref",
		"style",
	]);

	// Determine orientation from nearest scrollbar parent's data attribute
	let thumbEl: HTMLElement | undefined;

	const getOrientation = (): "vertical" | "horizontal" => {
		if (!thumbEl) return "vertical";
		const parent = thumbEl.closest("[data-orientation]");
		return (parent?.getAttribute("data-orientation") as "vertical" | "horizontal") ?? "vertical";
	};

	const onRef = (el: HTMLElement) => {
		thumbEl = el;
		// Register with context based on parent scrollbar orientation.
		// We defer to allow the parent scrollbar to mount first.
		queueMicrotask(() => {
			const orient = getOrientation();
			if (orient === "vertical") {
				context.setThumbYRef(el);
			} else {
				context.setThumbXRef(el);
			}
		});
	};

	const onPointerDown = (e: PointerEvent) => {
		const orient = getOrientation();
		context.handlePointerDown(e, orient);
	};

	const onPointerMove = (e: PointerEvent) => {
		context.handlePointerMove(e);
	};

	const onPointerUp = (e: PointerEvent) => {
		context.handlePointerUp(e);
	};

	const sizeStyle = (): JSX.CSSProperties => {
		if (!thumbEl) return {};
		const orient = getOrientation();
		if (orient === "vertical") {
			return { height: `var(--scroll-area-thumb-height, ${context.thumbHeight()}px)` };
		}
		return { width: `var(--scroll-area-thumb-width, ${context.thumbWidth()}px)` };
	};

	return (
		<Polymorphic<ScrollAreaThumbRenderProps>
			as="div"
			ref={mergeRefs(onRef, local.ref)}
			style={combineStyle(sizeStyle(), local.style)}
			data-orientation={getOrientation()}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={onPointerUp}
			{...others}
		/>
	);
}
