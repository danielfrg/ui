import { fireEvent, render } from "@solidjs/testing-library"
import { vi } from "vitest"

import * as NumberField from "."

describe("NumberField", () => {
  it("can have a default value", () => {
    const { getByRole } = render(() => (
      <NumberField.Root defaultValue={4}>
        <NumberField.Label>Favorite Number</NumberField.Label>
        <NumberField.Input />
      </NumberField.Root>
    ))

    const input = getByRole("spinbutton") as HTMLInputElement
    expect(input.value).toBe("4")
  })

  it("name can be controlled", () => {
    const { getByTestId } = render(() => (
      <NumberField.Root name="favorite-number">
        <NumberField.Label>Favorite Number</NumberField.Label>
        <NumberField.HiddenInput data-testId="hidden-input" />
      </NumberField.Root>
    ))

    const input = getByTestId("hidden-input") as HTMLInputElement
    expect(input).toHaveAttribute("name", "favorite-number")
  })

  it("supports visible label", () => {
    const { getByRole, getByText } = render(() => (
      <NumberField.Root>
        <NumberField.Label>Favorite Number</NumberField.Label>
        <NumberField.Input />
      </NumberField.Root>
    ))

    const input = getByRole("spinbutton") as HTMLInputElement
    const label = getByText("Favorite Number")

    expect(input).toHaveAttribute("aria-labelledby", label.id)
    expect(label).toBeInstanceOf(HTMLLabelElement)
    expect(label).toHaveAttribute("for", input.id)
  })

  it("supports 'aria-label'", () => {
    const { getByRole } = render(() => (
      <NumberField.Root>
        <NumberField.Input aria-label="My Favorite Number" />
      </NumberField.Root>
    ))

    const input = getByRole("spinbutton") as HTMLInputElement
    expect(input).toHaveAttribute("aria-label", "My Favorite Number")
  })

  it("supports visible description", () => {
    const { getByRole, getByText } = render(() => (
      <NumberField.Root>
        <NumberField.Input />
        <NumberField.Description>Description</NumberField.Description>
      </NumberField.Root>
    ))

    const input = getByRole("spinbutton") as HTMLInputElement
    const description = getByText("Description")

    expect(description.id).toBeDefined()
    expect(input.id).toBeDefined()
    expect(input).toHaveAttribute("aria-describedby", description.id)
    expect(description.id).not.toBe(input.id)
  })

  it("increments on arrow up", () => {
    const { getByRole } = render(() => (
      <NumberField.Root defaultValue={4}>
        <NumberField.Input />
      </NumberField.Root>
    ))

    const input = getByRole("spinbutton") as HTMLInputElement
    fireEvent.keyDown(input, { key: "ArrowUp" })

    expect(input.value).toBe("5")
  })

  it("decrements on arrow down", () => {
    const { getByRole } = render(() => (
      <NumberField.Root defaultValue={4}>
        <NumberField.Input />
      </NumberField.Root>
    ))

    const input = getByRole("spinbutton") as HTMLInputElement
    fireEvent.keyDown(input, { key: "ArrowDown" })

    expect(input.value).toBe("3")
  })
})
