import {
	type ParentProps,
	type ValidComponent,
	splitProps,
} from "solid-js";

import {
	type ElementOf,
	Polymorphic,
	type PolymorphicProps,
} from "../polymorphic";

export interface FieldsetRootOptions {
	/** Whether the fieldset is disabled. Disables all form controls within. */
	disabled?: boolean;
}

export interface FieldsetRootCommonProps<
	T extends HTMLElement = HTMLElement,
> {}

export interface FieldsetRootRenderProps extends FieldsetRootCommonProps {
	disabled: boolean | undefined;
	"data-disabled": string | undefined;
}

export type FieldsetRootProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = FieldsetRootOptions & Partial<FieldsetRootCommonProps<ElementOf<T>>>;

/**
 * Groups related form fields together. Renders a native `<fieldset>` element.
 */
export function FieldsetRoot<T extends ValidComponent = "fieldset">(
	props: PolymorphicProps<T, ParentProps<FieldsetRootProps<T>>>,
) {
	const [local, others] = splitProps(
		props as ParentProps<FieldsetRootProps>,
		["disabled"],
	);

	return (
		<Polymorphic<FieldsetRootRenderProps>
			as="fieldset"
			disabled={local.disabled}
			data-disabled={local.disabled ? "" : undefined}
			{...others}
		/>
	);
}
