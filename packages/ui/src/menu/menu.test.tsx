import { render } from "@solidjs/testing-library";

import { Menu } from ".";

describe("Menu", () => {
	it("renders a trigger button", () => {
		const { getByRole } = render(() => (
			<Menu.Root>
				<Menu.Trigger>Open Menu</Menu.Trigger>
				<Menu.Popup>
					<Menu.Item>Action</Menu.Item>
				</Menu.Popup>
			</Menu.Root>
		));

		const trigger = getByRole("button");
		expect(trigger).toBeInTheDocument();
		expect(trigger).toHaveTextContent("Open Menu");
	});

	it("trigger has correct aria attributes", () => {
		const { getByRole } = render(() => (
			<Menu.Root>
				<Menu.Trigger>Open Menu</Menu.Trigger>
				<Menu.Popup>
					<Menu.Item>Action</Menu.Item>
				</Menu.Popup>
			</Menu.Root>
		));

		const trigger = getByRole("button");
		expect(trigger).toHaveAttribute("aria-haspopup", "true");
		expect(trigger).toHaveAttribute("aria-expanded", "false");
	});

	it("shows expanded trigger and menu when open", () => {
		const { getByRole, container } = render(() => (
			<Menu.Root forceMount open>
				<Menu.Trigger>Open Menu</Menu.Trigger>
				<Menu.Popup>
					<Menu.Item>Action 1</Menu.Item>
					<Menu.Item>Action 2</Menu.Item>
				</Menu.Popup>
			</Menu.Root>
		));

		// Trigger is aria-hidden when menu is open (focus trap), so query the DOM directly
		const trigger = container.querySelector("button")!;
		expect(trigger).toHaveAttribute("aria-expanded", "true");

		const menu = getByRole("menu");
		expect(menu).toBeInTheDocument();
	});

	it("renders menu items inside popup with forceMount", () => {
		const { getByRole, getAllByRole } = render(() => (
			<Menu.Root forceMount open>
				<Menu.Trigger>Open Menu</Menu.Trigger>
				<Menu.Popup>
					<Menu.Item>Add to Library</Menu.Item>
					<Menu.Item>Play Next</Menu.Item>
					<Menu.Item>Share</Menu.Item>
				</Menu.Popup>
			</Menu.Root>
		));

		expect(getByRole("menu")).toBeInTheDocument();

		const items = getAllByRole("menuitem");
		expect(items.length).toBe(3);
		expect(items[0]!).toHaveTextContent("Add to Library");
		expect(items[1]!).toHaveTextContent("Play Next");
		expect(items[2]!).toHaveTextContent("Share");
	});

	it("supports separator", () => {
		const { getByRole } = render(() => (
			<Menu.Root forceMount open>
				<Menu.Trigger>Open Menu</Menu.Trigger>
				<Menu.Popup>
					<Menu.Item>Action 1</Menu.Item>
					<Menu.Separator />
					<Menu.Item>Action 2</Menu.Item>
				</Menu.Popup>
			</Menu.Root>
		));

		const separator = getByRole("separator");
		expect(separator).toBeInTheDocument();
	});
});
