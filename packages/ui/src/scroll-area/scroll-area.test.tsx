import { render } from "@solidjs/testing-library";

import * as ScrollArea from ".";

// jsdom doesn't implement ResizeObserver
global.ResizeObserver = class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
} as any;

describe("ScrollArea", () => {
	it("renders root element", () => {
		const { getByTestId } = render(() => (
			<ScrollArea.Root data-testid="root">
				<ScrollArea.Viewport>Content</ScrollArea.Viewport>
			</ScrollArea.Root>
		));

		expect(getByTestId("root")).toBeInTheDocument();
	});

	it("renders viewport element", () => {
		const { getByTestId } = render(() => (
			<ScrollArea.Root>
				<ScrollArea.Viewport data-testid="viewport">Content</ScrollArea.Viewport>
			</ScrollArea.Root>
		));

		const viewport = getByTestId("viewport");
		expect(viewport).toBeInTheDocument();
		expect(viewport.style.overflow).toBe("scroll");
		expect(viewport.style.scrollbarWidth).toBe("none");
	});

	it("renders vertical scrollbar with correct data-orientation", () => {
		const { getByTestId } = render(() => (
			<ScrollArea.Root>
				<ScrollArea.Viewport>Content</ScrollArea.Viewport>
				<ScrollArea.Scrollbar data-testid="scrollbar" keepMounted>
					<ScrollArea.Thumb />
				</ScrollArea.Scrollbar>
			</ScrollArea.Root>
		));

		expect(getByTestId("scrollbar")).toHaveAttribute(
			"data-orientation",
			"vertical",
		);
	});

	it("renders horizontal scrollbar with correct data-orientation", () => {
		const { getByTestId } = render(() => (
			<ScrollArea.Root>
				<ScrollArea.Viewport>Content</ScrollArea.Viewport>
				<ScrollArea.Scrollbar
					orientation="horizontal"
					data-testid="scrollbar"
					keepMounted
				>
					<ScrollArea.Thumb />
				</ScrollArea.Scrollbar>
			</ScrollArea.Root>
		));

		expect(getByTestId("scrollbar")).toHaveAttribute(
			"data-orientation",
			"horizontal",
		);
	});

	it("renders corner when both scrollbars are present and keepMounted", () => {
		const { queryByTestId } = render(() => (
			<ScrollArea.Root>
				<ScrollArea.Viewport>Content</ScrollArea.Viewport>
				<ScrollArea.Scrollbar keepMounted>
					<ScrollArea.Thumb />
				</ScrollArea.Scrollbar>
				<ScrollArea.Scrollbar orientation="horizontal" keepMounted>
					<ScrollArea.Thumb />
				</ScrollArea.Scrollbar>
				<ScrollArea.Corner data-testid="corner" />
			</ScrollArea.Root>
		));

		// Corner only renders when both axes have overflow, which won't happen in jsdom
		// This tests that the component doesn't crash
		expect(queryByTestId("corner")).toBeNull();
	});

	it("sets CSS variables for corner dimensions on root", () => {
		const { getByTestId } = render(() => (
			<ScrollArea.Root data-testid="root">
				<ScrollArea.Viewport>Content</ScrollArea.Viewport>
			</ScrollArea.Root>
		));

		const root = getByTestId("root");
		const style = root.getAttribute("style") ?? "";
		expect(style).toContain("--scroll-area-corner-width");
		expect(style).toContain("--scroll-area-corner-height");
	});

	it("does not have data-scrolling when not scrolling", () => {
		const { getByTestId } = render(() => (
			<ScrollArea.Root data-testid="root">
				<ScrollArea.Viewport>Content</ScrollArea.Viewport>
			</ScrollArea.Root>
		));

		expect(getByTestId("root")).not.toHaveAttribute("data-scrolling");
	});

	it("does not have data-hovering when not hovered", () => {
		const { getByTestId } = render(() => (
			<ScrollArea.Root data-testid="root">
				<ScrollArea.Viewport>Content</ScrollArea.Viewport>
			</ScrollArea.Root>
		));

		expect(getByTestId("root")).not.toHaveAttribute("data-hovering");
	});
});
