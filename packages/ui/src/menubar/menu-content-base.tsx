import {
	type Orientation,
	callHandler,
	composeEventHandlers,
	contains,
	mergeDefaultProps,
	mergeRefs,
} from "../utils";
import {
	type Component,
	type JSX,
	Show,
	type ValidComponent,
	createEffect,
	createUniqueId,
	onCleanup,
	onMount,
	splitProps,
} from "solid-js";

import { combineStyle } from "@solid-primitives/props";
import {
	DismissableLayer,
	type DismissableLayerRenderProps,
} from "../dismissable-layer";
import { useLocale } from "../i18n";
import { createSelectableList } from "../list";
import { useOptionalMenuBarContext } from "./menu-bar-context";
import {
	type ElementOf,
	Polymorphic,
	type PolymorphicProps,
} from "../polymorphic";
import { Popper } from "../popper";
import {
	type FocusOutsideEvent,
	type InteractOutsideEvent,
	type PointerDownOutsideEvent,
	createFocusScope,
} from "../primitives";
import { type MenuDataSet, useMenuContext } from "./menu-context";
import { useMenuRootContext } from "./menu-root-context";
import { MENUBAR_KEYS } from "./menu-trigger";

export interface MenuContentBaseOptions {
	onOpenAutoFocus?: (event: Event) => void;
	onCloseAutoFocus?: (event: Event) => void;
	onEscapeKeyDown?: (event: KeyboardEvent) => void;
	onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
	onFocusOutside?: (event: FocusOutsideEvent) => void;
	onInteractOutside?: (event: InteractOutsideEvent) => void;
}

export interface MenuContentBaseCommonProps<
	T extends HTMLElement = HTMLElement,
> {
	id: string;
	ref: T | ((el: T) => void);
	onPointerEnter: JSX.EventHandlerUnion<T, PointerEvent>;
	onPointerMove: JSX.EventHandlerUnion<T, PointerEvent>;
	onKeyDown: JSX.EventHandlerUnion<T, KeyboardEvent>;
	onMouseDown: JSX.EventHandlerUnion<T, MouseEvent>;
	onFocusIn: JSX.EventHandlerUnion<T, FocusEvent>;
	onFocusOut: JSX.EventHandlerUnion<T, FocusEvent>;
	style?: JSX.CSSProperties | string;
}

export interface MenuContentBaseRenderProps
	extends MenuContentBaseCommonProps,
		DismissableLayerRenderProps,
		MenuDataSet {
	role: "menu";
	tabIndex: number | undefined;
	"aria-labelledby": string | undefined;
	"data-orientation": Orientation;
}

export type MenuContentBaseProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = MenuContentBaseOptions & Partial<MenuContentBaseCommonProps<ElementOf<T>>>;

