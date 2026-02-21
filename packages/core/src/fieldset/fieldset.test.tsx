import { render } from "@solidjs/testing-library"

import * as Fieldset from "."

describe("Fieldset", () => {
  it("renders as a fieldset by default", () => {
    const { getByRole } = render(() => (
      <Fieldset.Root>
        <Fieldset.Legend>Personal Info</Fieldset.Legend>
      </Fieldset.Root>
    ))

    // <fieldset> has implicit role "group"
    const el = getByRole("group")
    expect(el.tagName).toBe("FIELDSET")
  })

  it("renders legend as a legend element", () => {
    const { getByText } = render(() => (
      <Fieldset.Root>
        <Fieldset.Legend>Personal Info</Fieldset.Legend>
      </Fieldset.Root>
    ))

    const legend = getByText("Personal Info")
    expect(legend.tagName).toBe("LEGEND")
  })

  it("sets disabled attribute when disabled", () => {
    const { getByRole } = render(() => (
      <Fieldset.Root disabled>
        <Fieldset.Legend>Info</Fieldset.Legend>
      </Fieldset.Root>
    ))

    expect(getByRole("group")).toHaveAttribute("disabled")
  })

  it("sets data-disabled when disabled", () => {
    const { getByRole } = render(() => (
      <Fieldset.Root disabled>
        <Fieldset.Legend>Info</Fieldset.Legend>
      </Fieldset.Root>
    ))

    expect(getByRole("group")).toHaveAttribute("data-disabled", "")
  })

  it("does not set disabled or data-disabled when not disabled", () => {
    const { getByRole } = render(() => (
      <Fieldset.Root>
        <Fieldset.Legend>Info</Fieldset.Legend>
      </Fieldset.Root>
    ))

    const el = getByRole("group")
    expect(el).not.toHaveAttribute("disabled")
    expect(el).not.toHaveAttribute("data-disabled")
  })

  it("renders children", () => {
    const { getByTestId } = render(() => (
      <Fieldset.Root>
        <Fieldset.Legend>Info</Fieldset.Legend>
        <div data-testid="child">Content</div>
      </Fieldset.Root>
    ))

    expect(getByTestId("child")).toBeInTheDocument()
  })

  it("passes through additional props", () => {
    const { getByRole } = render(() => (
      <Fieldset.Root class="my-fieldset" id="fs1">
        <Fieldset.Legend>Info</Fieldset.Legend>
      </Fieldset.Root>
    ))

    const el = getByRole("group")
    expect(el).toHaveClass("my-fieldset")
    expect(el).toHaveAttribute("id", "fs1")
  })

  it("passes through additional props to legend", () => {
    const { getByText } = render(() => (
      <Fieldset.Root>
        <Fieldset.Legend class="my-legend">Title</Fieldset.Legend>
      </Fieldset.Root>
    ))

    expect(getByText("Title")).toHaveClass("my-legend")
  })
})
