import { callHandler, mergeRefs } from "../utils";
import {
	type JSX,
	type ValidComponent,
	createSignal,
	splitProps,
} from "solid-js";

import {
	type ElementOf,
	Polymorphic,
	type PolymorphicProps,
} from "../polymorphic";
import { type SliderDataSet, useSliderContext } from "./slider-context";
import { getClosestValueIndex, linearScale } from "./utils";

export interface SliderTrackOptions {}

export interface SliderTrackCommonProps<T extends HTMLElement = HTMLElement> {
	onPointerDown: JSX.EventHandlerUnion<T, PointerEvent>;
	onPointerMove: JSX.EventHandlerUnion<T, PointerEvent>;
	onPointerUp: JSX.EventHandlerUnion<T, PointerEvent>;
}

export interface SliderTrackRenderProps
	extends SliderTrackCommonProps,
		SliderDataSet {}

export type SliderTrackProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = SliderTrackOptions & Partial<SliderTrackCommonProps<ElementOf<T>>>;

/**
 * The component that visually represents the slider track.
 * Act as a container for `Slider.Fill`.
 */
export function SliderTrack<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, SliderTrackProps<T>>,
) {
	const context = useSliderContext();

	const [local, others] = splitProps(props as SliderTrackProps, [
		"onPointerDown",
		"onPointerMove",
		"onPointerUp",
	]);

	const [sRect, setRect] = createSignal<DOMRect>();

	function getValueFromPointer(pointerPosition: number) {
		const rect = sRect() || context.trackRef()!.getBoundingClientRect();

		const input: [number, number] = [
			0,
			context.state.orientation() === "vertical" ? rect.height : rect.width,
		];

		let output: [number, number] = context.isSlidingFromLeft()
			? [context.minValue(), context.maxValue()]
			: [context.maxValue(), context.minValue()];

		if (context.state.orientation() === "vertical") {
			output = context.isSlidingFromBottom()
				? [context.maxValue(), context.minValue()]
				: [context.minValue(), context.maxValue()];
		}

		const value = linearScale(input, output);

		setRect(rect);

		return value(
			pointerPosition -
				(context.state.orientation() === "vertical" ? rect.top : rect.left),
		);
	}

	const onPointerDown: JSX.EventHandlerUnion<any, PointerEvent> = (e) => {
		callHandler(e, local.onPointerDown);

		const target = e.target as HTMLElement;

		target.setPointerCapture(e.pointerId);

		e.preventDefault();

		const value = getValueFromPointer(
			context.state.orientation() === "horizontal" ? e.clientX : e.clientY,
		);
		const closestIndex = getClosestValueIndex(context.state.values(), value);

		context.onSlideStart?.(closestIndex, value);
	};

	const onPointerMove: JSX.EventHandlerUnion<any, PointerEvent> = (e) => {
		callHandler(e, local.onPointerMove);

		const target = e.target as HTMLElement;

		if (target.hasPointerCapture(e.pointerId)) {
			context.onSlideMove?.({
				deltaX: e.clientX,
				deltaY: e.clientY,
			});
		}
	};

	const onPointerUp: JSX.EventHandlerUnion<any, PointerEvent> = (e) => {
		callHandler(e, local.onPointerUp);

		const target = e.target as HTMLElement;

		if (target.hasPointerCapture(e.pointerId)) {
			target.releasePointerCapture(e.pointerId);
			setRect(undefined);
			context.onSlideEnd?.();
		}
	};

	return (
		<Polymorphic<SliderTrackRenderProps>
			as="div"
			ref={(el: HTMLElement) => context.registerTrack(el)}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={onPointerUp}
			{...context.dataset()}
			{...others}
		/>
	);
}
