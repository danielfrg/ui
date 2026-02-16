import { callHandler, mergeRefs } from "../utils"
import { type Component, type JSX, type ValidComponent, splitProps } from "solid-js"

import * as Button from "../button"
import type { ElementOf, PolymorphicProps } from "../polymorphic"
import { type PopoverDataSet, usePopoverContext } from "./popover-context"

export interface PopoverTriggerOptions {}

export interface PopoverTriggerCommonProps<T extends HTMLElement = HTMLElement> {
  ref: T | ((el: T) => void)
  onClick: JSX.EventHandlerUnion<T, MouseEvent>
  onPointerDown: JSX.EventHandlerUnion<T, PointerEvent>
}

export interface PopoverTriggerRenderProps
  extends PopoverTriggerCommonProps, Button.ButtonRootRenderProps, PopoverDataSet {
  "aria-haspopup": "dialog"
  "aria-expanded": boolean
  "aria-controls": string | undefined
}

export type PopoverTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = PopoverTriggerOptions &
  Partial<PopoverTriggerCommonProps<ElementOf<T>>>

export function PopoverTrigger<T extends ValidComponent = "button">(
  props: PolymorphicProps<T, PopoverTriggerProps<T>>,
) {
  const context = usePopoverContext()

  const [local, others] = splitProps(props as PopoverTriggerProps, ["ref", "onClick", "onPointerDown"])

  const onPointerDown: JSX.EventHandlerUnion<HTMLElement, PointerEvent> = (e) => {
    callHandler(e, local.onPointerDown)
    e.preventDefault()
  }

  const onClick: JSX.EventHandlerUnion<HTMLElement, MouseEvent> = (e) => {
    callHandler(e, local.onClick)
    context.toggle()
  }

  return (
    <Button.Root<Component<Omit<PopoverTriggerRenderProps, keyof Button.ButtonRootRenderProps>>>
      ref={mergeRefs(context.setTriggerRef, local.ref)}
      aria-haspopup="dialog"
      aria-expanded={context.isOpen()}
      aria-controls={context.isOpen() ? context.contentId() : undefined}
      onPointerDown={onPointerDown}
      onClick={onClick}
      {...context.dataset()}
      {...others}
    />
  )
}
