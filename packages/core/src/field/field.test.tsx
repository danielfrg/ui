import { render } from "@solidjs/testing-library"

import * as Field from "."

describe("Field", () => {
  it("renders as a div by default", () => {
    const { getByTestId } = render(() => (
      <Field.Root data-testid="field">
        <Field.Label>Name</Field.Label>
      </Field.Root>
    ))

    const el = getByTestId("field")
    expect(el.tagName).toBe("DIV")
  })

  it("renders label with for attribute pointing to field", () => {
    const { getByText } = render(() => (
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <input />
      </Field.Root>
    ))

    const label = getByText("Email")
    expect(label.tagName).toBe("LABEL")
  })

  it("renders description", () => {
    const { getByText } = render(() => (
      <Field.Root>
        <Field.Label>Name</Field.Label>
        <Field.Description>Enter your full name</Field.Description>
      </Field.Root>
    ))

    expect(getByText("Enter your full name")).toBeInTheDocument()
  })

  it("renders error message when validation state is invalid", () => {
    const { getByText } = render(() => (
      <Field.Root validationState="invalid">
        <Field.Label>Email</Field.Label>
        <Field.Error>Email is required</Field.Error>
      </Field.Root>
    ))

    expect(getByText("Email is required")).toBeInTheDocument()
  })

  it("does not render error message when validation state is valid", () => {
    const { queryByText } = render(() => (
      <Field.Root validationState="valid">
        <Field.Label>Email</Field.Label>
        <Field.Error>Email is required</Field.Error>
      </Field.Root>
    ))

    expect(queryByText("Email is required")).not.toBeInTheDocument()
  })

  it("does not render error message when no validation state is set", () => {
    const { queryByText } = render(() => (
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Error>Email is required</Field.Error>
      </Field.Root>
    ))

    expect(queryByText("Email is required")).not.toBeInTheDocument()
  })

  it("sets data-invalid when validationState is invalid", () => {
    const { getByTestId } = render(() => (
      <Field.Root data-testid="field" validationState="invalid">
        <Field.Label>Email</Field.Label>
      </Field.Root>
    ))

    expect(getByTestId("field")).toHaveAttribute("data-invalid", "")
  })

  it("sets data-valid when validationState is valid", () => {
    const { getByTestId } = render(() => (
      <Field.Root data-testid="field" validationState="valid">
        <Field.Label>Email</Field.Label>
      </Field.Root>
    ))

    expect(getByTestId("field")).toHaveAttribute("data-valid", "")
  })

  it("sets data-required when required", () => {
    const { getByTestId } = render(() => (
      <Field.Root data-testid="field" required>
        <Field.Label>Email</Field.Label>
      </Field.Root>
    ))

    expect(getByTestId("field")).toHaveAttribute("data-required", "")
  })

  it("sets data-disabled when disabled", () => {
    const { getByTestId } = render(() => (
      <Field.Root data-testid="field" disabled>
        <Field.Label>Email</Field.Label>
      </Field.Root>
    ))

    expect(getByTestId("field")).toHaveAttribute("data-disabled", "")
  })

  it("sets data-readonly when readOnly", () => {
    const { getByTestId } = render(() => (
      <Field.Root data-testid="field" readOnly>
        <Field.Label>Email</Field.Label>
      </Field.Root>
    ))

    expect(getByTestId("field")).toHaveAttribute("data-readonly", "")
  })

  it("does not set data attributes when no state props are provided", () => {
    const { getByTestId } = render(() => (
      <Field.Root data-testid="field">
        <Field.Label>Name</Field.Label>
      </Field.Root>
    ))

    const el = getByTestId("field")
    expect(el).not.toHaveAttribute("data-valid")
    expect(el).not.toHaveAttribute("data-invalid")
    expect(el).not.toHaveAttribute("data-required")
    expect(el).not.toHaveAttribute("data-disabled")
    expect(el).not.toHaveAttribute("data-readonly")
  })

  it("propagates data attributes to label", () => {
    const { getByText } = render(() => (
      <Field.Root validationState="invalid" required>
        <Field.Label>Email</Field.Label>
      </Field.Root>
    ))

    const label = getByText("Email")
    expect(label).toHaveAttribute("data-invalid", "")
    expect(label).toHaveAttribute("data-required", "")
  })

  it("propagates data attributes to description", () => {
    const { getByText } = render(() => (
      <Field.Root validationState="invalid" disabled>
        <Field.Description>Help text</Field.Description>
      </Field.Root>
    ))

    const desc = getByText("Help text")
    expect(desc).toHaveAttribute("data-invalid", "")
    expect(desc).toHaveAttribute("data-disabled", "")
  })

  it("propagates data attributes to error message", () => {
    const { getByText } = render(() => (
      <Field.Root validationState="invalid" required>
        <Field.Error>Error text</Field.Error>
      </Field.Root>
    ))

    const error = getByText("Error text")
    expect(error).toHaveAttribute("data-invalid", "")
    expect(error).toHaveAttribute("data-required", "")
  })

  it("renders error with forceMount regardless of validation state", () => {
    const { getByText } = render(() => (
      <Field.Root validationState="valid">
        <Field.Error forceMount>Forced error</Field.Error>
      </Field.Root>
    ))

    expect(getByText("Forced error")).toBeInTheDocument()
  })

  it("supports custom id", () => {
    const { getByText } = render(() => (
      <Field.Root id="my-field">
        <Field.Label>Name</Field.Label>
      </Field.Root>
    ))

    const label = getByText("Name")
    expect(label.id).toBe("my-field-label")
  })
})
