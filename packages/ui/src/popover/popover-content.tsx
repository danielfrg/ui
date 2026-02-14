import {
	contains,
	focusWithoutScrolling,
	mergeDefaultProps,
	mergeRefs,
} from "../utils";
import {
	type Component,
	type JSX,
	Show,
	type ValidComponent,
	createEffect,
	onCleanup,
	splitProps,
} from "solid-js";

import { combineStyle } from "@solid-primitives/props";
import createPreventScroll from "solid-prevent-scroll";
import {
	DismissableLayer,
	type DismissableLayerRenderProps,
} from "../dismissable-layer";
import type { ElementOf, PolymorphicProps } from "../polymorphic";
import { Popper } from "../popper";
import {
	type FocusOutsideEvent,
	type InteractOutsideEvent,
	type PointerDownOutsideEvent,
	createFocusScope,
	createHideOutside,
} from "../primitives";
import { type PopoverDataSet, usePopoverContext } from "./popover-context";

export interface PopoverContentOptions {
	onOpenAutoFocus?: (event: Event) => void;
	onCloseAutoFocus?: (event: Event) => void;
	onEscapeKeyDown?: (event: KeyboardEvent) => void;
	onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
	onFocusOutside?: (event: FocusOutsideEvent) => void;
	onInteractOutside?: (event: InteractOutsideEvent) => void;
}

export interface PopoverContentCommonProps<
	T extends HTMLElement = HTMLElement,
> {
	id: string;
	ref: T | ((el: T) => void);
	style?: JSX.CSSProperties | string;
}

export interface PopoverContentRenderProps
	extends PopoverContentCommonProps,
		DismissableLayerRenderProps,
		PopoverDataSet {
	role: "dialog";
	tabIndex: -1;
	"aria-labelledby": string | undefined;
	"aria-describedby": string | undefined;
}

export type PopoverContentProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = PopoverContentOptions & Partial<PopoverContentCommonProps<ElementOf<T>>>;

export function PopoverContent<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, PopoverContentProps<T>>,
) {
	let ref: HTMLElement | undefined;

	const context = usePopoverContext();

	const mergedProps = mergeDefaultProps(
		{
			id: context.generateId("content"),
		},
		props as PopoverContentProps,
	);

	const [local, others] = splitProps(mergedProps, [
		"ref",
		"style",
		"onOpenAutoFocus",
		"onCloseAutoFocus",
		"onPointerDownOutside",
		"onFocusOutside",
		"onInteractOutside",
	]);

	let isRightClickOutside = false;
	let hasInteractedOutside = false;
	let hasPointerDownOutside = false;

	const onCloseAutoFocus = (e: Event) => {
		local.onCloseAutoFocus?.(e);

		if (context.isModal()) {
			e.preventDefault();

			if (!isRightClickOutside) {
				focusWithoutScrolling(context.triggerRef());
			}
		} else {
			if (!e.defaultPrevented) {
				if (!hasInteractedOutside) {
					focusWithoutScrolling(context.triggerRef());
				}

				e.preventDefault();
			}

			hasInteractedOutside = false;
			hasPointerDownOutside = false;
		}
	};

	const onPointerDownOutside = (e: PointerDownOutsideEvent) => {
		local.onPointerDownOutside?.(e);

		if (context.isModal()) {
			isRightClickOutside = e.detail.isContextMenu;
		}
	};

	const onFocusOutside = (e: FocusOutsideEvent) => {
		local.onFocusOutside?.(e);

		if (context.isOpen() && context.isModal()) {
			e.preventDefault();
		}
	};

	const onInteractOutside = (e: InteractOutsideEvent) => {
		local.onInteractOutside?.(e);

		if (context.isModal()) {
			return;
		}

		if (!e.defaultPrevented) {
			hasInteractedOutside = true;

			if (e.detail.originalEvent.type === "pointerdown") {
				hasPointerDownOutside = true;
			}
		}

		if (contains(context.triggerRef(), e.target as HTMLElement)) {
			e.preventDefault();
		}

		if (e.detail.originalEvent.type === "focusin" && hasPointerDownOutside) {
			e.preventDefault();
		}
	};

	createHideOutside({
		isDisabled: () => !(context.isOpen() && context.isModal()),
		targets: () => (ref ? [ref] : []),
	});

	createPreventScroll({
		element: () => ref ?? null,
		enabled: () => context.contentPresent() && context.preventScroll(),
	});

	createFocusScope(
		{
			trapFocus: () => context.isOpen() && context.isModal(),
			onMountAutoFocus: local.onOpenAutoFocus,
			onUnmountAutoFocus: onCloseAutoFocus,
		},
		() => ref,
	);

	createEffect(() => onCleanup(context.registerContentId(others.id!)));

	return (
		<Show when={context.contentPresent()}>
			<Popper.Positioner>
				<DismissableLayer<
					Component<
						Omit<PopoverContentRenderProps, keyof DismissableLayerRenderProps>
					>
				>
					ref={mergeRefs((el) => {
						context.setContentRef(el);
						ref = el;
					}, local.ref)}
					role="dialog"
					tabIndex={-1}
					disableOutsidePointerEvents={context.isOpen() && context.isModal()}
					excludedElements={[context.triggerRef]}
					style={combineStyle(
						{
							"--kb-popover-content-transform-origin":
								"var(--kb-popper-content-transform-origin)",
							position: "relative",
						},
						local.style,
					)}
					aria-labelledby={context.titleId()}
					aria-describedby={context.descriptionId()}
					onPointerDownOutside={onPointerDownOutside}
					onFocusOutside={onFocusOutside}
					onInteractOutside={onInteractOutside}
					onDismiss={context.close}
					{...context.dataset()}
					{...others}
				/>
			</Popper.Positioner>
		</Show>
	);
}
