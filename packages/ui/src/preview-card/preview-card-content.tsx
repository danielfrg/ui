import { mergeRefs } from "../utils"
import { type Component, type JSX, Show, type ValidComponent, splitProps } from "solid-js"

import { combineStyle } from "@solid-primitives/props"
import { DismissableLayer, type DismissableLayerRenderProps } from "../dismissable-layer"
import type { ElementOf, PolymorphicProps } from "../polymorphic"
import { Popper } from "../popper"
import { type PreviewCardDataSet, usePreviewCardContext } from "./preview-card-context"

export interface PreviewCardContentOptions {}

export interface PreviewCardContentCommonProps<T extends HTMLElement = HTMLElement> {
  ref: T | ((el: T) => void)
  style?: JSX.CSSProperties | string
}

export interface PreviewCardContentRenderProps
  extends PreviewCardContentCommonProps, DismissableLayerRenderProps, PreviewCardDataSet {}

export type PreviewCardContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = PreviewCardContentOptions &
  Partial<PreviewCardContentCommonProps<ElementOf<T>>>

/**
 * Contains the content to be rendered when the preview card is open.
 */
export function PreviewCardContent<T extends ValidComponent = "div">(
  props: PolymorphicProps<T, PreviewCardContentProps<T>>,
) {
  const context = usePreviewCardContext()

  const [local, others] = splitProps(props as PreviewCardContentProps, ["ref", "style"])

  return (
    <Show when={context.contentPresent()}>
      <Popper.Positioner>
        <DismissableLayer<Component<Omit<PreviewCardContentRenderProps, keyof DismissableLayerRenderProps>>>
          ref={mergeRefs((el) => {
            context.setContentRef(el)
          }, local.ref)}
          disableOutsidePointerEvents={false}
          style={combineStyle(
            {
              "--kb-hovercard-content-transform-origin": "var(--kb-popper-content-transform-origin)",
              position: "relative",
            },
            local.style,
          )}
          onFocusOutside={(e) => e.preventDefault()}
          onDismiss={context.close}
          {...context.dataset()}
          {...others}
        />
      </Popper.Positioner>
    </Show>
  )
}
