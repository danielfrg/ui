import { type Accessor, type Setter, createContext, useContext } from "solid-js"

export type DrawerSide = "left" | "right" | "top" | "bottom"

export interface DrawerContextValue {
  /** Which edge the drawer slides in from. */
  side: Accessor<DrawerSide>

  /** Whether a touch swipe gesture is in progress. */
  isSwiping: Accessor<boolean>

  /** Current swipe offset on the X axis (px). */
  swipeMovementX: Accessor<number>

  /** Current swipe offset on the Y axis (px). */
  swipeMovementY: Accessor<number>

  setIsSwiping: Setter<boolean>
  setSwipeMovementX: Setter<number>
  setSwipeMovementY: Setter<number>

  /** Called when a swipe gesture exceeds the dismiss threshold. */
  onSwipeDismiss: () => void
}

export const DrawerContext = createContext<DrawerContextValue>()

export function useDrawerContext() {
  const context = useContext(DrawerContext)

  if (context === undefined) {
    throw new Error("[ui]: `useDrawerContext` must be used within a `Drawer` component")
  }

  return context
}
