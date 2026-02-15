import { type Accessor, createContext, useContext } from "solid-js";

export interface CheckboxGroupContextValue {
	/** The current selected values. */
	value: Accessor<string[]>;

	/** Whether the group is disabled. */
	isDisabled: Accessor<boolean | undefined>;

	/** Whether a value is selected. */
	isSelected: (value: string) => boolean;

	/** Toggle a value in the group. */
	toggle: (value: string) => void;
}

export const CheckboxGroupContext = createContext<CheckboxGroupContextValue>();

export function useCheckboxGroupContext() {
	const context = useContext(CheckboxGroupContext);

	if (context === undefined) {
		throw new Error(
			"[ui]: `useCheckboxGroupContext` must be used within a `CheckboxGroup` component",
		);
	}

	return context;
}
