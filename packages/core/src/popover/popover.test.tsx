import { render, fireEvent } from "@solidjs/testing-library"

import * as Popover from "."

describe("Popover", () => {
  it("renders trigger button", () => {
    const { getByRole } = render(() => (
      <Popover.Root>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
        </Popover.Content>
      </Popover.Root>
    ))

    const trigger = getByRole("button")
    expect(trigger).toHaveTextContent("Open")
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("opens on trigger click and shows dialog", async () => {
    const { getByRole, queryByRole } = render(() => (
      <Popover.Root>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
        </Popover.Content>
      </Popover.Root>
    ))

    expect(queryByRole("dialog")).toBeNull()

    fireEvent.click(getByRole("button"))
    await Promise.resolve()

    const dialog = getByRole("dialog")
    expect(dialog).toBeInTheDocument()
  })

  it("supports controlled open state", () => {
    const { getByRole } = render(() => (
      <Popover.Root open forceMount>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
        </Popover.Content>
      </Popover.Root>
    ))

    expect(getByRole("dialog")).toBeInTheDocument()
    expect(getByRole("button")).toHaveAttribute("aria-expanded", "true")
  })

  it("should be labelled by its popover title", () => {
    const { getByRole, getByTestId } = render(() => (
      <Popover.Root open forceMount>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>
          <Popover.Title data-testid="title">Title</Popover.Title>
        </Popover.Content>
      </Popover.Root>
    ))

    const panel = getByRole("dialog")
    const title = getByTestId("title")

    expect(panel).toHaveAttribute("aria-labelledby", title.id)
  })

  it("should be described by its popover description", () => {
    const { getByRole, getByTestId } = render(() => (
      <Popover.Root open forceMount>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>
          <Popover.Description data-testid="description">Description</Popover.Description>
        </Popover.Content>
      </Popover.Root>
    ))

    const panel = getByRole("dialog")
    const description = getByTestId("description")

    expect(panel).toHaveAttribute("aria-describedby", description.id)
  })

  it("closes when close button is clicked", async () => {
    const { getByRole, getByTestId } = render(() => (
      <Popover.Root>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.CloseButton data-testid="close">Close</Popover.CloseButton>
        </Popover.Content>
      </Popover.Root>
    ))

    fireEvent.click(getByRole("button"))
    await Promise.resolve()

    expect(getByRole("dialog")).toBeInTheDocument()
    expect(getByRole("button", { name: "Open" })).toHaveAttribute("aria-expanded", "true")

    fireEvent.click(getByTestId("close"))
    await Promise.resolve()

    expect(getByRole("button", { name: "Open" })).toHaveAttribute("aria-expanded", "false")
  })
})
