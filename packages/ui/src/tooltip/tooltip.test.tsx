import { render, fireEvent } from "@solidjs/testing-library";

import * as Tooltip from ".";

describe("Tooltip", () => {
	it("renders trigger", () => {
		const { getByRole } = render(() => (
			<Tooltip.Root>
				<Tooltip.Trigger>Hover me</Tooltip.Trigger>
				<Tooltip.Content>Tooltip text</Tooltip.Content>
			</Tooltip.Root>
		));

		const trigger = getByRole("button");
		expect(trigger).toHaveTextContent("Hover me");
	});

	it("does not show tooltip by default", () => {
		const { queryByRole } = render(() => (
			<Tooltip.Root>
				<Tooltip.Trigger>Hover me</Tooltip.Trigger>
				<Tooltip.Content>Tooltip text</Tooltip.Content>
			</Tooltip.Root>
		));

		expect(queryByRole("tooltip")).toBeNull();
	});

	it("shows tooltip when open is controlled", () => {
		const { getByRole } = render(() => (
			<Tooltip.Root open forceMount>
				<Tooltip.Trigger>Hover me</Tooltip.Trigger>
				<Tooltip.Content>Tooltip text</Tooltip.Content>
			</Tooltip.Root>
		));

		expect(getByRole("tooltip")).toBeInTheDocument();
		expect(getByRole("tooltip")).toHaveTextContent("Tooltip text");
	});

	it("opens on focus", async () => {
		const { getByRole } = render(() => (
			<Tooltip.Root openDelay={0}>
				<Tooltip.Trigger>Hover me</Tooltip.Trigger>
				<Tooltip.Content>Tooltip text</Tooltip.Content>
			</Tooltip.Root>
		));

		fireEvent.focus(getByRole("button"));
		await Promise.resolve();

		expect(getByRole("tooltip")).toBeInTheDocument();
	});

	it("has aria-describedby on trigger when open", () => {
		const { getByRole } = render(() => (
			<Tooltip.Root open forceMount>
				<Tooltip.Trigger>Hover me</Tooltip.Trigger>
				<Tooltip.Content>Tooltip text</Tooltip.Content>
			</Tooltip.Root>
		));

		const trigger = getByRole("button");
		const tooltip = getByRole("tooltip");

		expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
	});
});
