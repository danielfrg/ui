/*
 * Portions of this file are based on code from radix-ui-primitives.
 * MIT Licensed, Copyright (c) 2022 WorkOS.
 *
 * Credits to the Radix UI team:
 * https://github.com/radix-ui/primitives/blob/21a7c97dc8efa79fecca36428eec49f187294085/packages/react/avatar/src/Avatar.tsx
 */

import { Show, type ValidComponent, createEffect, createSignal, onCleanup } from "solid-js"

import { type ElementOf, Polymorphic, type PolymorphicProps } from "../polymorphic"
import { useAvatarContext } from "./avatar-context"

export interface AvatarFallbackOptions {}

export interface AvatarFallbackCommonProps<T extends HTMLElement = HTMLElement> {}

export interface AvatarFallbackRenderProps extends AvatarFallbackCommonProps {}

export type AvatarFallbackProps<T extends ValidComponent | HTMLElement = HTMLElement> = AvatarFallbackOptions &
  Partial<AvatarFallbackCommonProps<ElementOf<T>>>

/**
 * An element that renders when the image hasn't loaded.
 * This means whilst it's loading, or if there was an error.
 */
export function AvatarFallback<T extends ValidComponent = "span">(props: PolymorphicProps<T, AvatarFallbackProps<T>>) {
  const context = useAvatarContext()

  const [canRender, setCanRender] = createSignal(context.fallbackDelay() === undefined)

  createEffect(() => {
    const delayMs = context.fallbackDelay()

    if (delayMs !== undefined) {
      const timerId = window.setTimeout(() => setCanRender(true), delayMs)
      onCleanup(() => window.clearTimeout(timerId))
    }
  })

  return (
    <Show when={canRender() && context.imageLoadingStatus() !== "loaded"}>
      <Polymorphic<AvatarFallbackRenderProps> as="span" {...(props as AvatarFallbackProps)} />
    </Show>
  )
}
