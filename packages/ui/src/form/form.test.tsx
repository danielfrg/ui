import { fireEvent, render } from "@solidjs/testing-library";
import { vi } from "vitest";

import * as Form from ".";

describe("Form", () => {
	it("renders as a form element by default", () => {
		const { container } = render(() => (
			<Form.Root>
				<button type="submit">Submit</button>
			</Form.Root>
		));

		expect(container.querySelector("form")).toBeInTheDocument();
	});

	it("calls onSubmit when form is submitted", () => {
		const onSubmit = vi.fn();

		const { container } = render(() => (
			<Form.Root onSubmit={onSubmit}>
				<button type="submit">Submit</button>
			</Form.Root>
		));

		const form = container.querySelector("form")!;
		fireEvent.submit(form);

		expect(onSubmit).toHaveBeenCalledTimes(1);
	});

	it("prevents default form submission", () => {
		const onSubmit = vi.fn();
		let defaultPrevented = false;

		const { container } = render(() => (
			<Form.Root
				onSubmit={(e: SubmitEvent) => {
					defaultPrevented = e.defaultPrevented;
					onSubmit(e);
				}}
			>
				<button type="submit">Submit</button>
			</Form.Root>
		));

		const form = container.querySelector("form")!;
		fireEvent.submit(form);

		expect(defaultPrevented).toBe(true);
	});

	it("renders children", () => {
		const { getByTestId } = render(() => (
			<Form.Root>
				<div data-testid="child">Content</div>
			</Form.Root>
		));

		expect(getByTestId("child")).toBeInTheDocument();
	});

	it("passes through additional props", () => {
		const { container } = render(() => (
			<Form.Root class="my-form" id="form1">
				<button type="submit">Submit</button>
			</Form.Root>
		));

		const form = container.querySelector("form")!;
		expect(form).toHaveClass("my-form");
		expect(form).toHaveAttribute("id", "form1");
	});

	it("works without onSubmit handler", () => {
		const { container } = render(() => (
			<Form.Root>
				<button type="submit">Submit</button>
			</Form.Root>
		));

		const form = container.querySelector("form")!;
		// Should not throw when submitted without handler
		expect(() => fireEvent.submit(form)).not.toThrow();
	});

	it("supports novalidate attribute", () => {
		const { container } = render(() => (
			<Form.Root noValidate>
				<button type="submit">Submit</button>
			</Form.Root>
		));

		const form = container.querySelector("form")!;
		expect(form).toHaveAttribute("novalidate");
	});
});
