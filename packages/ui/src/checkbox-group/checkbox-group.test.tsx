import { fireEvent, render } from "@solidjs/testing-library";
import { vi } from "vitest";

import * as CheckboxGroup from ".";
import { useCheckboxGroupContext } from "./checkbox-group-context";

function TestCheckbox(props: { value: string; label: string }) {
	const group = useCheckboxGroupContext();
	return (
		<label>
			<input
				type="checkbox"
				value={props.value}
				checked={group.isSelected(props.value)}
				onChange={() => group.toggle(props.value)}
				disabled={group.isDisabled()}
			/>
			{props.label}
		</label>
	);
}

describe("CheckboxGroup", () => {
	it("renders with role group", () => {
		const { getByRole } = render(() => (
			<CheckboxGroup.Root>
				<TestCheckbox value="a" label="A" />
			</CheckboxGroup.Root>
		));

		expect(getByRole("group")).toBeInTheDocument();
	});

	it("supports default value", () => {
		const { getAllByRole } = render(() => (
			<CheckboxGroup.Root defaultValue={["a", "c"]}>
				<TestCheckbox value="a" label="A" />
				<TestCheckbox value="b" label="B" />
				<TestCheckbox value="c" label="C" />
			</CheckboxGroup.Root>
		));

		const checkboxes = getAllByRole("checkbox") as HTMLInputElement[];
		expect(checkboxes[0]!.checked).toBe(true);
		expect(checkboxes[1]!.checked).toBe(false);
		expect(checkboxes[2]!.checked).toBe(true);
	});

	it("toggles values on click", async () => {
		const onValueChange = vi.fn();

		const { getAllByRole } = render(() => (
			<CheckboxGroup.Root defaultValue={["a"]} onValueChange={onValueChange}>
				<TestCheckbox value="a" label="A" />
				<TestCheckbox value="b" label="B" />
			</CheckboxGroup.Root>
		));

		const checkboxes = getAllByRole("checkbox") as HTMLInputElement[];

		// Toggle B on
		fireEvent.click(checkboxes[1]!);
		await Promise.resolve();

		expect(onValueChange).toHaveBeenCalledWith(["a", "b"]);

		// Toggle A off
		fireEvent.click(checkboxes[0]!);
		await Promise.resolve();

		expect(onValueChange).toHaveBeenCalledWith(["b"]);
	});

	it("supports controlled value", () => {
		const { getAllByRole } = render(() => (
			<CheckboxGroup.Root value={["b"]}>
				<TestCheckbox value="a" label="A" />
				<TestCheckbox value="b" label="B" />
			</CheckboxGroup.Root>
		));

		const checkboxes = getAllByRole("checkbox") as HTMLInputElement[];
		expect(checkboxes[0]!.checked).toBe(false);
		expect(checkboxes[1]!.checked).toBe(true);
	});

	it("disables all checkboxes when group is disabled", () => {
		const { getAllByRole } = render(() => (
			<CheckboxGroup.Root disabled>
				<TestCheckbox value="a" label="A" />
				<TestCheckbox value="b" label="B" />
			</CheckboxGroup.Root>
		));

		const checkboxes = getAllByRole("checkbox") as HTMLInputElement[];
		expect(checkboxes[0]!.disabled).toBe(true);
		expect(checkboxes[1]!.disabled).toBe(true);
	});

	it("sets data-disabled when disabled", () => {
		const { getByRole } = render(() => (
			<CheckboxGroup.Root disabled>
				<TestCheckbox value="a" label="A" />
			</CheckboxGroup.Root>
		));

		expect(getByRole("group")).toHaveAttribute("data-disabled", "");
	});

	it("does not set data-disabled when not disabled", () => {
		const { getByRole } = render(() => (
			<CheckboxGroup.Root>
				<TestCheckbox value="a" label="A" />
			</CheckboxGroup.Root>
		));

		expect(getByRole("group")).not.toHaveAttribute("data-disabled");
	});
});
