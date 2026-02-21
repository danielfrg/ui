import { fireEvent, render } from "@solidjs/testing-library"

import { ContextMenu } from "."

describe("ContextMenu", () => {
  it("renders a trigger area", () => {
    const { getByText } = render(() => (
      <ContextMenu.Root>
        <ContextMenu.Trigger>Right click here</ContextMenu.Trigger>
        <ContextMenu.Popup>
          <ContextMenu.Item>Action</ContextMenu.Item>
        </ContextMenu.Popup>
      </ContextMenu.Root>
    ))

    expect(getByText("Right click here")).toBeInTheDocument()
  })

  it("trigger renders as a div by default (not a button)", () => {
    const { getByText } = render(() => (
      <ContextMenu.Root>
        <ContextMenu.Trigger>Right click here</ContextMenu.Trigger>
        <ContextMenu.Popup>
          <ContextMenu.Item>Action</ContextMenu.Item>
        </ContextMenu.Popup>
      </ContextMenu.Root>
    ))

    const trigger = getByText("Right click here")
    expect(trigger.tagName).toBe("DIV")
  })

  it("opens on context menu event with forceMount", () => {
    const { getByText, getByRole } = render(() => (
      <ContextMenu.Root forceMount>
        <ContextMenu.Trigger>Right click here</ContextMenu.Trigger>
        <ContextMenu.Popup>
          <ContextMenu.Item>Action</ContextMenu.Item>
        </ContextMenu.Popup>
      </ContextMenu.Root>
    ))

    const trigger = getByText("Right click here")
    fireEvent.contextMenu(trigger)

    const menu = getByRole("menu")
    expect(menu).toBeInTheDocument()
  })

  it("renders menu items when open", () => {
    const { getByText, getAllByRole } = render(() => (
      <ContextMenu.Root forceMount>
        <ContextMenu.Trigger>Right click here</ContextMenu.Trigger>
        <ContextMenu.Popup>
          <ContextMenu.Item>Add to Library</ContextMenu.Item>
          <ContextMenu.Item>Play Next</ContextMenu.Item>
          <ContextMenu.Item>Share</ContextMenu.Item>
        </ContextMenu.Popup>
      </ContextMenu.Root>
    ))

    const trigger = getByText("Right click here")
    fireEvent.contextMenu(trigger)

    const items = getAllByRole("menuitem")
    expect(items.length).toBe(3)
    expect(items[0]!).toHaveTextContent("Add to Library")
    expect(items[1]!).toHaveTextContent("Play Next")
    expect(items[2]!).toHaveTextContent("Share")
  })
})
