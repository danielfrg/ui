import {
  Arrow,
  type PopperArrowCommonProps as PreviewCardArrowCommonProps,
  type PopperArrowOptions as PreviewCardArrowOptions,
  type PopperArrowProps as PreviewCardArrowProps,
  type PopperArrowRenderProps as PreviewCardArrowRenderProps,
} from "../popper"
import {
  PreviewCardContent as Content,
  type PreviewCardContentCommonProps,
  type PreviewCardContentOptions,
  type PreviewCardContentProps,
  type PreviewCardContentRenderProps,
} from "./preview-card-content"
import { type PreviewCardPortalProps, PreviewCardPortal as Portal } from "./preview-card-portal"
import { type PreviewCardRootOptions, type PreviewCardRootProps, PreviewCardRoot as Root } from "./preview-card-root"
import {
  type PreviewCardTriggerCommonProps,
  type PreviewCardTriggerOptions,
  type PreviewCardTriggerProps,
  type PreviewCardTriggerRenderProps,
  PreviewCardTrigger as Trigger,
} from "./preview-card-trigger"

export type {
  PreviewCardArrowOptions,
  PreviewCardArrowCommonProps,
  PreviewCardArrowRenderProps,
  PreviewCardArrowProps,
  PreviewCardContentOptions,
  PreviewCardContentCommonProps,
  PreviewCardContentRenderProps,
  PreviewCardContentProps,
  PreviewCardPortalProps,
  PreviewCardRootOptions,
  PreviewCardRootProps,
  PreviewCardTriggerOptions,
  PreviewCardTriggerCommonProps,
  PreviewCardTriggerRenderProps,
  PreviewCardTriggerProps,
}

export { Arrow, Content, Portal, Root, Trigger }

export const PreviewCard = Object.assign(Root, {
  Arrow,
  Content,
  Portal,
  Trigger,
})

export { usePreviewCardContext, type PreviewCardContextValue } from "./preview-card-context"
