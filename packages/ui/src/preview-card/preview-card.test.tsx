import { render } from "@solidjs/testing-library";
import { vi } from "vitest";

import * as PreviewCard from ".";

describe("PreviewCard", () => {
	it("renders trigger as a link by default", () => {
		const { getByText } = render(() => (
			<PreviewCard.Root>
				<PreviewCard.Trigger href="https://example.com">
					Hover me
				</PreviewCard.Trigger>
				<PreviewCard.Portal>
					<PreviewCard.Content>Preview content</PreviewCard.Content>
				</PreviewCard.Portal>
			</PreviewCard.Root>
		));

		const trigger = getByText("Hover me");
		expect(trigger).toBeInstanceOf(HTMLAnchorElement);
		expect(trigger).toHaveAttribute("href", "https://example.com");
	});

	it("should have data-closed attribute when closed", () => {
		const { getByText } = render(() => (
			<PreviewCard.Root>
				<PreviewCard.Trigger href="https://example.com">
					Hover me
				</PreviewCard.Trigger>
				<PreviewCard.Portal>
					<PreviewCard.Content>Preview content</PreviewCard.Content>
				</PreviewCard.Portal>
			</PreviewCard.Root>
		));

		const trigger = getByText("Hover me");
		expect(trigger).toHaveAttribute("data-closed");
	});

	it("should have data-expanded attribute when open", () => {
		const { getByText } = render(() => (
			<PreviewCard.Root open>
				<PreviewCard.Trigger href="https://example.com">
					Hover me
				</PreviewCard.Trigger>
				<PreviewCard.Portal>
					<PreviewCard.Content>Preview content</PreviewCard.Content>
				</PreviewCard.Portal>
			</PreviewCard.Root>
		));

		const trigger = getByText("Hover me");
		expect(trigger).toHaveAttribute("data-expanded");
	});

	it("shows content when open (without portal)", () => {
		const { getByText } = render(() => (
			<PreviewCard.Root open>
				<PreviewCard.Trigger href="https://example.com">
					Hover me
				</PreviewCard.Trigger>
				<PreviewCard.Content>Preview content</PreviewCard.Content>
			</PreviewCard.Root>
		));

		expect(getByText("Preview content")).toBeInTheDocument();
	});

	it("calls onOpenChange when controlled", () => {
		const onOpenChange = vi.fn();

		render(() => (
			<PreviewCard.Root open={false} onOpenChange={onOpenChange}>
				<PreviewCard.Trigger href="https://example.com">
					Hover me
				</PreviewCard.Trigger>
				<PreviewCard.Portal>
					<PreviewCard.Content>Preview content</PreviewCard.Content>
				</PreviewCard.Portal>
			</PreviewCard.Root>
		));

		// The preview card should not be open
		expect(onOpenChange).not.toHaveBeenCalled();
	});
});
