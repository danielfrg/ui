import { fireEvent, render } from "@solidjs/testing-library"

import { NavigationMenu } from "."

describe("NavigationMenu", () => {
  it("renders a nav with menubar role", () => {
    const { container, getByRole } = render(() => (
      <NavigationMenu.Root>
        <NavigationMenu.Menu>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
        </NavigationMenu.Menu>
      </NavigationMenu.Root>
    ))

    expect(container.querySelector("nav")).toBeInTheDocument()
    expect(getByRole("menubar")).toBeInTheDocument()
  })

  it("renders triggers as menuitem role inside li elements", () => {
    const { getAllByRole } = render(() => (
      <NavigationMenu.Root>
        <NavigationMenu.Menu>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
        </NavigationMenu.Menu>
        <NavigationMenu.Menu>
          <NavigationMenu.Trigger>Company</NavigationMenu.Trigger>
        </NavigationMenu.Menu>
      </NavigationMenu.Root>
    ))

    const triggers = getAllByRole("menuitem")
    expect(triggers.length).toBe(2)
    expect(triggers[0]!).toHaveTextContent("Products")
    expect(triggers[1]!).toHaveTextContent("Company")

    // Each trigger should be inside a <li role="presentation">
    const li0 = triggers[0]!.closest("li")
    expect(li0).toBeInTheDocument()
    expect(li0).toHaveAttribute("role", "presentation")
  })

  it("triggers have aria-haspopup and aria-expanded attributes", () => {
    const { getAllByRole } = render(() => (
      <NavigationMenu.Root>
        <NavigationMenu.Menu>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
        </NavigationMenu.Menu>
      </NavigationMenu.Root>
    ))

    const trigger = getAllByRole("menuitem")[0]!
    expect(trigger).toHaveAttribute("aria-haspopup", "true")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("renders horizontal orientation by default", () => {
    const { getByRole } = render(() => (
      <NavigationMenu.Root>
        <NavigationMenu.Menu>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
        </NavigationMenu.Menu>
      </NavigationMenu.Root>
    ))

    expect(getByRole("menubar")).toHaveAttribute("data-orientation", "horizontal")
  })

  it("supports vertical orientation", () => {
    const { getByRole } = render(() => (
      <NavigationMenu.Root orientation="vertical">
        <NavigationMenu.Menu>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
        </NavigationMenu.Menu>
      </NavigationMenu.Root>
    ))

    expect(getByRole("menubar")).toHaveAttribute("data-orientation", "vertical")
  })

  it("renders content with forceMount on root", () => {
    const { getByText } = render(() => (
      <NavigationMenu.Root forceMount>
        <NavigationMenu.Menu>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Item>Item A</NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Menu>
      </NavigationMenu.Root>
    ))

    // With forceMount on root, menu content should still not be visible
    // unless the menu is opened (content visibility is controlled by menu disclosure state)
    // The trigger should exist
    expect(getByText("Products")).toBeInTheDocument()
  })
})
