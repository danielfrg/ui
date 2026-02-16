/*
 * Portions of this file are based on code from radix-ui-primitives.
 * MIT Licensed, Copyright (c) 2022 WorkOS.
 *
 * Credits to the Radix UI team:
 * https://github.com/radix-ui/primitives/blob/21a7c97dc8efa79fecca36428eec49f187294085/packages/react/accordion/src/Accordion.test.tsx
 */

import { installPointerEvent } from "../test-utils"
import { fireEvent, render, within } from "@solidjs/testing-library"
import { type ComponentProps, For } from "solid-js"
import { vi } from "vitest"

import * as Accordion from "."

function AccordionTest(props: ComponentProps<typeof Accordion.Root>) {
  return (
    <Accordion.Root data-testid="container" {...props}>
      <For each={["one", "two", "three"]}>
        {(val) => (
          <Accordion.Item value={val} data-testid={`item-${val}`}>
            <Accordion.Header data-testid={`header-${val}`}>
              <Accordion.Trigger>Trigger {val}</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>Content {val}</Accordion.Content>
          </Accordion.Item>
        )}
      </For>
    </Accordion.Root>
  )
}

describe("Accordion", () => {
  installPointerEvent()

  it("renders properly", () => {
    const { getAllByRole } = render(() => <AccordionTest defaultValue={["one"]} />)

    const items = getAllByRole("heading")
    expect(items.length).toBe(3)

    for (const item of items) {
      const button = within(item).getByRole("button")
      expect(button).toHaveAttribute("aria-expanded")

      if (button.getAttribute("aria-expanded") === "true") {
        expect(button).toHaveAttribute("aria-controls")

        const region = document.getElementById(button.getAttribute("aria-controls")!)
        expect(region).toBeTruthy()
        expect(region).toHaveAttribute("aria-labelledby", button.id)
        expect(region).toHaveAttribute("role", "region")
        expect(region).toHaveTextContent("Content one")
      }
    }
  })

  it("can have default expanded value", async () => {
    const { getAllByRole, getByText } = render(() => <AccordionTest defaultValue={["one"]} />)

    const buttons = getAllByRole("button")
    const firstItem = buttons[0]!
    const contentOne = getByText("Content one")

    expect(firstItem).toHaveAttribute("aria-expanded", "true")
    expect(contentOne).toBeVisible()
  })

  it("can be controlled", async () => {
    const onChangeSpy = vi.fn()

    const { getAllByRole, getByText } = render(() => <AccordionTest value={["one"]} onChange={onChangeSpy} />)

    const buttons = getAllByRole("button")
    const firstItem = buttons[0]!
    const secondItem = buttons[1]!
    const contentOne = getByText("Content one")

    expect(firstItem).toHaveAttribute("aria-expanded", "true")
    expect(contentOne).toBeVisible()
    expect(secondItem).toHaveAttribute("aria-expanded", "false")

    fireEvent.click(secondItem)
    await Promise.resolve()

    expect(onChangeSpy).toHaveBeenCalledWith(["two"])
    expect(onChangeSpy).toHaveBeenCalledTimes(1)

    // First item is still expanded because Accordion is controlled.
    expect(firstItem).toHaveAttribute("aria-expanded", "true")
    expect(contentOne).toBeVisible()
    expect(secondItem).toHaveAttribute("aria-expanded", "false")
  })

  it("should toggle between different accordion items when clicking a trigger", async () => {
    const { getAllByRole, getByText } = render(() => <AccordionTest />)

    const buttons = getAllByRole("button")
    const firstItem = buttons[0]!
    const secondItem = buttons[1]!

    fireEvent.click(firstItem)
    await Promise.resolve()

    const contentOne = getByText("Content one")
    expect(firstItem).toHaveAttribute("aria-expanded", "true")
    expect(contentOne).toBeVisible()

    fireEvent.click(secondItem)
    await Promise.resolve()

    expect(firstItem).toHaveAttribute("aria-expanded", "false")

    const contentTwo = getByText("Content two")
    expect(secondItem).toHaveAttribute("aria-expanded", "true")
    expect(contentTwo).toBeVisible()
  })

  it("should not toggle the same accordion item when clicking its trigger by default", async () => {
    const { getAllByRole, getByText } = render(() => <AccordionTest />)

    const buttons = getAllByRole("button")
    const firstItem = buttons[0]!

    fireEvent.click(firstItem)
    await Promise.resolve()

    const contentOne = getByText("Content one")
    expect(firstItem).toHaveAttribute("aria-expanded", "true")
    expect(contentOne).toBeVisible()

    fireEvent.click(firstItem)
    await Promise.resolve()

    // Stay expanded because Accordion is not `multiple` or `collapsible`.
    expect(firstItem).toHaveAttribute("aria-expanded", "true")
    expect(contentOne).toBeVisible()
  })

  it("should call 'onChange' when clicking a trigger", async () => {
    const onChangeSpy = vi.fn()

    const { getAllByRole } = render(() => <AccordionTest onChange={onChangeSpy} />)

    const buttons = getAllByRole("button")
    const firstItem = buttons[0]!
    const secondItem = buttons[1]!

    fireEvent.click(firstItem)
    await Promise.resolve()

    expect(onChangeSpy).toHaveBeenCalledWith(["one"])

    fireEvent.click(firstItem)
    await Promise.resolve()

    // Called once because Accordion is not `multiple` or `collapsible`.
    expect(onChangeSpy).toHaveBeenCalledTimes(1)

    fireEvent.click(secondItem)
    await Promise.resolve()

    expect(onChangeSpy).toHaveBeenCalledWith(["two"])
    expect(onChangeSpy).toHaveBeenCalledTimes(2)
  })

  describe("collapsible", () => {
    it("should toggle the same accordion item when clicking its trigger if collapsible", async () => {
      const { getAllByRole, getByText } = render(() => <AccordionTest collapsible defaultValue={["one"]} />)

      const buttons = getAllByRole("button")
      const firstItem = buttons[0]!

      expect(firstItem).toHaveAttribute("aria-expanded", "true")
      expect(getByText("Content one")).toBeVisible()

      fireEvent.click(firstItem)
      await Promise.resolve()

      expect(firstItem).toHaveAttribute("aria-expanded", "false")

      fireEvent.click(firstItem)
      await Promise.resolve()

      expect(firstItem).toHaveAttribute("aria-expanded", "true")
      expect(getByText("Content one")).toBeVisible()
    })

    it("should allow users to open and close accordion item with enter key when collapsible", async () => {
      const { getAllByRole, getByText } = render(() => <AccordionTest collapsible defaultValue={["one"]} />)

      const buttons = getAllByRole("button")
      const firstItem = buttons[0]!

      expect(firstItem).toHaveAttribute("aria-expanded", "true")
      expect(getByText("Content one")).toBeVisible()

      firstItem.focus()
      expect(document.activeElement).toBe(firstItem)

      fireEvent.keyDown(firstItem, { key: "Enter" })
      fireEvent.keyUp(firstItem, { key: "Enter" })
      await Promise.resolve()

      expect(firstItem).toHaveAttribute("aria-expanded", "false")

      fireEvent.keyDown(firstItem, { key: "Enter" })
      fireEvent.keyUp(firstItem, { key: "Enter" })
      await Promise.resolve()

      expect(firstItem).toHaveAttribute("aria-expanded", "true")
      expect(getByText("Content one")).toBeVisible()
    })
  })

  describe("multiple", () => {
    it("should expand multiple accordion items when clicking triggers", async () => {
      const { getAllByRole, getByText } = render(() => <AccordionTest multiple />)

      const buttons = getAllByRole("button")
      const firstItem = buttons[0]!
      const secondItem = buttons[1]!

      fireEvent.click(firstItem)
      await Promise.resolve()

      const contentOne = getByText("Content one")
      expect(firstItem).toHaveAttribute("aria-expanded", "true")
      expect(contentOne).toBeVisible()

      fireEvent.click(secondItem)
      await Promise.resolve()

      const contentTwo = getByText("Content two")
      expect(secondItem).toHaveAttribute("aria-expanded", "true")
      expect(contentTwo).toBeVisible()

      // Content one stays expanded
      expect(firstItem).toHaveAttribute("aria-expanded", "true")
      expect(contentOne).toBeVisible()
    })

    it("should toggle the same accordion item when clicking its trigger if multiple", async () => {
      const { getAllByRole, getByText } = render(() => <AccordionTest multiple defaultValue={["one"]} />)

      const buttons = getAllByRole("button")
      const firstItem = buttons[0]!

      expect(firstItem).toHaveAttribute("aria-expanded", "true")
      expect(getByText("Content one")).toBeVisible()

      fireEvent.click(firstItem)
      await Promise.resolve()

      expect(firstItem).toHaveAttribute("aria-expanded", "false")

      fireEvent.click(firstItem)
      await Promise.resolve()

      expect(firstItem).toHaveAttribute("aria-expanded", "true")
      expect(getByText("Content one")).toBeVisible()
    })

    it("should allow users to open and close accordion item with enter key when multiple", async () => {
      const { getAllByRole, getByText } = render(() => <AccordionTest multiple defaultValue={["one"]} />)

      const buttons = getAllByRole("button")
      const firstItem = buttons[0]!

      expect(firstItem).toHaveAttribute("aria-expanded", "true")
      expect(getByText("Content one")).toBeVisible()

      firstItem.focus()
      expect(document.activeElement).toBe(firstItem)

      fireEvent.keyDown(firstItem, { key: "Enter" })
      fireEvent.keyUp(firstItem, { key: "Enter" })
      await Promise.resolve()

      expect(firstItem).toHaveAttribute("aria-expanded", "false")

      fireEvent.keyDown(firstItem, { key: "Enter" })
      fireEvent.keyUp(firstItem, { key: "Enter" })
      await Promise.resolve()

      expect(firstItem).toHaveAttribute("aria-expanded", "true")
      expect(getByText("Content one")).toBeVisible()
    })

    it("should call 'onChange' when clicking triggers", async () => {
      const onChangeSpy = vi.fn()

      const { getAllByRole } = render(() => <AccordionTest multiple onChange={onChangeSpy} />)

      const buttons = getAllByRole("button")
      const firstItem = buttons[0]!
      const secondItem = buttons[1]!

      fireEvent.click(firstItem)
      await Promise.resolve()

      expect(onChangeSpy).toHaveBeenCalledWith(["one"])

      fireEvent.click(secondItem)
      await Promise.resolve()

      expect(onChangeSpy).toHaveBeenCalledWith(["one", "two"])

      expect(onChangeSpy).toHaveBeenCalledTimes(2)
    })
  })
})
