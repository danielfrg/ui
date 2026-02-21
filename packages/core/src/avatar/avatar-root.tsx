/*
 * Portions of this file are based on code from radix-ui-primitives.
 * MIT Licensed, Copyright (c) 2022 WorkOS.
 *
 * Credits to the Radix UI team:
 * https://github.com/radix-ui/primitives/blob/21a7c97dc8efa79fecca36428eec49f187294085/packages/react/avatar/src/Avatar.tsx
 */

import { type ValidComponent, createSignal, splitProps } from "solid-js"

import { type ElementOf, Polymorphic, type PolymorphicProps } from "../polymorphic"
import { AvatarContext, type AvatarContextValue } from "./avatar-context"
import type { AvatarLoadingStatus } from "./types"

export interface AvatarRootOptions {
  /**
   * The delay (in ms) before displaying the avatar fallback.
   * Useful if you notice a flash during loading for delaying rendering,
   * so it only appears for those with slower internet connections.
   */
  fallbackDelay?: number

  /**
   * A callback providing information about the loading status of the image.
   * This is useful in case you want to control more precisely what to render as the image is loading.
   */
  onLoadingStatusChange?: (status: AvatarLoadingStatus) => void
}

export interface AvatarRootCommonProps<T extends HTMLElement = HTMLElement> {}

export interface AvatarRootRenderProps extends AvatarRootCommonProps {}

export type AvatarRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = AvatarRootOptions &
  Partial<AvatarRootCommonProps<ElementOf<T>>>

/**
 * An image element with an optional fallback for loading and error status.
 */
export function AvatarRoot<T extends ValidComponent = "span">(props: PolymorphicProps<T, AvatarRootProps<T>>) {
  const [local, others] = splitProps(props as AvatarRootProps, ["fallbackDelay", "onLoadingStatusChange"])

  const [imageLoadingStatus, setImageLoadingStatus] = createSignal<AvatarLoadingStatus>("idle")

  const context: AvatarContextValue = {
    fallbackDelay: () => local.fallbackDelay,
    imageLoadingStatus,
    onImageLoadingStatusChange: (status) => {
      setImageLoadingStatus(status)
      local.onLoadingStatusChange?.(status)
    },
  }

  return (
    <AvatarContext.Provider value={context}>
      <Polymorphic<AvatarRootRenderProps> as="span" {...others} />
    </AvatarContext.Provider>
  )
}
