import {
	type ValidationState,
	access,
	createGenerateId,
	mergeDefaultProps,
	mergeRefs,
} from "../utils";
import {
	type JSX,
	type ValidComponent,
	createUniqueId,
	splitProps,
} from "solid-js";

import {
	FORM_CONTROL_PROP_NAMES,
	FormControlContext,
	type FormControlDataSet,
	createFormControl,
} from "../form-control";
import {
	type ElementOf,
	Polymorphic,
	type PolymorphicProps,
} from "../polymorphic";
import {
	createControllableSignal,
	createFormResetListener,
} from "../primitives";
import {
	InputContext,
	type InputContextValue,
} from "./input-context";

export interface InputRootOptions {
	/** The controlled value of the input. */
	value?: string;

	/**
	 * The default value when initially rendered.
	 * Useful when you do not need to control the value.
	 */
	defaultValue?: string;

	/** Event handler called when the value of the input changes. */
	onChange?: (value: string) => void;

	/**
	 * A unique identifier for the component.
	 * The id is used to generate id attributes for nested components.
	 * If no id prop is provided, a generated id will be used.
	 */
	id?: string;

	/**
	 * The name of the input, used when submitting an HTML form.
	 * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
	 */
	name?: string;

	/** Whether the input should display its "valid" or "invalid" visual styling. */
	validationState?: ValidationState;

	/** Whether the user must fill the input before the owning form can be submitted. */
	required?: boolean;

	/** Whether the input is disabled. */
	disabled?: boolean;

	/** Whether the input is read only. */
	readOnly?: boolean;
}

export interface InputRootCommonProps<T extends HTMLElement = HTMLElement> {
	id: string;
	ref: T | ((el: T) => void);
}

export interface InputRootRenderProps
	extends InputRootCommonProps,
		FormControlDataSet {
	role: "group";
}

export type InputRootProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = InputRootOptions & Partial<InputRootCommonProps<ElementOf<T>>>;

/**
 * A text input that allow users to input custom text entries with a keyboard.
 */
export function InputRoot<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, InputRootProps<T>>,
) {
	let ref: HTMLElement | undefined;

	const defaultId = `input-${createUniqueId()}`;

	const mergedProps = mergeDefaultProps(
		{ id: defaultId },
		props as InputRootProps,
	);

	const [local, formControlProps, others] = splitProps(
		mergedProps,
		["ref", "value", "defaultValue", "onChange"],
		FORM_CONTROL_PROP_NAMES,
	);

	// Disable reactivity to only track controllability on first run
	const initialValue = local.value;

	const [value, setValue] = createControllableSignal({
		value: () => (initialValue === undefined ? undefined : local.value ?? ""),
		defaultValue: () => local.defaultValue,
		onChange: (value) => local.onChange?.(value),
	});

	const { formControlContext } = createFormControl(formControlProps);

	createFormResetListener(
		() => ref,
		() => setValue(local.defaultValue ?? ""),
	);

	const onInput: JSX.EventHandlerUnion<
		HTMLInputElement | HTMLTextAreaElement,
		InputEvent
	> = (e) => {
		if (formControlContext.isReadOnly() || formControlContext.isDisabled()) {
			return;
		}

		const target = e.target as HTMLInputElement | HTMLTextAreaElement;

		setValue(target.value);

		// Unlike in React, inputs `value` can be out of sync with our value state.
		// To prevent this, we need to force the input `value` to be in sync with the input value state.
		target.value = value() ?? "";
	};

	const context: InputContextValue = {
		value,
		generateId: createGenerateId(() => access(formControlProps.id)!),
		onInput,
	};

	return (
		<FormControlContext.Provider value={formControlContext}>
			<InputContext.Provider value={context}>
				<Polymorphic<InputRootRenderProps>
					as="div"
					ref={mergeRefs((el) => (ref = el), local.ref)}
					role="group"
					id={access(formControlProps.id)}
					{...formControlContext.dataset()}
					{...others}
				/>
			</InputContext.Provider>
		</FormControlContext.Provider>
	);
}
