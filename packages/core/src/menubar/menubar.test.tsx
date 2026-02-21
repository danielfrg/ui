import { render } from "@solidjs/testing-library"

import { Menubar } from "."

describe("Menubar", () => {
  it("renders a menubar with role", () => {
    const { getByRole } = render(() => <Menubar.Root>content</Menubar.Root>)

    expect(getByRole("menubar")).toBeInTheDocument()
  })

  it("renders menu triggers as menuitem role", () => {
    const { getAllByRole } = render(() => (
      <Menubar.Root>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Popup>
            <Menubar.Item>New</Menubar.Item>
          </Menubar.Popup>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger>Edit</Menubar.Trigger>
          <Menubar.Popup>
            <Menubar.Item>Cut</Menubar.Item>
          </Menubar.Popup>
        </Menubar.Menu>
      </Menubar.Root>
    ))

    const items = getAllByRole("menuitem")
    expect(items.length).toBe(2)
    expect(items[0]!).toHaveTextContent("File")
    expect(items[1]!).toHaveTextContent("Edit")
  })

  it("has correct aria attributes on triggers", () => {
    const { getAllByRole } = render(() => (
      <Menubar.Root>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Popup>
            <Menubar.Item>New</Menubar.Item>
          </Menubar.Popup>
        </Menubar.Menu>
      </Menubar.Root>
    ))

    const trigger = getAllByRole("menuitem")[0]!
    expect(trigger).toHaveAttribute("aria-haspopup", "true")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("renders horizontal orientation by default", () => {
    const { getByRole } = render(() => (
      <Menubar.Root>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Popup>
            <Menubar.Item>New</Menubar.Item>
          </Menubar.Popup>
        </Menubar.Menu>
      </Menubar.Root>
    ))

    expect(getByRole("menubar")).toHaveAttribute("data-orientation", "horizontal")
    expect(getByRole("menubar")).toHaveAttribute("aria-orientation", "horizontal")
  })
})
