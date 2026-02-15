import { mergeDefaultProps } from "../utils";
import {
	type ParentProps,
	type ValidComponent,
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

export interface FieldRootOptions {
	/**
	 * A unique identifier for the field.
	 * The id is used to generate id attributes for nested components.
	 * If no id prop is provided, a generated id will be used.
	 */
	id?: string;

	/** The name of the field. Submitted with its owning form as part of a name/value pair. */
	name?: string;

	/** Whether the field should display its "valid" or "invalid" visual styling. */
	validationState?: "valid" | "invalid";

	/** Whether the user must fill the field before the owning form can be submitted. */
	required?: boolean;

	/** Whether the field is disabled. */
	disabled?: boolean;

	/** Whether the field is read only. */
	readOnly?: boolean;
}

export interface FieldRootCommonProps<T extends HTMLElement = HTMLElement> {}

export interface FieldRootRenderProps
	extends FieldRootCommonProps,
		FormControlDataSet {}

export type FieldRootProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = FieldRootOptions & Partial<FieldRootCommonProps<ElementOf<T>>>;

/**
 * A wrapper for form fields that provides shared state to
 * Label, Description, and Error sub-components.
 */
export function FieldRoot<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, ParentProps<FieldRootProps<T>>>,
) {
	const [local, others] = splitProps(
		props as ParentProps<FieldRootProps>,
		FORM_CONTROL_PROP_NAMES as unknown as (keyof FieldRootOptions)[],
	);

	const { formControlContext } = createFormControl(local);

	return (
		<FormControlContext.Provider value={formControlContext}>
			<Polymorphic<FieldRootRenderProps>
				as="div"
				{...formControlContext.dataset()}
				{...others}
			/>
		</FormControlContext.Provider>
	);
}
