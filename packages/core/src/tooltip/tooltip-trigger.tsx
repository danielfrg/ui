import { callHandler, getDocument, mergeRefs } from "../utils"
import { type JSX, type ValidComponent, onCleanup, splitProps } from "solid-js"
import { isServer } from "solid-js/web"

import { type ElementOf, Polymorphic, type PolymorphicProps } from "../polymorphic"
import { useTooltipContext } from "./tooltip-context"

export interface TooltipTriggerOptions {}

export interface TooltipTriggerCommonProps<T extends HTMLElement = HTMLElement> {
  ref: T | ((el: T) => void)
  onPointerEnter: JSX.EventHandlerUnion<T, PointerEvent>
  onPointerLeave: JSX.EventHandlerUnion<T, PointerEvent>
  onPointerDown: JSX.EventHandlerUnion<T, PointerEvent>
  onClick: JSX.EventHandlerUnion<T, MouseEvent>
  onFocus: JSX.EventHandlerUnion<T, FocusEvent>
  onBlur: JSX.EventHandlerUnion<T, FocusEvent>
}

export interface TooltipTriggerRenderProps extends TooltipTriggerCommonProps {
  "aria-describedby": string | undefined
}

export type TooltipTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = TooltipTriggerOptions &
  Partial<TooltipTriggerCommonProps<ElementOf<T>>>

/**
 * The button that opens the tooltip when hovered.
 */
export function TooltipTrigger<T extends ValidComponent = "button">(
  props: PolymorphicProps<T, TooltipTriggerProps<T>>,
) {
  let ref: HTMLElement | undefined

  const context = useTooltipContext()

  const [local, others] = splitProps(props as TooltipTriggerProps, [
    "ref",
    "onPointerEnter",
    "onPointerLeave",
    "onPointerDown",
    "onClick",
    "onFocus",
    "onBlur",
  ])

  let isPointerDown = false
  let isHovered = false
  let isFocused = false

  const handlePointerUp = () => {
    isPointerDown = false
  }

  const handleShow = () => {
    if (!context.isOpen() && (isHovered || isFocused)) {
      context.openTooltip(isFocused)
    }
  }

  const handleHide = (immediate?: boolean) => {
    if (context.isOpen() && !isHovered && !isFocused) {
      context.hideTooltip(immediate)
    }
  }

  const onPointerEnter: JSX.EventHandlerUnion<HTMLElement, PointerEvent> = (e) => {
    callHandler(e, local.onPointerEnter)

    if (e.pointerType === "touch" || context.triggerOnFocusOnly() || context.isDisabled() || e.defaultPrevented) {
      return
    }

    isHovered = true

    handleShow()
  }

  const onPointerLeave: JSX.EventHandlerUnion<HTMLElement, PointerEvent> = (e) => {
    callHandler(e, local.onPointerLeave)

    if (e.pointerType === "touch") {
      return
    }

    isHovered = false
    isFocused = false

    if (context.isOpen()) {
      handleHide()
    } else {
      context.cancelOpening()
    }
  }

  const onPointerDown: JSX.EventHandlerUnion<HTMLElement, PointerEvent> = (e) => {
    callHandler(e, local.onPointerDown)

    isPointerDown = true
    getDocument(ref).addEventListener("pointerup", handlePointerUp, {
      once: true,
    })
  }

  const onClick: JSX.EventHandlerUnion<HTMLElement, MouseEvent> = (e) => {
    callHandler(e, local.onClick)

    isHovered = false
    isFocused = false

    handleHide(true)
  }

  const onFocus: JSX.EventHandlerUnion<HTMLElement, FocusEvent> = (e) => {
    callHandler(e, local.onFocus)

    if (context.isDisabled() || e.defaultPrevented || isPointerDown) {
      return
    }

    isFocused = true

    handleShow()
  }

  const onBlur: JSX.EventHandlerUnion<HTMLElement, FocusEvent> = (e) => {
    callHandler(e, local.onBlur)

    const relatedTarget = e.relatedTarget as Node | null

    if (context.isTargetOnTooltip(relatedTarget)) {
      return
    }

    isHovered = false
    isFocused = false

    handleHide(true)
  }

  onCleanup(() => {
    if (isServer) {
      return
    }

    getDocument(ref).removeEventListener("pointerup", handlePointerUp)
  })

  return (
    <Polymorphic<TooltipTriggerRenderProps>
      as="button"
      ref={mergeRefs((el) => {
        context.setTriggerRef(el)
        ref = el
      }, local.ref)}
      aria-describedby={context.isOpen() ? context.contentId() : undefined}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      {...context.dataset()}
      {...others}
    />
  )
}
