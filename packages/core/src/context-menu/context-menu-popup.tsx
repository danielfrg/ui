import { type Component, type ValidComponent, splitProps } from "solid-js"

import {
  MenuContent,
  type MenuContentCommonProps,
  type MenuContentOptions,
  type MenuContentRenderProps,
} from "../menubar/menu-content"
import { useMenuRootContext } from "../menubar/menu-root-context"
import type { ElementOf, PolymorphicProps } from "../polymorphic"
import type { InteractOutsideEvent } from "../primitives"

export interface ContextMenuPopupOptions extends MenuContentOptions {}

export interface ContextMenuPopupCommonProps<T extends HTMLElement = HTMLElement> extends MenuContentCommonProps<T> {}

export interface ContextMenuPopupRenderProps extends ContextMenuPopupCommonProps, MenuContentRenderProps {}

export type ContextMenuPopupProps<T extends ValidComponent | HTMLElement = HTMLElement> = ContextMenuPopupOptions &
  Partial<ContextMenuPopupCommonProps<ElementOf<T>>>

export function ContextMenuPopup<T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuPopupProps<T>>,
) {
  const rootContext = useMenuRootContext()

  const [local, others] = splitProps(props, ["onCloseAutoFocus", "onInteractOutside"])

  let hasInteractedOutside = false

  const onCloseAutoFocus = (e: Event) => {
    local.onCloseAutoFocus?.(e)

    if (!e.defaultPrevented && hasInteractedOutside) {
      e.preventDefault()
    }

    hasInteractedOutside = false
  }

  const onInteractOutside = (e: InteractOutsideEvent) => {
    local.onInteractOutside?.(e)

    if (!e.defaultPrevented && !rootContext.isModal()) {
      hasInteractedOutside = true
    }
  }

  return (
    <MenuContent<Component<Omit<ContextMenuPopupRenderProps, keyof MenuContentRenderProps>>>
      onCloseAutoFocus={onCloseAutoFocus}
      onInteractOutside={onInteractOutside}
      {...others}
    />
  )
}
