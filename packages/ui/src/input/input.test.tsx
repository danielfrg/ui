import { installPointerEvent } from "../test-utils";
import { render } from "@solidjs/testing-library";
import { vi } from "vitest";

import * as Input from ".";

describe("Input", () => {
	installPointerEvent();

	it("can have a default value", () => {
		const { getByRole } = render(() => (
			<Input.Root defaultValue="cat">
				<Input.Label>Favorite Pet</Input.Label>
				<Input.Field />
			</Input.Root>
		));

		const input = getByRole("textbox") as HTMLInputElement;
		expect(input.value).toBe("cat");
	});

	it("name can be controlled", () => {
		const { getByRole } = render(() => (
			<Input.Root name="favorite-pet">
				<Input.Label>Favorite Pet</Input.Label>
				<Input.Field />
			</Input.Root>
		));

		const input = getByRole("textbox") as HTMLInputElement;
		expect(input).toHaveAttribute("name", "favorite-pet");
	});

	it("supports visible label", () => {
		const { getByRole, getByText } = render(() => (
			<Input.Root>
				<Input.Label>Favorite Pet</Input.Label>
				<Input.Field />
			</Input.Root>
		));

		const input = getByRole("textbox") as HTMLInputElement;
		const label = getByText("Favorite Pet");

		expect(input).toHaveAttribute("aria-labelledby", label.id);
		expect(label).toBeInstanceOf(HTMLLabelElement);
		expect(label).toHaveAttribute("for", input.id);
	});

	it("supports 'aria-label'", () => {
		const { getByRole } = render(() => (
			<Input.Root>
				<Input.Field aria-label="My Favorite Pet" />
			</Input.Root>
		));

		const input = getByRole("textbox") as HTMLInputElement;
		expect(input).toHaveAttribute("aria-label", "My Favorite Pet");
	});

	it("supports visible description", () => {
		const { getByRole, getByText } = render(() => (
			<Input.Root>
				<Input.Field />
				<Input.Description>Description</Input.Description>
			</Input.Root>
		));

		const input = getByRole("textbox") as HTMLInputElement;
		const description = getByText("Description");

		expect(description.id).toBeDefined();
		expect(input.id).toBeDefined();
		expect(input).toHaveAttribute("aria-describedby", description.id);
		expect(description.id).not.toBe(input.id);
	});

	it("should have 'data-invalid' attribute when invalid", () => {
		const { getByRole, getByTestId } = render(() => (
			<Input.Root data-testid="input" validationState="invalid">
				<Input.Field />
			</Input.Root>
		));

		const root = getByTestId("input");
		const input = getByRole("textbox") as HTMLInputElement;

		expect(root).toHaveAttribute("data-invalid");
		expect(input).toHaveAttribute("data-invalid");
	});

	it("should have 'data-required' attribute when required", () => {
		const { getByRole, getByTestId } = render(() => (
			<Input.Root data-testid="input" required>
				<Input.Field />
			</Input.Root>
		));

		const root = getByTestId("input");
		const input = getByRole("textbox") as HTMLInputElement;

		expect(root).toHaveAttribute("data-required");
		expect(input).toHaveAttribute("data-required");
	});

	it("should have 'data-disabled' attribute when disabled", () => {
		const { getByRole, getByTestId } = render(() => (
			<Input.Root data-testid="input" disabled>
				<Input.Field />
			</Input.Root>
		));

		const root = getByTestId("input");
		const input = getByRole("textbox") as HTMLInputElement;

		expect(root).toHaveAttribute("data-disabled");
		expect(input).toHaveAttribute("data-disabled");
	});

	it("should have 'aria-multiline' set to false on textarea when 'submitOnEnter' is true", () => {
		const { getByRole } = render(() => (
			<Input.Root>
				<Input.TextArea submitOnEnter />
			</Input.Root>
		));

		const input = getByRole("textbox") as HTMLInputElement;
		expect(input).toHaveAttribute("aria-multiline", "false");
	});
});
