import { focusWithoutScrolling } from "../utils"
import { type Component, type ValidComponent, splitProps } from "solid-js"

import {
  MenuContent,
  type MenuContentCommonProps,
  type MenuContentOptions,
  type MenuContentRenderProps,
} from "../menubar/menu-content"
import { useMenuContext } from "../menubar/menu-context"
import { useMenuRootContext } from "../menubar/menu-root-context"
import type { ElementOf, PolymorphicProps } from "../polymorphic"
import type { InteractOutsideEvent } from "../primitives"

export interface DropdownMenuPopupOptions extends MenuContentOptions {}

export interface DropdownMenuPopupCommonProps<T extends HTMLElement = HTMLElement> extends MenuContentCommonProps<T> {}

export interface DropdownMenuPopupRenderProps extends DropdownMenuPopupCommonProps, MenuContentRenderProps {}

export type DropdownMenuPopupProps<T extends ValidComponent | HTMLElement = HTMLElement> = DropdownMenuPopupOptions &
  Partial<DropdownMenuPopupCommonProps<ElementOf<T>>>

/**
 * Contains the content to be rendered when the menu is open.
 */
export function DropdownMenuPopup<T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuPopupProps<T>>,
) {
  const rootContext = useMenuRootContext()
  const context = useMenuContext()

  const [local, others] = splitProps(props, ["onCloseAutoFocus", "onInteractOutside"])

  let hasInteractedOutside = false

  const onCloseAutoFocus = (e: Event) => {
    local.onCloseAutoFocus?.(e)

    if (!hasInteractedOutside) {
      focusWithoutScrolling(context.triggerRef())
    }

    hasInteractedOutside = false

    // Always prevent autofocus because we either focus manually or want user agent focus
    e.preventDefault()
  }

  const onInteractOutside = (e: InteractOutsideEvent) => {
    local.onInteractOutside?.(e)

    if (!rootContext.isModal() || e.detail.isContextMenu) {
      hasInteractedOutside = true
    }
  }

  return (
    <MenuContent<Component<Omit<DropdownMenuPopupRenderProps, keyof MenuContentRenderProps>>>
      onCloseAutoFocus={onCloseAutoFocus}
      onInteractOutside={onInteractOutside}
      {...others}
    />
  )
}
