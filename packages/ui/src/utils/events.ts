import type { JSX } from "solid-js"

import { isFunction } from "./assertion"
import { isMac } from "./platform"

/** Call a JSX.EventHandlerUnion with the event. */
export function callHandler<T, E extends Event>(
  event: E & { currentTarget: T; target: EventTarget | Element },
  handler: JSX.EventHandlerUnion<T, E> | JSX.EventHandlerUnion<any, any> | undefined,
) {
  if (handler) {
    if (isFunction(handler)) {
      ;(handler as (event: any) => void)(event)
    } else {
      ;(handler[0] as (item: any, event: any) => void)(handler[1], event)
    }
  }

  return event?.defaultPrevented
}

/** Create a new event handler which calls all given handlers in the order they were chained with the same event. */
export function composeEventHandlers<T>(handlers: Array<JSX.EventHandlerUnion<T, any> | undefined>) {
  return (event: any) => {
    for (const handler of handlers) {
      callHandler(event, handler)
    }
  }
}

export function isCtrlKey(e: Pick<KeyboardEvent, "ctrlKey" | "metaKey">) {
  if (isMac()) {
    return e.metaKey && !e.ctrlKey
  }

  return e.ctrlKey && !e.metaKey
}
