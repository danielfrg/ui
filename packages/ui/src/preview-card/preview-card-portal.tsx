import { type ComponentProps, Show } from "solid-js"
import { Portal } from "solid-js/web"

import { usePreviewCardContext } from "./preview-card-context"

export interface PreviewCardPortalProps extends ComponentProps<typeof Portal> {}

/**
 * Portals its children into the `body` when the preview card is open.
 */
export function PreviewCardPortal(props: PreviewCardPortalProps) {
  const context = usePreviewCardContext()

  return (
    <Show when={context.contentPresent()}>
      <Portal {...props} />
    </Show>
  )
}
