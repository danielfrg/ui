import * as Tooltip from "@danielfrg/ui-core/tooltip"
import styles from "./index.module.css"

export function DemoTooltipHero() {
  return (
    <div class={styles.panel}>
      <Tooltip.Root openDelay={200} placement="top">
        <Tooltip.Trigger class={styles.button}>
          <BoldIcon />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content class={styles.popup}>
            <Tooltip.Arrow />
            Bold
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>

      <Tooltip.Root openDelay={200} placement="top">
        <Tooltip.Trigger class={styles.button}>
          <ItalicIcon />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content class={styles.popup}>
            <Tooltip.Arrow />
            Italic
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>

      <Tooltip.Root openDelay={200} placement="top">
        <Tooltip.Trigger class={styles.button}>
          <UnderlineIcon />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content class={styles.popup}>
            <Tooltip.Arrow />
            Underline
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </div>
  )
}

function BoldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentcolor">
      <path d="M3.73353 2.13333C3.4386 2.13333 3.2002 2.37226 3.2002 2.66666C3.2002 2.96106 3.4386 3.2 3.73353 3.2H4.26686V12.8H3.73353C3.4386 12.8 3.2002 13.0389 3.2002 13.3333C3.2002 13.6277 3.4386 13.8667 3.73353 13.8667H9.86686C11.7783 13.8667 13.3335 12.3115 13.3335 10.4C13.3335 8.9968 12.4945 7.78881 11.2929 7.24375C11.8897 6.70615 12.2669 5.93066 12.2669 5.06666C12.2669 3.44906 10.9506 2.13333 9.33353 2.13333H3.73353ZM6.93353 3.2H8.26686C9.29619 3.2 10.1335 4.03733 10.1335 5.06666C10.1335 6.096 9.29619 6.93333 8.26686 6.93333H6.93353V3.2ZM6.93353 8H7.73353H8.26686C9.59006 8 10.6669 9.0768 10.6669 10.4C10.6669 11.7232 9.59006 12.8 8.26686 12.8H6.93353V8Z" />
    </svg>
  )
}

function ItalicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentcolor">
      <path d="M8.52599 2.12186C8.48583 2.12267 8.44578 2.1265 8.4062 2.13332H6.93328C6.63835 2.13332 6.39995 2.37225 6.39995 2.66665C6.39995 2.96105 6.63835 3.19999 6.93328 3.19999H7.70099L6.69057 12.8H5.86661C5.57168 12.8 5.33328 13.0389 5.33328 13.3333C5.33328 13.6277 5.57168 13.8667 5.86661 13.8667H9.06661C9.36155 13.8667 9.59995 13.6277 9.59995 13.3333C9.59995 13.0389 9.36155 12.8 9.06661 12.8H8.2989L9.30932 3.19999H10.1333C10.4282 3.19999 10.6666 2.96105 10.6666 2.66665C10.6666 2.37225 10.4282 2.13332 10.1333 2.13332H8.66349C8.61807 2.12555 8.57207 2.12171 8.52599 2.12186Z" />
    </svg>
  )
}

function UnderlineIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentcolor">
      <path d="M3.73331 2.13332C3.43838 2.13332 3.19998 2.37225 3.19998 2.66666C3.19998 2.96106 3.43838 3.19999 3.73331 3.19999V7.99999C3.73331 10.224 5.55144 12.2667 7.99998 12.2667C10.4485 12.2667 12.2666 10.224 12.2666 7.99999V3.19999C12.5616 3.19999 12.8 2.96106 12.8 2.66666C12.8 2.37225 12.5616 2.13332 12.2666 2.13332H10.1333C9.83838 2.13332 9.59998 2.37225 9.59998 2.66666C9.59998 2.96106 9.83838 3.19999 10.1333 3.19999V8.97187C10.1333 10.0855 9.32179 11.0818 8.21352 11.1896C6.94152 11.3138 5.86665 10.3136 5.86665 9.06666V3.19999C6.16158 3.19999 6.39998 2.96106 6.39998 2.66666C6.39998 2.37225 6.16158 2.13332 5.86665 2.13332H3.73331ZM3.73331 13.3333C3.43838 13.3333 3.19998 13.5723 3.19998 13.8667C3.19998 14.1611 3.43838 14.4 3.73331 14.4H12.2666C12.5616 14.4 12.8 14.1611 12.8 13.8667C12.8 13.5723 12.5616 13.3333 12.2666 13.3333H3.73331Z" />
    </svg>
  )
}
