import { mergeRefs } from "../utils"
import { type JSX, type ValidComponent, onCleanup, splitProps } from "solid-js"

import { combineStyle } from "@solid-primitives/props"
import type { ElementOf, PolymorphicProps } from "../polymorphic"
import {
  DialogContent,
  type DialogContentCommonProps,
  type DialogContentOptions,
  type DialogContentRenderProps,
} from "../dialog/dialog-content"
import { useDialogContext } from "../dialog/dialog-context"
import { useDrawerContext } from "./drawer-context"
import type { DrawerSide } from "./drawer-context"

export interface DrawerPopupOptions extends DialogContentOptions {}

export interface DrawerPopupCommonProps<T extends HTMLElement = HTMLElement> extends DialogContentCommonProps<T> {
  style: JSX.CSSProperties | string
}

export interface DrawerPopupRenderProps extends DrawerPopupCommonProps, DialogContentRenderProps {
  "data-side": DrawerSide
  "data-swiping": string | undefined
}

export type DrawerPopupProps<T extends ValidComponent | HTMLElement = HTMLElement> = DrawerPopupOptions &
  Partial<DrawerPopupCommonProps<ElementOf<T>>>

// Swipe thresholds
const VELOCITY_THRESHOLD = 0.4 // px/ms
const SIZE_THRESHOLD_FRACTION = 0.33 // fraction of popup dimension
const DEAD_ZONE = 3 // px before swipe activates

/**
 * Returns whether the swipe delta is in the dismiss direction for the given side.
 */
function isDismissDirection(side: DrawerSide, deltaX: number, deltaY: number): boolean {
  switch (side) {
    case "right":
      return deltaX > 0
    case "left":
      return deltaX < 0
    case "bottom":
      return deltaY > 0
    case "top":
      return deltaY < 0
  }
}

/**
 * Returns the relevant movement value (clamped >= 0) for the given side.
 */
function getSwipeMovement(side: DrawerSide, deltaX: number, deltaY: number): { x: number; y: number } {
  switch (side) {
    case "right":
      return { x: Math.max(0, deltaX), y: 0 }
    case "left":
      return { x: Math.min(0, deltaX), y: 0 }
    case "bottom":
      return { x: 0, y: Math.max(0, deltaY) }
    case "top":
      return { x: 0, y: Math.min(0, deltaY) }
  }
}

/**
 * Returns the popup dimension relevant to the swipe direction.
 */
function getPopupSize(el: HTMLElement, side: DrawerSide): number {
  if (side === "left" || side === "right") {
    return el.offsetWidth
  }
  return el.offsetHeight
}

/**
 * Contains the content to be rendered when the drawer is open.
 * Wraps Dialog.Content with swipe-to-dismiss behavior and drawer-specific
 * data attributes and CSS variables.
 */
export function DrawerPopup<T extends ValidComponent = "div">(props: PolymorphicProps<T, DrawerPopupProps<T>>) {
  let popupRef: HTMLElement | undefined

  const dialogContext = useDialogContext()
  const drawerContext = useDrawerContext()

  const [local, others] = splitProps(props as DrawerPopupProps, ["ref", "style"])

  // --- Swipe-to-dismiss state ---
  let startX = 0
  let startY = 0
  let startTime = 0
  let pointerId: number | null = null

  const onPointerDown = (e: PointerEvent) => {
    // Only handle touch events for swipe
    if (e.pointerType !== "touch") return

    startX = e.clientX
    startY = e.clientY
    startTime = Date.now()
    pointerId = e.pointerId

    document.addEventListener("pointermove", onPointerMove)
    document.addEventListener("pointerup", onPointerUp)
    document.addEventListener("pointercancel", onPointerUp)
  }

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerId !== pointerId) return

    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY
    const side = drawerContext.side()

    // Check if movement is in the dismiss direction
    if (!isDismissDirection(side, deltaX, deltaY)) {
      // If we haven't started swiping yet, don't activate
      if (!drawerContext.isSwiping()) return
      // If we were swiping but reversed direction, clamp to 0
      drawerContext.setSwipeMovementX(0)
      drawerContext.setSwipeMovementY(0)
      return
    }

    const { x, y } = getSwipeMovement(side, deltaX, deltaY)
    const absDelta = Math.abs(x) + Math.abs(y)

    // Activate swiping after passing dead zone
    if (!drawerContext.isSwiping() && absDelta > DEAD_ZONE) {
      drawerContext.setIsSwiping(true)
    }

    if (drawerContext.isSwiping()) {
      drawerContext.setSwipeMovementX(x)
      drawerContext.setSwipeMovementY(y)
    }
  }

  const onPointerUp = (e: PointerEvent) => {
    if (e.pointerId !== pointerId) return

    document.removeEventListener("pointermove", onPointerMove)
    document.removeEventListener("pointerup", onPointerUp)
    document.removeEventListener("pointercancel", onPointerUp)
    pointerId = null

    if (!drawerContext.isSwiping()) return

    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY
    const elapsed = Date.now() - startTime
    const side = drawerContext.side()

    // Calculate relevant delta for the side
    const relevantDelta = side === "left" || side === "right" ? Math.abs(deltaX) : Math.abs(deltaY)
    const velocity = elapsed > 0 ? relevantDelta / elapsed : 0

    const popupSize = popupRef ? getPopupSize(popupRef, side) : 300
    const sizeThreshold = popupSize * SIZE_THRESHOLD_FRACTION

    if (velocity > VELOCITY_THRESHOLD || relevantDelta > sizeThreshold) {
      // Dismiss
      drawerContext.onSwipeDismiss()
      dialogContext.close()
    } else {
      // Snap back
      drawerContext.setIsSwiping(false)
      drawerContext.setSwipeMovementX(0)
      drawerContext.setSwipeMovementY(0)
    }
  }

  // Cleanup global listeners on unmount
  onCleanup(() => {
    document.removeEventListener("pointermove", onPointerMove)
    document.removeEventListener("pointerup", onPointerUp)
    document.removeEventListener("pointercancel", onPointerUp)
  })

  const swipeStyle = () => {
    const x = drawerContext.swipeMovementX()
    const y = drawerContext.swipeMovementY()
    return {
      "--drawer-swipe-movement-x": `${x}px`,
      "--drawer-swipe-movement-y": `${y}px`,
    } as Record<string, string>
  }

  return (
    <DialogContent
      ref={mergeRefs((el: HTMLElement) => {
        popupRef = el
      }, local.ref)}
      style={combineStyle(swipeStyle(), local.style)}
      data-side={drawerContext.side()}
      data-swiping={drawerContext.isSwiping() ? "" : undefined}
      onPointerDown={onPointerDown}
      {...others}
    />
  )
}
