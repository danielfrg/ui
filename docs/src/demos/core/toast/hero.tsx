import * as Toast from "@danielfrg/ui-core/toast"
import styles from "./index.module.css"

let count = 0

export function DemoToastHero() {
  return (
    <>
      <button
        class={styles.trigger}
        onClick={() => {
          count++
          const n = count
          Toast.toaster.show((props) => (
            <Toast.Root toastId={props.toastId} class={styles.toast}>
              <div class={styles.content}>
                <Toast.Title class={styles.title}>Toast {n} created</Toast.Title>
                <Toast.Description class={styles.description}>This is a toast notification.</Toast.Description>
              </div>
              <Toast.CloseButton
                class={styles.closeButton}
                onPointerDown={(e: PointerEvent) => {
                  // Stop the toast root's swipe handler from capturing this
                  e.stopPropagation()
                }}
              >
                <CloseIcon />
              </Toast.CloseButton>
              <Toast.ProgressTrack class={styles.progressTrack}>
                <Toast.ProgressFill class={styles.progressFill} />
              </Toast.ProgressTrack>
            </Toast.Root>
          ))
        }}
      >
        Create toast
      </button>

      <Toast.Region limit={5} swipeDirection="right">
        <Toast.List class={styles.list} />
      </Toast.Region>
    </>
  )
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M11 3L3 11M3 3L11 11"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
