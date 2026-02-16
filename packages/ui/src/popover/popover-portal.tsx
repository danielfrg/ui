import { type ComponentProps, Show } from "solid-js"
import { Portal } from "solid-js/web"

import { usePopoverContext } from "./popover-context"

export interface PopoverPortalProps extends ComponentProps<typeof Portal> {}

export function PopoverPortal(props: PopoverPortalProps) {
  const context = usePopoverContext()

  return (
    <Show when={context.contentPresent()}>
      <Portal {...props} />
    </Show>
  )
}
