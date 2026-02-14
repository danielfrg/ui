import { createPointerEvent, installPointerEvent } from "../test-utils";
import { fireEvent, render, within } from "@solidjs/testing-library";
import { vi } from "vitest";

import * as ToggleGroup from ".";

describe("ToggleGroup", () => {
	installPointerEvent();

	it("can have a default value", async () => {
		const onChangeSpy = vi.fn();

		const { getByRole, getAllByTestId, getByText } = render(() => (
			<ToggleGroup.Root defaultValue="cats" onChange={onChangeSpy}>
				<ToggleGroup.Item data-testid="item" value="dogs">
					Dogs
				</ToggleGroup.Item>
				<ToggleGroup.Item data-testid="item" value="cats">
					Cats
				</ToggleGroup.Item>
				<ToggleGroup.Item data-testid="item" value="dragons">
					Dragons
				</ToggleGroup.Item>
			</ToggleGroup.Root>
		));

		const toggleGroup = getByRole("group");
		const buttons = getAllByTestId("item") as HTMLButtonElement[];

		expect(toggleGroup).toBeTruthy();
		expect(buttons.length).toBe(3);
		expect(onChangeSpy).not.toHaveBeenCalled();

		expect(buttons[0]!).toHaveAttribute("aria-pressed", "false");
		expect(buttons[1]!).toHaveAttribute("aria-pressed", "true");
		expect(buttons[2]!).toHaveAttribute("aria-pressed", "false");

		const dragons = getByText("Dragons");

		fireEvent.click(dragons);
		await Promise.resolve();

		expect(onChangeSpy).toHaveBeenCalledTimes(1);
		expect(onChangeSpy).toHaveBeenCalledWith("dragons");

		expect(buttons[0]!).toHaveAttribute("aria-pressed", "false");
		expect(buttons[1]!).toHaveAttribute("aria-pressed", "false");
		expect(buttons[2]!).toHaveAttribute("aria-pressed", "true");
	});

	it("allows user to change toggle item via left/right arrow keys with horizontal group", async () => {
		const { getByRole } = render(() => (
			<ToggleGroup.Root>
				<ToggleGroup.Item data-testid="item" value="dogs">
					Dogs
				</ToggleGroup.Item>
				<ToggleGroup.Item data-testid="item" value="cats">
					Cats
				</ToggleGroup.Item>
				<ToggleGroup.Item data-testid="item" value="dragons">
					Dragons
				</ToggleGroup.Item>
			</ToggleGroup.Root>
		));

		const toggleGroup = getByRole("group");
		const toggles = within(toggleGroup).getAllByTestId("item");
		const selectedItem = toggles[0]!;

		expect(toggleGroup).toHaveAttribute("data-orientation", "horizontal");

		expect(selectedItem).toHaveAttribute("tabindex", "-1");
		selectedItem.focus();

		fireEvent.keyDown(selectedItem, {
			key: "ArrowRight",
			code: 39,
			charCode: 39,
		});
		await Promise.resolve();

		const nextSelectedItem = toggles[1]!;
		expect(nextSelectedItem).toHaveAttribute("tabindex", "0");

		fireEvent.keyDown(nextSelectedItem, {
			key: "ArrowLeft",
			code: 37,
			charCode: 37,
		});
		await Promise.resolve();

		expect(selectedItem).toHaveAttribute("tabindex", "0");

		/** Doesn't change selection because its horizontal group. */
		fireEvent.keyDown(selectedItem, { key: "ArrowUp", code: 38, charCode: 38 });
		await Promise.resolve();

		expect(selectedItem).toHaveAttribute("tabindex", "0");

		fireEvent.keyDown(selectedItem, {
			key: "ArrowDown",
			code: 40,
			charCode: 40,
		});
		await Promise.resolve();

		expect(selectedItem).toHaveAttribute("tabindex", "0");
	});

	it("allows user to change toggle item via up/down arrow keys with vertical group", async () => {
		const { getByRole } = render(() => (
			<ToggleGroup.Root orientation="vertical">
				<ToggleGroup.Item data-testid="item" value="dogs">
					Dogs
				</ToggleGroup.Item>
				<ToggleGroup.Item data-testid="item" value="cats">
					Cats
				</ToggleGroup.Item>
				<ToggleGroup.Item data-testid="item" value="dragons">
					Dragons
				</ToggleGroup.Item>
			</ToggleGroup.Root>
		));

		const toggleGroup = getByRole("group");
		const toggles = within(toggleGroup).getAllByTestId("item");
		const selectedItem = toggles[0]!;

		expect(toggleGroup).toHaveAttribute("data-orientation", "vertical");

		expect(selectedItem).toHaveAttribute("tabindex", "-1");
		selectedItem.focus();

		fireEvent.keyDown(selectedItem, {
			key: "ArrowDown",
			code: 40,
			charCode: 40,
		});
		await Promise.resolve();

		const nextSelectedItem = toggles[1]!;
		expect(nextSelectedItem).toHaveAttribute("tabindex", "0");

		fireEvent.keyDown(selectedItem, {
			key: "ArrowUp",
			code: 38,
			charCode: 38,
		});
		await Promise.resolve();

		expect(selectedItem).toHaveAttribute("tabindex", "0");

		/** Doesn't change selection because its vertical group. */
		fireEvent.keyDown(selectedItem, {
			key: "ArrowRight",
			code: 39,
			charCode: 39,
		});
		await Promise.resolve();

		expect(selectedItem).toHaveAttribute("tabindex", "0");

		fireEvent.keyDown(nextSelectedItem, {
			key: "ArrowLeft",
			code: 37,
			charCode: 37,
		});
		await Promise.resolve();

		expect(selectedItem).toHaveAttribute("tabindex", "0");
	});

	it("select last item via end key / select first item via home key", async () => {
		const { getByRole } = render(() => (
			<ToggleGroup.Root>
				<ToggleGroup.Item data-testid="item" value="dogs">
					Dogs
				</ToggleGroup.Item>
				<ToggleGroup.Item data-testid="item" value="cats">
					Cats
				</ToggleGroup.Item>
				<ToggleGroup.Item data-testid="item" value="dragons">
					Dragons
				</ToggleGroup.Item>
			</ToggleGroup.Root>
		));

		const toggleGroup = getByRole("group");
		const toggles = within(toggleGroup).getAllByTestId("item");
		const firstItem = toggles[0]!;

		firstItem.focus();

		expect(toggleGroup).toHaveAttribute("data-orientation", "horizontal");

		expect(firstItem).toHaveAttribute("tabindex", "0");

		fireEvent.keyDown(firstItem, { key: "End", code: 35, charCode: 35 });
		await Promise.resolve();

		const lastItem = toggles[toggles.length - 1]!;

		expect(lastItem).toHaveAttribute("tabindex", "0");

		fireEvent.keyDown(lastItem, { key: "Home", code: 36, charCode: 36 });
		await Promise.resolve();

		expect(firstItem).toHaveAttribute("tabindex", "0");
	});

	it("supports using click to change state", async () => {
		const { getByRole } = render(() => (
			<ToggleGroup.Root>
				<ToggleGroup.Item data-testid="item" value="dogs">
					Dogs
				</ToggleGroup.Item>
				<ToggleGroup.Item data-testid="item" value="cats">
					Cats
				</ToggleGroup.Item>
				<ToggleGroup.Item data-testid="item" value="dragons">
					Dragons
				</ToggleGroup.Item>
			</ToggleGroup.Root>
		));

		const toggleGroup = getByRole("group");
		const toggles = within(toggleGroup).getAllByTestId("item");
		const firstItem = toggles[0]!;
		const secondItem = toggles[1]!;

		expect(firstItem).toHaveAttribute("aria-pressed", "false");

		fireEvent(
			secondItem,
			createPointerEvent("pointerdown", { pointerId: 1, pointerType: "mouse" }),
		);
		await Promise.resolve();

		expect(secondItem).toHaveAttribute("aria-pressed", "true");

		fireEvent(
			firstItem,
			createPointerEvent("pointerdown", { pointerId: 1, pointerType: "mouse" }),
		);
		await Promise.resolve();

		expect(firstItem).toHaveAttribute("aria-pressed", "true");
		expect(secondItem).toHaveAttribute("aria-pressed", "false");
	});

	it("multi-select", async () => {
		const { getByRole } = render(() => (
			<ToggleGroup.Root multiple>
				<ToggleGroup.Item data-testid="item" value="dogs">
					Dogs
				</ToggleGroup.Item>
				<ToggleGroup.Item data-testid="item" value="cats">
					Cats
				</ToggleGroup.Item>
				<ToggleGroup.Item data-testid="item" value="dragons">
					Dragons
				</ToggleGroup.Item>
			</ToggleGroup.Root>
		));

		const toggleGroup = getByRole("group");
		const toggles = within(toggleGroup).getAllByTestId("item");
		const firstItem = toggles[0]!;
		const secondItem = toggles[1]!;

		expect(firstItem).toHaveAttribute("aria-pressed", "false");

		fireEvent(
			secondItem,
			createPointerEvent("pointerdown", { pointerId: 1, pointerType: "mouse" }),
		);
		await Promise.resolve();

		fireEvent(
			firstItem,
			createPointerEvent("pointerdown", { pointerId: 1, pointerType: "mouse" }),
		);
		await Promise.resolve();

		expect(firstItem).toHaveAttribute("aria-pressed", "true");
		expect(secondItem).toHaveAttribute("aria-pressed", "true");
	});
});
