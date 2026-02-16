// @ts-nocheck
/*
 * Portions of this file are based on code from react-spectrum.
 * Apache License Version 2.0, Copyright 2020 Adobe.
 *
 * Credits to the React Spectrum team:
 * https://github.com/adobe/react-spectrum/blob/703ab7b4559ecd4fc611e7f2c0e758867990fe01/packages/@react-spectrum/tabs/test/Tabs.test.js
 */

import { fireEvent, render, within } from "@solidjs/testing-library"
import { vi } from "vitest"

import { installPointerEvent } from "../test-utils"
import * as Tabs from "."

describe("Tabs", () => {
  installPointerEvent()

  const onValueChangeSpy = vi.fn()

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it("renders properly", async () => {
    const { getByRole } = render(() => (
      <Tabs.Root>
        <Tabs.List>
          <Tabs.Trigger value="one">One</Tabs.Trigger>
          <Tabs.Trigger value="two">Two</Tabs.Trigger>
          <Tabs.Trigger value="three">Three</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="one">Body 1</Tabs.Content>
        <Tabs.Content value="two">Body 2</Tabs.Content>
        <Tabs.Content value="three">Body 3</Tabs.Content>
      </Tabs.Root>
    ))

    const tablist = getByRole("tablist")
    expect(tablist).toBeTruthy()
    expect(tablist).toHaveAttribute("aria-orientation", "horizontal")

    const tabs = within(tablist).getAllByRole("tab")
    expect(tabs.length).toBe(3)

    for (const tab of tabs) {
      expect(tab).toHaveAttribute("tabindex")
      expect(tab).toHaveAttribute("aria-selected")
      const isSelected = tab.getAttribute("aria-selected") === "true"

      if (isSelected) {
        expect(tab).toHaveAttribute("aria-controls")

        const tabpanel = document.getElementById(tab.getAttribute("aria-controls")!)
        expect(tabpanel).toBeTruthy()
        expect(tabpanel).toHaveAttribute("aria-labelledby", tab.id)
        expect(tabpanel).toHaveAttribute("role", "tabpanel")
        expect(tabpanel).toHaveTextContent("Body 1")
      }
    }
  })

  it("allows user to change tab item select via left/right arrow keys with horizontal tabs", async () => {
    const { getByRole } = render(() => (
      <Tabs.Root>
        <Tabs.List>
          <Tabs.Trigger value="one">One</Tabs.Trigger>
          <Tabs.Trigger value="two">Two</Tabs.Trigger>
          <Tabs.Trigger value="three">Three</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="one">Body 1</Tabs.Content>
        <Tabs.Content value="two">Body 2</Tabs.Content>
        <Tabs.Content value="three">Body 3</Tabs.Content>
      </Tabs.Root>
    ))

    const tablist = getByRole("tablist")
    const tabs = within(tablist).getAllByRole("tab")
    const selectedItem = tabs[0]

    expect(tablist).toHaveAttribute("aria-orientation", "horizontal")

    expect(selectedItem).toHaveAttribute("aria-selected", "true")
    selectedItem.focus()

    fireEvent.keyDown(selectedItem, {
      key: "ArrowRight",
      code: 39,
      charCode: 39,
    })
    await Promise.resolve()

    const nextSelectedItem = tabs[1]
    expect(nextSelectedItem).toHaveAttribute("aria-selected", "true")

    fireEvent.keyDown(nextSelectedItem, {
      key: "ArrowLeft",
      code: 37,
      charCode: 37,
    })
    await Promise.resolve()

    expect(selectedItem).toHaveAttribute("aria-selected", "true")

    /** Doesn't change selection because its horizontal tabs. */
    fireEvent.keyDown(selectedItem, { key: "ArrowUp", code: 38, charCode: 38 })
    await Promise.resolve()

    expect(selectedItem).toHaveAttribute("aria-selected", "true")

    fireEvent.keyDown(selectedItem, {
      key: "ArrowDown",
      code: 40,
      charCode: 40,
    })
    await Promise.resolve()

    expect(selectedItem).toHaveAttribute("aria-selected", "true")
  })

  it("allows user to change tab item select via up/down arrow keys with vertical tabs", async () => {
    const { getByRole } = render(() => (
      <Tabs.Root orientation="vertical">
        <Tabs.List>
          <Tabs.Trigger value="one">One</Tabs.Trigger>
          <Tabs.Trigger value="two">Two</Tabs.Trigger>
          <Tabs.Trigger value="three">Three</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="one">Body 1</Tabs.Content>
        <Tabs.Content value="two">Body 2</Tabs.Content>
        <Tabs.Content value="three">Body 3</Tabs.Content>
      </Tabs.Root>
    ))

    const tablist = getByRole("tablist")
    const tabs = within(tablist).getAllByRole("tab")
    const selectedItem = tabs[0]

    selectedItem.focus()

    expect(tablist).toHaveAttribute("aria-orientation", "vertical")

    /** Doesn't change selection because its vertical tabs. */
    expect(selectedItem).toHaveAttribute("aria-selected", "true")

    fireEvent.keyDown(selectedItem, {
      key: "ArrowRight",
      code: 39,
      charCode: 39,
    })
    await Promise.resolve()

    expect(selectedItem).toHaveAttribute("aria-selected", "true")

    fireEvent.keyDown(selectedItem, {
      key: "ArrowLeft",
      code: 37,
      charCode: 37,
    })
    await Promise.resolve()

    expect(selectedItem).toHaveAttribute("aria-selected", "true")

    const nextSelectedItem = tabs[1]

    fireEvent.keyDown(selectedItem, {
      key: "ArrowDown",
      code: 40,
      charCode: 40,
    })
    await Promise.resolve()

    expect(nextSelectedItem).toHaveAttribute("aria-selected", "true")

    fireEvent.keyDown(nextSelectedItem, {
      key: "ArrowUp",
      code: 38,
      charCode: 38,
    })
    await Promise.resolve()

    expect(selectedItem).toHaveAttribute("aria-selected", "true")
  })

  it("wraps focus from first to last/last to first item", async () => {
    const { getByRole } = render(() => (
      <Tabs.Root>
        <Tabs.List>
          <Tabs.Trigger value="one">One</Tabs.Trigger>
          <Tabs.Trigger value="two">Two</Tabs.Trigger>
          <Tabs.Trigger value="three">Three</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="one">Body 1</Tabs.Content>
        <Tabs.Content value="two">Body 2</Tabs.Content>
        <Tabs.Content value="three">Body 3</Tabs.Content>
      </Tabs.Root>
    ))

    const tablist = getByRole("tablist")
    const tabs = within(tablist).getAllByRole("tab")
    const firstItem = tabs[0]

    firstItem.focus()

    expect(tablist).toHaveAttribute("aria-orientation", "horizontal")

    expect(firstItem).toHaveAttribute("aria-selected", "true")

    fireEvent.keyDown(firstItem, { key: "ArrowLeft", code: 37, charCode: 37 })
    await Promise.resolve()

    const lastItem = tabs[tabs.length - 1]

    expect(lastItem).toHaveAttribute("aria-selected", "true")

    fireEvent.keyDown(lastItem, { key: "ArrowRight", code: 39, charCode: 39 })
    await Promise.resolve()

    expect(firstItem).toHaveAttribute("aria-selected", "true")
  })

  it("select last item via end key / select first item via home key", async () => {
    const { getByRole } = render(() => (
      <Tabs.Root>
        <Tabs.List>
          <Tabs.Trigger value="one">One</Tabs.Trigger>
          <Tabs.Trigger value="two">Two</Tabs.Trigger>
          <Tabs.Trigger value="three">Three</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="one">Body 1</Tabs.Content>
        <Tabs.Content value="two">Body 2</Tabs.Content>
        <Tabs.Content value="three">Body 3</Tabs.Content>
      </Tabs.Root>
    ))

    const tablist = getByRole("tablist")
    const tabs = within(tablist).getAllByRole("tab")
    const firstItem = tabs[0]

    firstItem.focus()

    expect(tablist).toHaveAttribute("aria-orientation", "horizontal")

    expect(firstItem).toHaveAttribute("aria-selected", "true")

    fireEvent.keyDown(firstItem, { key: "End", code: 35, charCode: 35 })
    await Promise.resolve()

    const lastItem = tabs[tabs.length - 1]

    expect(lastItem).toHaveAttribute("aria-selected", "true")

    fireEvent.keyDown(lastItem, { key: "Home", code: 36, charCode: 36 })
    await Promise.resolve()

    expect(firstItem).toHaveAttribute("aria-selected", "true")
  })

  it("does not select via left / right keys if 'activationMode' is manual, select on enter / spacebar", async () => {
    const { getByRole } = render(() => (
      <Tabs.Root activationMode="manual" defaultValue="one" onChange={onValueChangeSpy}>
        <Tabs.List>
          <Tabs.Trigger value="one">One</Tabs.Trigger>
          <Tabs.Trigger value="two">Two</Tabs.Trigger>
          <Tabs.Trigger value="three">Three</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="one">Body 1</Tabs.Content>
        <Tabs.Content value="two">Body 2</Tabs.Content>
        <Tabs.Content value="three">Body 3</Tabs.Content>
      </Tabs.Root>
    ))

    const tablist = getByRole("tablist")
    const tabs = within(tablist).getAllByRole("tab")
    const [firstItem, secondItem, thirdItem] = tabs

    firstItem.focus()

    expect(firstItem).toHaveAttribute("aria-selected", "true")

    fireEvent.keyDown(firstItem, { key: "ArrowRight", code: 39, charCode: 39 })
    await Promise.resolve()

    expect(secondItem).toHaveAttribute("aria-selected", "false")
    expect(document.activeElement).toBe(secondItem)

    fireEvent.keyDown(secondItem, {
      key: "ArrowRight",
      code: 39,
      charCode: 39,
    })
    await Promise.resolve()

    expect(thirdItem).toHaveAttribute("aria-selected", "false")
    expect(document.activeElement).toBe(thirdItem)

    fireEvent.keyDown(thirdItem, { key: "Enter", code: 13, charCode: 13 })
    await Promise.resolve()

    expect(firstItem).toHaveAttribute("aria-selected", "false")
    expect(secondItem).toHaveAttribute("aria-selected", "false")
    expect(thirdItem).toHaveAttribute("aria-selected", "true")
    expect(onValueChangeSpy).toBeCalledTimes(1)
  })

  it("supports using click to change tab", async () => {
    const onValueChangeSpy = vi.fn()

    const { getByRole } = render(() => (
      <Tabs.Root defaultValue="one" onChange={onValueChangeSpy}>
        <Tabs.List>
          <Tabs.Trigger value="one">One</Tabs.Trigger>
          <Tabs.Trigger value="two">Two</Tabs.Trigger>
          <Tabs.Trigger value="three">Three</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="one">Body 1</Tabs.Content>
        <Tabs.Content value="two">Body 2</Tabs.Content>
        <Tabs.Content value="three">Body 3</Tabs.Content>
      </Tabs.Root>
    ))

    const tablist = getByRole("tablist")
    const tabs = within(tablist).getAllByRole("tab")
    const [firstItem, secondItem] = tabs

    expect(firstItem).toHaveAttribute("aria-selected", "true")

    fireEvent.pointerDown(secondItem, { pointerId: 1, pointerType: "mouse" })
    await Promise.resolve()

    fireEvent.pointerUp(secondItem, { pointerId: 1, pointerType: "mouse" })
    await Promise.resolve()

    expect(secondItem).toHaveAttribute("aria-selected", "true")
    expect(secondItem).toHaveAttribute("aria-controls")

    const tabpanel = document.getElementById(secondItem.getAttribute("aria-controls")!)

    expect(tabpanel).toBeTruthy()
    expect(tabpanel).toHaveAttribute("aria-labelledby", secondItem.id)
    expect(tabpanel).toHaveAttribute("role", "tabpanel")
    expect(tabpanel).toHaveTextContent("Body 2")
    expect(onValueChangeSpy).toBeCalledTimes(1)
  })

  it("fires onValueChange when clicking on the current tab", async () => {
    const { getByRole } = render(() => (
      <Tabs.Root defaultValue="one" onChange={onValueChangeSpy}>
        <Tabs.List>
          <Tabs.Trigger value="one">One</Tabs.Trigger>
          <Tabs.Trigger value="two">Two</Tabs.Trigger>
          <Tabs.Trigger value="three">Three</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="one">Body 1</Tabs.Content>
        <Tabs.Content value="two">Body 2</Tabs.Content>
        <Tabs.Content value="three">Body 3</Tabs.Content>
      </Tabs.Root>
    ))

    const tablist = getByRole("tablist")
    const tabs = within(tablist).getAllByRole("tab")
    const firstItem = tabs[0]

    expect(firstItem).toHaveAttribute("aria-selected", "true")

    fireEvent.pointerDown(firstItem, { pointerId: 1, pointerType: "mouse" })
    await Promise.resolve()

    expect(onValueChangeSpy).toBeCalledTimes(1)
    expect(onValueChangeSpy).toHaveBeenCalledWith("one")
  })
})
