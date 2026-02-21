import {
  AvatarFallback as Fallback,
  type AvatarFallbackCommonProps,
  type AvatarFallbackOptions,
  type AvatarFallbackProps,
  type AvatarFallbackRenderProps,
} from "./avatar-fallback"
import {
  type AvatarImageCommonProps,
  type AvatarImageOptions,
  type AvatarImageProps,
  type AvatarImageRenderProps,
  AvatarImage as Image,
} from "./avatar-image"
import {
  type AvatarRootCommonProps,
  type AvatarRootOptions,
  type AvatarRootProps,
  type AvatarRootRenderProps,
  AvatarRoot as Root,
} from "./avatar-root"

export type {
  AvatarFallbackOptions,
  AvatarFallbackCommonProps,
  AvatarFallbackRenderProps,
  AvatarFallbackProps,
  AvatarImageOptions,
  AvatarImageCommonProps,
  AvatarImageRenderProps,
  AvatarImageProps,
  AvatarRootOptions,
  AvatarRootCommonProps,
  AvatarRootRenderProps,
  AvatarRootProps,
}
export { Fallback, Image, Root }

export const Avatar = Object.assign(Root, {
  Fallback,
  Image,
})

export { useAvatarContext, type AvatarContextValue } from "./avatar-context"
