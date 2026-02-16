import { type Accessor, type JSX, createContext, useContext } from "solid-js"

export interface InputContextValue {
  value: Accessor<string | undefined>
  generateId: (part: string) => string
  onInput: JSX.EventHandlerUnion<HTMLInputElement | HTMLTextAreaElement, InputEvent>
}

export const InputContext = createContext<InputContextValue>()

export function useInputContext() {
  const context = useContext(InputContext)

  if (context === undefined) {
    throw new Error("[ui]: `useInputContext` must be used within an `Input` component")
  }

  return context
}