export function MenuContentBase<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, MenuContentBaseProps<T>>,
) {
	let ref: HTMLElement | undefined;

	const rootContext = useMenuRootContext();
	const context = useMenuContext();
	const optionalMenuBarContext = useOptionalMenuBarContext();

	const { direction } = useLocale();

	const mergedProps = mergeDefaultProps(
		{
			id: rootContext.generateId(`content-${createUniqueId()}`),
		},
		props as MenuContentBaseProps,
	);

	const [local, others] = splitProps(mergedProps, [
		"ref",
		"id",
		"style",
		"onOpenAutoFocus",
		"onCloseAutoFocus",
		"onEscapeKeyDown",
		"onFocusOutside",
		"onPointerEnter",
		"onPointerMove",
		"onKeyDown",
		"onMouseDown",
		"onFocusIn",
		"onFocusOut",
	]);

	let lastPointerX = 0;

	const isRootModalContent = () => {
		return (
			context.parentMenuContext() == null &&
			optionalMenuBarContext === undefined &&
			rootContext.isModal()
		);
	};

	const selectableList = createSelectableList(
		{
			selectionManager: context.listState().selectionManager,
			collection: context.listState().collection,
			autoFocus: context.autoFocus,
			deferAutoFocus: true,
			shouldFocusWrap: true,
			disallowTypeAhead: () =>
				!context.listState().selectionManager().isFocused(),
			orientation: () =>
				rootContext.orientation() === "horizontal" ? "vertical" : "horizontal",
		},
		() => ref,
	);

	createFocusScope(
		{
			trapFocus: () => isRootModalContent() && context.isOpen(),
			onMountAutoFocus: (event) => {
				if (optionalMenuBarContext === undefined)
					local.onOpenAutoFocus?.(event);
			},
			onUnmountAutoFocus: local.onCloseAutoFocus,
		},
		() => ref,
	);

	const onKeyDown: JSX.EventHandlerUnion<HTMLElement, KeyboardEvent> = (e) => {
		if (!contains(e.currentTarget, e.target)) {
			return;
		}

		if (e.key === "Tab" && context.isOpen()) {
			e.preventDefault();
		}

		if (optionalMenuBarContext !== undefined) {
			if (e.currentTarget.getAttribute("aria-haspopup") !== "true")
				switch (e.key) {
					case MENUBAR_KEYS.next(direction(), rootContext.orientation()):
						e.stopPropagation();
						e.preventDefault();
						context.close(true);
						optionalMenuBarContext.setAutoFocusMenu(true);
						optionalMenuBarContext.nextMenu();
						break;
					case MENUBAR_KEYS.previous(direction(), rootContext.orientation()):
						if (e.currentTarget.hasAttribute("data-closed")) break;

						e.stopPropagation();
						e.preventDefault();
						context.close(true);
						optionalMenuBarContext.setAutoFocusMenu(true);
						optionalMenuBarContext.previousMenu();
						break;
				}
		}
	};

	const onEscapeKeyDown = (e: KeyboardEvent) => {
		local.onEscapeKeyDown?.(e);

		optionalMenuBarContext?.setAutoFocusMenu(false);

		context.close(true);
	};

	const onFocusOutside = (e: FocusOutsideEvent) => {
		local.onFocusOutside?.(e);

		if (rootContext.isModal()) {
			e.preventDefault();
		}
	};

	const onPointerEnter: JSX.EventHandlerUnion<HTMLElement, PointerEvent> = (
		e,
	) => {
		callHandler(e, local.onPointerEnter);

		if (!context.isOpen()) {
			return;
		}

		context
			.parentMenuContext()
			?.listState()
			.selectionManager()
			.setFocused(false);
		context
			.parentMenuContext()
			?.listState()
			.selectionManager()
			.setFocusedKey(undefined);
	};

	const onPointerMove: JSX.EventHandlerUnion<HTMLElement, PointerEvent> = (
		e,
	) => {
		callHandler(e, local.onPointerMove);

		if (e.pointerType !== "mouse") {
			return;
		}

		const target = e.target as HTMLElement;
		const pointerXHasChanged = lastPointerX !== e.clientX;

		if (contains(e.currentTarget, target) && pointerXHasChanged) {
			context.setPointerDir(e.clientX > lastPointerX ? "right" : "left");
			lastPointerX = e.clientX;
		}
	};

	createEffect(() => onCleanup(context.registerContentId(local.id!)));

	onCleanup(() => context.setContentRef(undefined));

	const commonAttributes: Omit<MenuContentBaseRenderProps, keyof MenuDataSet> =
		{
			ref: mergeRefs((el) => {
				context.setContentRef(el);
				ref = el;
			}, local.ref),
			role: "menu",
			get id() {
				return local.id;
			},
			get tabIndex() {
				return selectableList.tabIndex();
			},
			get "aria-labelledby"() {
				return context.triggerId();
			},
			onKeyDown: composeEventHandlers([
				local.onKeyDown,
				selectableList.onKeyDown,
				onKeyDown,
			]),
			onMouseDown: composeEventHandlers([
				local.onMouseDown,
				selectableList.onMouseDown,
			]),
			onFocusIn: composeEventHandlers([
				local.onFocusIn,
				selectableList.onFocusIn,
			]),
			onFocusOut: composeEventHandlers([
				local.onFocusOut,
				selectableList.onFocusOut,
			]),
			onPointerEnter,
			onPointerMove,
			get "data-orientation"() {
				return rootContext.orientation();
			},
		};

	return (
		<Show when={context.contentPresent()}>
			<Popper.Positioner>
				<DismissableLayer<
					Component<
						Omit<
							MenuContentBaseRenderProps,
							keyof DismissableLayerRenderProps
						>
					>
				>
					disableOutsidePointerEvents={
						isRootModalContent() && context.isOpen()
					}
					excludedElements={[context.triggerRef]}
					bypassTopMostLayerCheck
					style={combineStyle(
						{
							"--kb-menu-content-transform-origin":
								"var(--kb-popper-content-transform-origin)",
							position: "relative",
						},
						local.style,
					)}
					onEscapeKeyDown={onEscapeKeyDown}
					onFocusOutside={onFocusOutside}
					onDismiss={context.close}
					{...context.dataset()}
					{...commonAttributes}
					{...others}
				/>
			</Popper.Positioner>
		</Show>
	);
}
