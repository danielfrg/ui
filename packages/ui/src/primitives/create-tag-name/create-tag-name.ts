import { isString } from "../../utils"
import { type Accessor, type Component, createEffect, createSignal } from "solid-js"

/**
 * Returns the tag name by parsing an element ref.
 */
export function createTagName(
  ref: Accessor<HTMLElement | undefined>,
  fallback?: Accessor<string | Component | undefined>,
) {
  const [tagName, setTagName] = createSignal(stringOrUndefined(fallback?.()))

  createEffect(() => {
    setTagName(ref()?.tagName.toLowerCase() || stringOrUndefined(fallback?.()))
  })

  return tagName
}

function stringOrUndefined(value: unknown) {
  return isString(value) ? value : undefined
}
