import { mergeRefs } from "../utils"
import { type JSX, type ParentProps, type ValidComponent, createSignal, onCleanup, splitProps } from "solid-js"

import { combineStyle } from "@solid-primitives/props"
import { type ElementOf, Polymorphic, type PolymorphicProps } from "../polymorphic"
import { ScrollAreaContext, type ScrollAreaContextValue } from "./scroll-area-context"

const MIN_THUMB_SIZE = 16
const SCROLL_TIMEOUT = 500

export interface ScrollAreaRootOptions {}

export interface ScrollAreaRootCommonProps<T extends HTMLElement = HTMLElement> {
  ref: T | ((el: T) => void)
  style: JSX.CSSProperties | string
  onPointerEnter: JSX.EventHandlerUnion<T, PointerEvent>
  onPointerLeave: JSX.EventHandlerUnion<T, PointerEvent>
}

export interface ScrollAreaRootRenderProps extends ScrollAreaRootCommonProps {
  "data-scrolling": string | undefined
  "data-hovering": string | undefined
  "data-has-overflow-x": string | undefined
  "data-has-overflow-y": string | undefined
}

export type ScrollAreaRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = ScrollAreaRootOptions &
  Partial<ScrollAreaRootCommonProps<ElementOf<T>>>

export function ScrollAreaRoot<T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ParentProps<ScrollAreaRootProps<T>>>,
) {
  let rootRef: HTMLElement | undefined

  const [local, others] = splitProps(props as ParentProps<ScrollAreaRootProps>, ["ref", "style"])

  // --- Element refs ---
  const [viewportRef, setViewportRef] = createSignal<HTMLElement | undefined>()
  const [scrollbarXRef, setScrollbarXRef] = createSignal<HTMLElement | undefined>()
  const [scrollbarYRef, setScrollbarYRef] = createSignal<HTMLElement | undefined>()
  const [thumbXRef, setThumbXRef] = createSignal<HTMLElement | undefined>()
  const [thumbYRef, setThumbYRef] = createSignal<HTMLElement | undefined>()

  // --- State ---
  const [hovering, setHovering] = createSignal(false)
  const [scrolling, setScrolling] = createSignal(false)
  const [hasOverflowX, setHasOverflowX] = createSignal(false)
  const [hasOverflowY, setHasOverflowY] = createSignal(false)
  const [thumbWidth, setThumbWidth] = createSignal(0)
  const [thumbHeight, setThumbHeight] = createSignal(0)
  const [cornerWidth, setCornerWidth] = createSignal(0)
  const [cornerHeight, setCornerHeight] = createSignal(0)

  // --- Scroll timeout ---
  let scrollTimeout: ReturnType<typeof setTimeout> | undefined

  // --- Drag state (non-reactive for performance) ---
  let dragging = false
  let dragOrientation: "vertical" | "horizontal" = "vertical"
  let startX = 0
  let startY = 0
  let startScrollTop = 0
  let startScrollLeft = 0

  function computeThumb() {
    const viewport = viewportRef()
    if (!viewport) return

    const { scrollWidth, clientWidth, scrollHeight, clientHeight, scrollTop, scrollLeft } = viewport

    // Overflow detection
    const overflowX = scrollWidth > clientWidth
    const overflowY = scrollHeight > clientHeight
    setHasOverflowX(overflowX)
    setHasOverflowY(overflowY)

    // Corner size
    const sbY = scrollbarYRef()
    const sbX = scrollbarXRef()
    if (overflowX && overflowY && sbY && sbX) {
      setCornerWidth(sbY.offsetWidth)
      setCornerHeight(sbX.offsetHeight)
    } else {
      setCornerWidth(0)
      setCornerHeight(0)
    }

    // Vertical thumb
    if (overflowY && sbY) {
      const trackHeight = sbY.clientHeight
      const ratio = clientHeight / scrollHeight
      const rawThumbH = Math.max(MIN_THUMB_SIZE, trackHeight * ratio)
      const clampedH = Math.min(rawThumbH, trackHeight)
      setThumbHeight(clampedH)

      const tY = thumbYRef()
      if (tY) {
        const maxOffset = trackHeight - clampedH
        const scrollRatio = scrollHeight - clientHeight > 0 ? scrollTop / (scrollHeight - clientHeight) : 0
        const offset = Math.max(0, Math.min(maxOffset, scrollRatio * maxOffset))
        tY.style.transform = `translate3d(0, ${offset}px, 0)`
      }
    } else {
      setThumbHeight(0)
    }

    // Horizontal thumb
    if (overflowX && sbX) {
      const trackWidth = sbX.clientWidth
      const ratio = clientWidth / scrollWidth
      const rawThumbW = Math.max(MIN_THUMB_SIZE, trackWidth * ratio)
      const clampedW = Math.min(rawThumbW, trackWidth)
      setThumbWidth(clampedW)

      const tX = thumbXRef()
      if (tX) {
        const maxOffset = trackWidth - clampedW
        const scrollRatio = scrollWidth - clientWidth > 0 ? scrollLeft / (scrollWidth - clientWidth) : 0
        const offset = Math.max(0, Math.min(maxOffset, scrollRatio * maxOffset))
        tX.style.transform = `translate3d(${offset}px, 0, 0)`
      }
    } else {
      setThumbWidth(0)
    }
  }

  // --- Drag handlers ---
  function handlePointerDown(e: PointerEvent, orientation: "vertical" | "horizontal") {
    const viewport = viewportRef()
    if (!viewport) return

    dragging = true
    dragOrientation = orientation
    startX = e.clientX
    startY = e.clientY
    startScrollTop = viewport.scrollTop
    startScrollLeft = viewport.scrollLeft

    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    e.preventDefault()
  }

  function handlePointerMove(e: PointerEvent) {
    if (!dragging) return

    const viewport = viewportRef()
    if (!viewport) return

    if (dragOrientation === "vertical") {
      const sbY = scrollbarYRef()
      if (!sbY) return
      const delta = e.clientY - startY
      const trackHeight = sbY.clientHeight
      const maxOffset = trackHeight - thumbHeight()
      if (maxOffset <= 0) return
      const scrollRatio = delta / maxOffset
      viewport.scrollTop = startScrollTop + scrollRatio * (viewport.scrollHeight - viewport.clientHeight)
    } else {
      const sbX = scrollbarXRef()
      if (!sbX) return
      const delta = e.clientX - startX
      const trackWidth = sbX.clientWidth
      const maxOffset = trackWidth - thumbWidth()
      if (maxOffset <= 0) return
      const scrollRatio = delta / maxOffset
      viewport.scrollLeft = startScrollLeft + scrollRatio * (viewport.scrollWidth - viewport.clientWidth)
    }
  }

  function handlePointerUp(e: PointerEvent) {
    if (!dragging) return
    dragging = false
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
  }

  // --- Hover handlers on root ---
  function onPointerEnter(e: PointerEvent) {
    if (e.pointerType !== "touch") {
      setHovering(true)
    }
  }

  function onPointerLeave() {
    setHovering(false)
  }

  // --- Observe viewport scroll ---
  function onViewportScroll() {
    computeThumb()
    setScrolling(true)
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => setScrolling(false), SCROLL_TIMEOUT)
  }

  onCleanup(() => clearTimeout(scrollTimeout))

  const context: ScrollAreaContextValue = {
    viewportRef,
    setViewportRef,
    scrollbarXRef,
    setScrollbarXRef,
    scrollbarYRef,
    setScrollbarYRef,
    thumbXRef,
    setThumbXRef,
    thumbYRef,
    setThumbYRef,
    hovering,
    setHovering,
    scrolling,
    setScrolling,
    hasOverflowX,
    setHasOverflowX,
    hasOverflowY,
    setHasOverflowY,
    thumbWidth,
    setThumbWidth,
    thumbHeight,
    setThumbHeight,
    cornerWidth,
    setCornerWidth,
    cornerHeight,
    setCornerHeight,
    computeThumb,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  }

  // Expose onViewportScroll for Viewport to call
  ;(context as any)._onViewportScroll = onViewportScroll

  const rootStyle = () =>
    ({
      "--scroll-area-corner-width": `${cornerWidth()}px`,
      "--scroll-area-corner-height": `${cornerHeight()}px`,
    }) as Record<string, string>

  return (
    <ScrollAreaContext.Provider value={context}>
      <Polymorphic<ScrollAreaRootRenderProps>
        as="div"
        ref={mergeRefs((el) => {
          rootRef = el
        }, local.ref)}
        style={combineStyle(rootStyle(), local.style)}
        data-scrolling={scrolling() ? "" : undefined}
        data-hovering={hovering() ? "" : undefined}
        data-has-overflow-x={hasOverflowX() ? "" : undefined}
        data-has-overflow-y={hasOverflowY() ? "" : undefined}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        {...others}
      />
    </ScrollAreaContext.Provider>
  )
}
