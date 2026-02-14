/*
 * Portions of this file are based on code from react-spectrum.
 * Apache License Version 2.0, Copyright 2020 Adobe.
 *
 * Credits to the React Spectrum team:
 * https://github.com/adobe/react-spectrum/blob/0af91c08c745f4bb35b6ad4932ca17a0d85dd02c/packages/@react-aria/textfield/src/useTextField.ts
 * https://github.com/adobe/react-spectrum/blob/0af91c08c745f4bb35b6ad4932ca17a0d85dd02c/packages/@react-spectrum/textfield/src/TextArea.tsx
 */

import {
	composeEventHandlers,
	mergeDefaultProps,
	mergeRefs,
} from "../utils";
import {
	type Component,
	type JSX,
	type ValidComponent,
	createEffect,
	on,
	splitProps,
} from "solid-js";
import type { ElementOf, PolymorphicProps } from "../polymorphic";

import { useInputContext } from "./input-context";
import {
	InputFieldBase,
	type InputFieldCommonProps,
	type InputFieldRenderProps,
} from "./input-field";

export interface InputTextAreaOptions {
	/** Whether the textarea should adjust its height when the value changes. */
	autoResize?: boolean;

	/** Whether the form should be submitted when the user presses the enter key. */
	submitOnEnter?: boolean;
}

export interface InputTextAreaCommonProps<
	T extends HTMLElement = HTMLElement,
> extends InputFieldCommonProps<T> {
	ref: T | ((el: T) => void);
	onKeyPress: JSX.EventHandlerUnion<T, KeyboardEvent>;
}

export interface InputTextAreaRenderProps
	extends InputTextAreaCommonProps,
		InputFieldRenderProps {
	"aria-multiline": string | undefined;
}

export type InputTextAreaProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = InputTextAreaOptions &
	Partial<InputTextAreaCommonProps<ElementOf<T>>>;

/**
 * The native html textarea of the input.
 */
export function InputTextArea<T extends ValidComponent = "textarea">(
	props: PolymorphicProps<T, InputTextAreaProps<T>>,
) {
	let ref: HTMLElement | undefined;

	const context = useInputContext();

	const mergedProps = mergeDefaultProps(
		{
			id: context.generateId("textarea"),
		},
		props as InputTextAreaProps,
	);

	const [local, others] = splitProps(mergedProps, [
		"ref",
		"autoResize",
		"submitOnEnter",
		"onKeyPress",
	]);

	createEffect(
		on(
			[() => ref, () => local.autoResize, () => context.value()],
			([ref, autoResize]) => {
				if (!ref || !autoResize) {
					return;
				}

				adjustHeight(ref);
			},
		),
	);

	const onKeyPress = (event: KeyboardEvent) => {
		if (
			ref &&
			local.submitOnEnter &&
			event.key === "Enter" &&
			!event.shiftKey
		) {
			if ((ref as HTMLTextAreaElement).form) {
				(ref as HTMLTextAreaElement).form!.requestSubmit();
				event.preventDefault();
			}
		}
	};

	return (
		<InputFieldBase<
			Component<
				Omit<InputTextAreaRenderProps, keyof InputFieldRenderProps>
			>
		>
			as="textarea"
			aria-multiline={local.submitOnEnter ? "false" : undefined}
			onKeyPress={composeEventHandlers([local.onKeyPress, onKeyPress])}
			ref={mergeRefs((el) => (ref = el), local.ref) as any}
			{...others}
		/>
	);
}

/**
 * Adjust the height of the textarea based on its text value.
 */
function adjustHeight(el: HTMLElement) {
	const prevAlignment = el.style.alignSelf;
	const prevOverflow = el.style.overflow;

	const isFirefox = "MozAppearance" in el.style;
	if (!isFirefox) {
		el.style.overflow = "hidden";
	}

	el.style.alignSelf = "start";
	el.style.height = "auto";

	el.style.height = `${
		el.scrollHeight + (el.offsetHeight - el.clientHeight)
	}px`;
	el.style.overflow = prevOverflow;
	el.style.alignSelf = prevAlignment;
}
