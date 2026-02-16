import { mergeDefaultProps } from "../utils"
import { Show, type ValidComponent, splitProps } from "solid-js"

import { type ElementOf, Polymorphic, type PolymorphicProps } from "../polymorphic"
import { type MenuItemDataSet, useMenuItemContext } from "./menu-item.context"

export interface MenuItemIndicatorOptions {
  forceMount?: boolean
}

export interface MenuItemIndicatorCommonProps<T extends HTMLElement = HTMLElement> {
  id: string
}

export interface MenuItemIndicatorRenderProps extends MenuItemIndicatorCommonProps, MenuItemDataSet {}

export type MenuItemIndicatorProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenuItemIndicatorOptions &
  Partial<MenuItemIndicatorCommonProps<ElementOf<T>>>

export function MenuItemIndicator<T extends ValidComponent = "div">(
  props: PolymorphicProps<T, MenuItemIndicatorProps<T>>,
) {
  const context = useMenuItemContext()

  const mergedProps = mergeDefaultProps(
    {
      id: context.generateId("indicator"),
    },
    props as MenuItemIndicatorProps,
  )

  const [local, others] = splitProps(mergedProps, ["forceMount"])

  return (
    <Show when={local.forceMount || context.isChecked()}>
      <Polymorphic<MenuItemIndicatorRenderProps> as="div" {...context.dataset()} {...others} />
    </Show>
  )
}
