import {
  DialogCloseButton as Close,
  type DialogCloseButtonCommonProps as DrawerCloseCommonProps,
  type DialogCloseButtonOptions as DrawerCloseOptions,
  type DialogCloseButtonProps as DrawerCloseProps,
  type DialogCloseButtonRenderProps as DrawerCloseRenderProps,
} from "../dialog/dialog-close-button"
import {
  DialogDescription as Description,
  type DialogDescriptionCommonProps as DrawerDescriptionCommonProps,
  type DialogDescriptionOptions as DrawerDescriptionOptions,
  type DialogDescriptionProps as DrawerDescriptionProps,
  type DialogDescriptionRenderProps as DrawerDescriptionRenderProps,
} from "../dialog/dialog-description"
import {
  type DialogOverlayCommonProps as DrawerBackdropCommonProps,
  type DialogOverlayOptions as DrawerBackdropOptions,
  type DialogOverlayProps as DrawerBackdropProps,
  type DialogOverlayRenderProps as DrawerBackdropRenderProps,
  DialogOverlay as Backdrop,
} from "../dialog/dialog-overlay"
import { type DialogPortalProps as DrawerPortalProps, DialogPortal as Portal } from "../dialog/dialog-portal"
import {
  type DialogTitleCommonProps as DrawerTitleCommonProps,
  type DialogTitleOptions as DrawerTitleOptions,
  type DialogTitleProps as DrawerTitleProps,
  type DialogTitleRenderProps as DrawerTitleRenderProps,
  DialogTitle as Title,
} from "../dialog/dialog-title"
import {
  type DialogTriggerCommonProps as DrawerTriggerCommonProps,
  type DialogTriggerOptions as DrawerTriggerOptions,
  type DialogTriggerProps as DrawerTriggerProps,
  type DialogTriggerRenderProps as DrawerTriggerRenderProps,
  DialogTrigger as Trigger,
} from "../dialog/dialog-trigger"

import {
  DrawerPopup as Popup,
  type DrawerPopupCommonProps,
  type DrawerPopupOptions,
  type DrawerPopupProps,
  type DrawerPopupRenderProps,
} from "./drawer-popup"
import { DrawerRoot as Root, type DrawerRootOptions, type DrawerRootProps } from "./drawer-root"

export type {
  DrawerBackdropOptions,
  DrawerBackdropCommonProps,
  DrawerBackdropRenderProps,
  DrawerBackdropProps,
  DrawerCloseOptions,
  DrawerCloseCommonProps,
  DrawerCloseRenderProps,
  DrawerCloseProps,
  DrawerDescriptionOptions,
  DrawerDescriptionCommonProps,
  DrawerDescriptionRenderProps,
  DrawerDescriptionProps,
  DrawerPopupOptions,
  DrawerPopupCommonProps,
  DrawerPopupRenderProps,
  DrawerPopupProps,
  DrawerPortalProps,
  DrawerRootOptions,
  DrawerRootProps,
  DrawerTitleOptions,
  DrawerTitleCommonProps,
  DrawerTitleRenderProps,
  DrawerTitleProps,
  DrawerTriggerOptions,
  DrawerTriggerCommonProps,
  DrawerTriggerRenderProps,
  DrawerTriggerProps,
}

export { Backdrop, Close, Description, Popup, Portal, Root, Title, Trigger }

export const Drawer = Object.assign(Root, {
  Backdrop,
  Close,
  Description,
  Popup,
  Portal,
  Title,
  Trigger,
})

export { useDrawerContext, type DrawerContextValue } from "./drawer-context"
export type { DrawerSide } from "./drawer-context"
