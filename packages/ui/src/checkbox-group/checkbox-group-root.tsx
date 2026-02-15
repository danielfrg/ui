import { mergeDefaultProps } from "../utils";
import {
	type JSX,
	type ParentProps,
	type ValidComponent,
	createMemo,
	createSignal,
	splitProps,
} from "solid-js";

import { createControllableSignal } from "../primitives";
import {
	type ElementOf,
	Polymorphic,
	type PolymorphicProps,
} from "../polymorphic";
import {
	CheckboxGroupContext,
	type CheckboxGroupContextValue,
} from "./checkbox-group-context";

export interface CheckboxGroupRootOptions {
	/** The controlled value of the checkbox group. */
	value?: string[];

	/** The default value when initially rendered (uncontrolled). */
	defaultValue?: string[];

	/** Event handler called when the value changes. */
	onValueChange?: (value: string[]) => void;

	/** Whether the entire group is disabled. */
	disabled?: boolean;
}

export interface CheckboxGroupRootCommonProps<
	T extends HTMLElement = HTMLElement,
> {}

export interface CheckboxGroupRootRenderProps
	extends CheckboxGroupRootCommonProps {
	role: "group";
	"data-disabled": string | undefined;
}

export type CheckboxGroupRootProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = CheckboxGroupRootOptions &
	Partial<CheckboxGroupRootCommonProps<ElementOf<T>>>;

/**
 * Provides shared state to a series of checkboxes.
 */
export function CheckboxGroupRoot<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, ParentProps<CheckboxGroupRootProps<T>>>,
) {
	const [local, others] = splitProps(
		props as ParentProps<CheckboxGroupRootProps>,
		["value", "defaultValue", "onValueChange", "disabled"],
	);

	const [value, setValue] = createControllableSignal<string[]>({
		value: () => local.value,
		defaultValue: () => local.defaultValue ?? [],
		onChange: (value) => local.onValueChange?.(value),
	});

	const isSelected = (v: string) => (value() ?? []).includes(v);

	const toggle = (v: string) => {
		const current = value() ?? [];
		if (current.includes(v)) {
			setValue(current.filter((item) => item !== v));
		} else {
			setValue([...current, v]);
		}
	};

	const context: CheckboxGroupContextValue = {
		value: () => value() ?? [],
		isDisabled: () => local.disabled,
		isSelected,
		toggle,
	};

	return (
		<CheckboxGroupContext.Provider value={context}>
			<Polymorphic<CheckboxGroupRootRenderProps>
				as="div"
				role="group"
				data-disabled={local.disabled ? "" : undefined}
				{...others}
			/>
		</CheckboxGroupContext.Provider>
	);
}
