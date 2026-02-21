import { type Accessor, type Setter, createContext, useContext } from "solid-js"

export interface ScrollAreaContextValue {
  viewportRef: Accessor<HTMLElement | undefined>
  setViewportRef: Setter<HTMLElement | undefined>
  scrollbarXRef: Accessor<HTMLElement | undefined>
  setScrollbarXRef: Setter<HTMLElement | undefined>
  scrollbarYRef: Accessor<HTMLElement | undefined>
  setScrollbarYRef: Setter<HTMLElement | undefined>
  thumbXRef: Accessor<HTMLElement | undefined>
  setThumbXRef: Setter<HTMLElement | undefined>
  thumbYRef: Accessor<HTMLElement | undefined>
  setThumbYRef: Setter<HTMLElement | undefined>

  hovering: Accessor<boolean>
  setHovering: Setter<boolean>
  scrolling: Accessor<boolean>
  setScrolling: Setter<boolean>

  hasOverflowX: Accessor<boolean>
  setHasOverflowX: Setter<boolean>
  hasOverflowY: Accessor<boolean>
  setHasOverflowY: Setter<boolean>

  thumbWidth: Accessor<number>
  setThumbWidth: Setter<number>
  thumbHeight: Accessor<number>
  setThumbHeight: Setter<number>

  cornerWidth: Accessor<number>
  setCornerWidth: Setter<number>
  cornerHeight: Accessor<number>
  setCornerHeight: Setter<number>

  /** Recompute thumb size and position. */
  computeThumb: () => void

  // Drag handlers called from Thumb, managed by Root
  handlePointerDown: (e: PointerEvent, orientation: "vertical" | "horizontal") => void
  handlePointerMove: (e: PointerEvent) => void
  handlePointerUp: (e: PointerEvent) => void
}

export const ScrollAreaContext = createContext<ScrollAreaContextValue>()

export function useScrollAreaContext() {
  const context = useContext(ScrollAreaContext)

  if (context === undefined) {
    throw new Error("[ui]: `useScrollAreaContext` must be used within a `ScrollArea` component")
  }

  return context
}
