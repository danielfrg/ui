import { Show, type ValidComponent } from "solid-js";

import {
	type ElementOf,
	Polymorphic,
	type PolymorphicProps,
} from "../polymorphic";
import { useScrollAreaContext } from "./scroll-area-context";

export interface ScrollAreaCornerOptions {}

export interface ScrollAreaCornerCommonProps<
	T extends HTMLElement = HTMLElement,
> {}

export interface ScrollAreaCornerRenderProps
	extends ScrollAreaCornerCommonProps {}

export type ScrollAreaCornerProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = ScrollAreaCornerOptions &
	Partial<ScrollAreaCornerCommonProps<ElementOf<T>>>;

/**
 * The small area at the intersection of horizontal and vertical scrollbars.
 */
export function ScrollAreaCorner<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, ScrollAreaCornerProps<T>>,
) {
	const context = useScrollAreaContext();

	const hasCorner = () => context.hasOverflowX() && context.hasOverflowY();

	return (
		<Show when={hasCorner()}>
			<Polymorphic
				as="div"
				style={{
					position: "absolute",
					bottom: "0",
					right: "0",
					width: `var(--scroll-area-corner-width, ${context.cornerWidth()}px)`,
					height: `var(--scroll-area-corner-height, ${context.cornerHeight()}px)`,
				}}
				{...props}
			/>
		</Show>
	);
}
