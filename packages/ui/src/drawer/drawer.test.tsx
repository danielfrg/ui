import { fireEvent, render } from "@solidjs/testing-library"
import { vi } from "vitest"

import * as Drawer from "."

describe("Drawer", () => {
  // =========================================================================
  // ARIA / Accessibility (adapted from Dialog tests)
  // =========================================================================

  it("should be labelled by its drawer title", () => {
    const { getByRole, getByTestId } = render(() => (
      <Drawer.Root open>
        <Drawer.Popup>
          <Drawer.Title data-testid="title">title</Drawer.Title>
        </Drawer.Popup>
      </Drawer.Root>
    ))

    const panel = getByRole("dialog")
    const title = getByTestId("title")

    expect(panel).toHaveAttribute("aria-labelledby", title.id)
  })

  it("should be described by its drawer description", () => {
    const { getByRole, getByTestId } = render(() => (
      <Drawer.Root open>
        <Drawer.Popup>
          <Drawer.Description data-testid="description">description</Drawer.Description>
        </Drawer.Popup>
      </Drawer.Root>
    ))

    const panel = getByRole("dialog")
    const description = getByTestId("description")

    expect(panel).toHaveAttribute("aria-describedby", description.id)
  })

  it("should have role dialog", () => {
    const { getByRole } = render(() => (
      <Drawer.Root open>
        <Drawer.Popup>Content</Drawer.Popup>
      </Drawer.Root>
    ))

    expect(getByRole("dialog")).toBeInTheDocument()
  })

  // =========================================================================
  // data-side attribute (Drawer-specific)
  // =========================================================================

  it("renders with data-side='right' by default", () => {
    const { getByRole } = render(() => (
      <Drawer.Root open>
        <Drawer.Popup>Content</Drawer.Popup>
      </Drawer.Root>
    ))

    expect(getByRole("dialog")).toHaveAttribute("data-side", "right")
  })

  it("renders with data-side='left' when side is left", () => {
    const { getByRole } = render(() => (
      <Drawer.Root open side="left">
        <Drawer.Popup>Content</Drawer.Popup>
      </Drawer.Root>
    ))

    expect(getByRole("dialog")).toHaveAttribute("data-side", "left")
  })

  it("renders with data-side='bottom' when side is bottom", () => {
    const { getByRole } = render(() => (
      <Drawer.Root open side="bottom">
        <Drawer.Popup>Content</Drawer.Popup>
      </Drawer.Root>
    ))

    expect(getByRole("dialog")).toHaveAttribute("data-side", "bottom")
  })

  it("renders with data-side='top' when side is top", () => {
    const { getByRole } = render(() => (
      <Drawer.Root open side="top">
        <Drawer.Popup>Content</Drawer.Popup>
      </Drawer.Root>
    ))

    expect(getByRole("dialog")).toHaveAttribute("data-side", "top")
  })

  // =========================================================================
  // data-expanded / data-closed (inherited from Dialog)
  // =========================================================================

  it("renders with data-expanded when open", () => {
    const { getByRole } = render(() => (
      <Drawer.Root open>
        <Drawer.Popup>Content</Drawer.Popup>
      </Drawer.Root>
    ))

    expect(getByRole("dialog")).toHaveAttribute("data-expanded", "")
  })

  // =========================================================================
  // Swipe CSS variables
  // =========================================================================

  it("sets swipe CSS variables on the popup", () => {
    const { getByRole } = render(() => (
      <Drawer.Root open>
        <Drawer.Popup>Content</Drawer.Popup>
      </Drawer.Root>
    ))

    const popup = getByRole("dialog")
    const style = popup.getAttribute("style") ?? ""

    expect(style).toContain("--drawer-swipe-movement-x: 0px")
    expect(style).toContain("--drawer-swipe-movement-y: 0px")
  })

  // =========================================================================
  // Open / close behavior
  // =========================================================================

  it("opens when trigger is clicked", async () => {
    const { getByRole, queryByRole } = render(() => (
      <Drawer.Root modal={false}>
        <Drawer.Trigger>Open</Drawer.Trigger>
        <Drawer.Popup>Content</Drawer.Popup>
      </Drawer.Root>
    ))

    expect(queryByRole("dialog")).toBeNull()

    fireEvent.click(getByRole("button"))
    await Promise.resolve()

    expect(getByRole("dialog")).toBeInTheDocument()
  })

  it("closes when close button is clicked", async () => {
    const onOpenChange = vi.fn()

    const { getByTestId } = render(() => (
      <Drawer.Root open onOpenChange={onOpenChange}>
        <Drawer.Popup>
          <Drawer.Close data-testid="close">Close</Drawer.Close>
        </Drawer.Popup>
      </Drawer.Root>
    ))

    fireEvent.click(getByTestId("close"))
    await Promise.resolve()

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it("closes when escape key is pressed", async () => {
    const onOpenChange = vi.fn()

    const { getByRole } = render(() => (
      <Drawer.Root open onOpenChange={onOpenChange}>
        <Drawer.Popup>Content</Drawer.Popup>
      </Drawer.Root>
    ))

    fireEvent.keyDown(getByRole("dialog"), { key: "Escape" })
    await Promise.resolve()

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  // =========================================================================
  // Controlled state
  // =========================================================================

  it("supports controlled open state", () => {
    const { getByRole } = render(() => (
      <Drawer.Root open>
        <Drawer.Popup>Content</Drawer.Popup>
      </Drawer.Root>
    ))

    expect(getByRole("dialog")).toBeInTheDocument()
  })

  it("supports uncontrolled default open state", () => {
    const { getByRole } = render(() => (
      <Drawer.Root defaultOpen>
        <Drawer.Popup>Content</Drawer.Popup>
      </Drawer.Root>
    ))

    expect(getByRole("dialog")).toBeInTheDocument()
  })

  // =========================================================================
  // Backdrop
  // =========================================================================

  it("renders backdrop when open", () => {
    const { getByTestId } = render(() => (
      <Drawer.Root open>
        <Drawer.Backdrop data-testid="backdrop" />
        <Drawer.Popup>Content</Drawer.Popup>
      </Drawer.Root>
    ))

    expect(getByTestId("backdrop")).toBeInTheDocument()
  })

  // =========================================================================
  // Trigger ARIA attributes
  // =========================================================================

  it("trigger has correct aria attributes when closed", () => {
    const { getByRole } = render(() => (
      <Drawer.Root>
        <Drawer.Trigger>Open</Drawer.Trigger>
        <Drawer.Popup>Content</Drawer.Popup>
      </Drawer.Root>
    ))

    const trigger = getByRole("button")
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("trigger has correct aria attributes when open", () => {
    const { getByRole } = render(() => (
      <Drawer.Root open>
        <Drawer.Trigger>Open</Drawer.Trigger>
        <Drawer.Popup>Content</Drawer.Popup>
      </Drawer.Root>
    ))

    // When modal dialog is open, trigger gets aria-hidden from createHideOutside
    const trigger = getByRole("button", { hidden: true })
    expect(trigger).toHaveAttribute("aria-expanded", "true")
  })

  // =========================================================================
  // Non-modal
  // =========================================================================

  it("supports non-modal mode", () => {
    const { getByRole } = render(() => (
      <Drawer.Root open modal={false}>
        <Drawer.Popup>Content</Drawer.Popup>
      </Drawer.Root>
    ))

    expect(getByRole("dialog")).toBeInTheDocument()
  })
})
