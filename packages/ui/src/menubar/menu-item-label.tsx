import { mergeDefaultProps, mergeRefs } from "../utils"
import { type ValidComponent, createEffect, onCleanup, splitProps } from "solid-js"

import { type ElementOf, Polymorphic, type PolymorphicProps } from "../polymorphic"
import { type MenuItemDataSet, useMenuItemContext } from "./menu-item.context"

export interface MenuItemLabelOptions {}

export interface MenuItemLabelCommonProps<T extends HTMLElement = HTMLElement> {
  id: string
  ref: T | ((el: T) => void)
}

export interface MenuItemLabelRenderProps extends MenuItemLabelCommonProps, MenuItemDataSet {}

export type MenuItemLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenuItemLabelOptions &
  Partial<MenuItemLabelCommonProps<ElementOf<T>>>

export function MenuItemLabel<T extends ValidComponent = "div">(props: PolymorphicProps<T, MenuItemLabelProps<T>>) {
  const context = useMenuItemContext()

  const mergedProps = mergeDefaultProps(
    {
      id: context.generateId("label"),
    },
    props as MenuItemLabelProps,
  )

  const [local, others] = splitProps(mergedProps, ["ref", "id"])

  createEffect(() => onCleanup(context.registerLabel(local.id)))

  return (
    <Polymorphic<MenuItemLabelRenderProps>
      as="div"
      ref={mergeRefs(context.setLabelRef, local.ref)}
      id={local.id}
      {...context.dataset()}
      {...others}
    />
  )
}
