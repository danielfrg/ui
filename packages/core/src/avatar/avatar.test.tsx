/*
 * Portions of this file are based on code from radix-ui-primitives.
 * MIT Licensed, Copyright (c) 2022 WorkOS.
 *
 * Credits to the Radix UI team:
 * https://github.com/radix-ui/primitives/blob/21a7c97dc8efa79fecca36428eec49f187294085/packages/react/avatar/src/Avatar.test.tsx
 */

import { render } from "@solidjs/testing-library"

import * as Avatar from "."

const ROOT_TEST_ID = "avatar-root"
const FALLBACK_TEXT = "AB"
const IMAGE_ALT_TEXT = "Fake Image"
const DELAY = 300

describe("Avatar", () => {
  describe("with fallback and a working image", () => {
    const originalGlobalImage = window.Image

    beforeAll(() => {
      ;(window.Image as any) = class MockImage {
        onload: () => void = () => {}
        src = ""

        constructor() {
          setTimeout(() => {
            this.onload()
          }, DELAY)
        }
      }
    })

    afterAll(() => {
      window.Image = originalGlobalImage
    })

    it("should render the fallback initially", () => {
      const { queryByText } = render(() => (
        <Avatar.Root data-testid={ROOT_TEST_ID}>
          <Avatar.Fallback>{FALLBACK_TEXT}</Avatar.Fallback>
          <Avatar.Image src="/test.jpg" alt={IMAGE_ALT_TEXT} />
        </Avatar.Root>
      ))

      const fallback = queryByText(FALLBACK_TEXT)
      expect(fallback).toBeInTheDocument()
    })

    it("should not render the image initially", () => {
      const { queryByRole } = render(() => (
        <Avatar.Root data-testid={ROOT_TEST_ID}>
          <Avatar.Fallback>{FALLBACK_TEXT}</Avatar.Fallback>
          <Avatar.Image src="/test.jpg" alt={IMAGE_ALT_TEXT} />
        </Avatar.Root>
      ))

      const image = queryByRole("img")
      expect(image).not.toBeInTheDocument()
    })

    it("should render the image after it has loaded", async () => {
      const { findByRole } = render(() => (
        <Avatar.Root data-testid={ROOT_TEST_ID}>
          <Avatar.Fallback>{FALLBACK_TEXT}</Avatar.Fallback>
          <Avatar.Image src="/test.jpg" alt={IMAGE_ALT_TEXT} />
        </Avatar.Root>
      ))

      const image = await findByRole("img")
      expect(image).toBeInTheDocument()
    })

    it("should have alt text on the image", async () => {
      const { findByAltText } = render(() => (
        <Avatar.Root data-testid={ROOT_TEST_ID}>
          <Avatar.Fallback>{FALLBACK_TEXT}</Avatar.Fallback>
          <Avatar.Image src="/test.jpg" alt={IMAGE_ALT_TEXT} />
        </Avatar.Root>
      ))

      const image = await findByAltText(IMAGE_ALT_TEXT)
      expect(image).toBeInTheDocument()
    })
  })

  describe("with fallback and delayed render", () => {
    it("should not render a fallback immediately", () => {
      const { queryByText } = render(() => (
        <Avatar.Root data-testid={ROOT_TEST_ID} fallbackDelay={DELAY}>
          <Avatar.Fallback>{FALLBACK_TEXT}</Avatar.Fallback>
        </Avatar.Root>
      ))

      const fallback = queryByText(FALLBACK_TEXT)
      expect(fallback).not.toBeInTheDocument()
    })

    it("should render a fallback after the delay", async () => {
      const { queryByText, findByText } = render(() => (
        <Avatar.Root data-testid={ROOT_TEST_ID} fallbackDelay={DELAY}>
          <Avatar.Fallback>{FALLBACK_TEXT}</Avatar.Fallback>
        </Avatar.Root>
      ))

      let fallback = queryByText(FALLBACK_TEXT)
      expect(fallback).not.toBeInTheDocument()

      fallback = await findByText(FALLBACK_TEXT)
      expect(fallback).toBeInTheDocument()
    })
  })
})
