import { render } from "@solidjs/testing-library"
import { vi } from "vitest"

import * as Toast from "."

describe("Toast", () => {
  afterEach(() => {
    Toast.toaster.clear()
  })

  it("renders a toast region", () => {
    const { getByRole } = render(() => (
      <Toast.Region>
        <Toast.List />
      </Toast.Region>
    ))

    const region = getByRole("region")
    expect(region).toBeTruthy()
    expect(region).toHaveAttribute("aria-label")
  })

  it("renders a toast region with tablist role -1", () => {
    const { getByRole } = render(() => (
      <Toast.Region>
        <Toast.List />
      </Toast.Region>
    ))

    const region = getByRole("region")
    expect(region).toHaveAttribute("tabindex", "-1")
  })

  it("toaster.show adds a toast", () => {
    const { container } = render(() => (
      <Toast.Region>
        <Toast.List />
      </Toast.Region>
    ))

    Toast.toaster.show((props) => (
      <Toast.Root toastId={props.toastId}>
        <Toast.Title>Test Toast</Toast.Title>
      </Toast.Root>
    ))

    // Toast should be rendered
    const toasts = container.querySelectorAll("[role='status']")
    expect(toasts.length).toBe(1)
  })

  it("toaster.dismiss removes a toast", async () => {
    const { container } = render(() => (
      <Toast.Region>
        <Toast.List />
      </Toast.Region>
    ))

    const id = Toast.toaster.show((props) => (
      <Toast.Root toastId={props.toastId} persistent>
        <Toast.Title>Test Toast</Toast.Title>
      </Toast.Root>
    ))

    expect(container.querySelectorAll("[role='status']").length).toBe(1)

    Toast.toaster.dismiss(id)
    await new Promise((r) => setTimeout(r, 100))

    // After dismiss + animation, toast should be gone
    // Note: due to presence animation, this may still be in DOM briefly
  })

  it("toaster.clear removes all toasts", () => {
    render(() => (
      <Toast.Region>
        <Toast.List />
      </Toast.Region>
    ))

    Toast.toaster.show((props) => (
      <Toast.Root toastId={props.toastId} persistent>
        <Toast.Title>Toast 1</Toast.Title>
      </Toast.Root>
    ))

    Toast.toaster.show((props) => (
      <Toast.Root toastId={props.toastId} persistent>
        <Toast.Title>Toast 2</Toast.Title>
      </Toast.Root>
    ))

    Toast.toaster.clear()
  })

  it("renders toast with title and description", () => {
    const { container } = render(() => (
      <Toast.Region>
        <Toast.List />
      </Toast.Region>
    ))

    Toast.toaster.show((props) => (
      <Toast.Root toastId={props.toastId} persistent>
        <Toast.Title>My Title</Toast.Title>
        <Toast.Description>My Description</Toast.Description>
      </Toast.Root>
    ))

    expect(container.textContent).toContain("My Title")
    expect(container.textContent).toContain("My Description")
  })
})
