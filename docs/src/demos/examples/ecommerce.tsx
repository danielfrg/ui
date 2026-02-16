import { createSignal, For, type JSX } from "solid-js"
import { Button } from "@danielfrg/ui/button"
import { Separator } from "@danielfrg/ui/separator"
import * as Switch from "@danielfrg/ui/switch"
import styles from "./ecommerce.module.css"

// ── Icons ──────────────────────────────────────────────────────
function BookmarkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V13.5C12 13.6818 11.9014 13.8492 11.7431 13.9373C11.5849 14.0254 11.3923 14.0203 11.2382 13.924L7.5 11.5657L3.76185 13.924C3.60774 14.0203 3.41515 14.0254 3.25691 13.9373C3.09867 13.8492 3 13.6818 3 13.5V2.5ZM4 3V12.5657L7.23815 10.576C7.39226 10.4797 7.58774 10.4797 7.74185 10.576L11 12.5657V3H4Z" />
    </svg>
  )
}

function BookmarkFilledIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V13.5C12 13.6818 11.9014 13.8492 11.7431 13.9373C11.5849 14.0254 11.3923 14.0203 11.2382 13.924L7.5 11.5657L3.76185 13.924C3.60774 14.0203 3.41515 14.0254 3.25691 13.9373C3.09867 13.8492 3 13.6818 3 13.5V2.5Z" />
    </svg>
  )
}

function MagnifyingGlassIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" />
    </svg>
  )
}

function CrumpledPaperIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 15 15" fill="currentColor">
      <path d="M5.47078 1.09908C5.62012 0.948739 5.8688 0.947161 6.02019 1.09559L7.63278 2.67475L9.08233 1.26275C9.23377 1.11538 9.47838 1.1195 9.6248 1.27186L11.2645 2.97768L12.8561 1.40851C13.0064 1.26011 13.2503 1.25855 13.4026 1.405L14.603 2.57025C14.6814 2.6461 14.7262 2.75085 14.7267 2.86073L14.7498 8.19299L14.7498 8.19767L14.7501 8.27285C14.7501 8.27613 14.7501 8.27942 14.7499 8.2827L14.7267 13.7186C14.7262 13.8302 14.6796 13.9364 14.5989 14.0134L13.3697 15.1901C13.2192 15.3341 12.9811 15.3355 12.829 15.1931L11.2508 13.7153L9.63424 15.2939C9.48367 15.4409 9.24124 15.4403 9.09141 15.2926L7.42189 13.6465L5.87709 15.1978C5.72647 15.349 5.48141 15.3481 5.33196 15.1958L3.42297 13.2512L1.58338 15.1051C1.43387 15.2556 1.19497 15.2572 1.04356 15.1088L0.39814 14.4751C0.319817 14.3983 0.275977 14.2935 0.276538 14.184L0.324975 2.80605C0.325526 2.69549 0.37176 2.59015 0.452607 2.51427L1.69581 1.35073C1.84735 1.20883 2.08526 1.2118 2.23321 1.35727L3.73037 2.82943L5.47078 1.09908ZM11.0833 12.8264L12.088 11.8349L12.0996 11.7621L9.95234 9.6322L8.16498 11.4407L11.0238 12.8805L11.0833 12.8264ZM11.7453 12.1542L13.3398 10.5818L13.4363 8.34793L11.7453 12.1542ZM13.4485 8.10158L13.7267 2.85699L12.857 3.71476L12.8555 3.7163L9.93644 6.61006L13.4485 8.10158ZM9.23593 6.59938L7.6329 8.19225L9.91306 9.00478L12.1503 3.96772L9.23593 6.59938ZM9.21953 9.36562L7.22159 8.65387L5.01498 10.8381L9.30625 9.65428L9.21953 9.36562ZM4.38946 10.812L6.89333 8.33025L5.89213 5.64498L3.60291 8.60337L4.38946 10.812ZM3.01771 8.80047L5.28 5.87612L3.99139 2.4205L1.35006 5.71457L3.01771 8.80047ZM1.31073 6.16424L3.62213 3.26957L2.22972 1.90124L1.32556 2.74748L1.31073 6.16424ZM3.92817 3.08498L5.68662 1.33687L5.74775 1.3982L7.07396 2.69567L3.92817 3.08498ZM7.69553 2.76534L8.72684 3.775L5.29117 4.20039L7.30553 3.14969L7.69553 2.76534ZM8.25455 4.47919L9.36338 3.39267L6.66194 4.79901L8.25455 4.47919ZM6.42675 5.22069L5.56497 4.90841L4.67468 5.37231L5.91289 4.87389L6.17938 5.58898L6.42675 5.22069ZM9.55223 3.24424L9.32319 3.46813L9.66419 3.37553L9.55223 3.24424ZM6.0584 8.60413L6.69552 8.98166L4.3893 11.2631L4.40994 11.3104L4.10368 11.2215L4.62766 10.6849L6.0584 8.60413Z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 15 15" fill="currentColor">
      <path d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2Z" />
    </svg>
  )
}

function ImageIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2C2.22386 2 2 2.22386 2 2.5V8.36396L4.14645 6.21751C4.34171 6.02225 4.65829 6.02225 4.85355 6.21751L7.96667 9.33063L9.14645 8.15085C9.34171 7.95559 9.65829 7.95559 9.85355 8.15085L13 11.2973V2.5C13 2.22386 12.7761 2 12.5 2H2.5Z" />
    </svg>
  )
}
function VideoIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M4.76447 3.12199C5.63151 3.04859 6.56082 3 7.5 3C8.43918 3 9.36849 3.04859 10.2355 3.12199C11.1033 3.19544 11.8934 3.29725 12.5396 3.42989C12.8613 3.49596 13.1506 3.57186 13.3856 3.66213C13.602 3.74525 13.8498 3.87077 13.9684 4.0956C14.0884 4.32302 14.0313 4.5629 13.9554 4.74903C13.8724 4.95286 13.7094 5.19101 13.5007 5.44854C12.7241 6.40859 11.1813 7.5 7.5 7.5C3.81866 7.5 2.27593 6.40859 1.49925 5.44854C1.29058 5.19101 1.12758 4.95286 1.04457 4.74903C0.968717 4.5629 0.911647 4.32302 1.03158 4.0956C1.15015 3.87077 1.39799 3.74525 1.61441 3.66213C1.84943 3.57186 2.1387 3.49596 2.46035 3.42989C3.10665 3.29725 3.89674 3.19544 4.76447 3.12199ZM4.76447 11.878C5.63151 11.9514 6.56082 12 7.5 12C8.43918 12 9.36849 11.9514 10.2355 11.878C11.1033 11.8046 11.8934 11.7027 12.5396 11.5701C12.8613 11.504 13.1506 11.4281 13.3856 11.3379C13.602 11.2548 13.8498 11.1292 13.9684 10.9044C14.0884 10.677 14.0313 10.4371 13.9554 10.251C13.8724 10.0471 13.7094 9.80899 13.5007 9.55146C12.7241 8.59141 11.1813 7.5 7.5 7.5C3.81866 7.5 2.27593 8.59141 1.49925 9.55146C1.29058 9.80899 1.12758 10.0471 1.04457 10.251C0.968717 10.4371 0.911647 10.677 1.03158 10.9044C1.15015 11.1292 1.39799 11.2548 1.61441 11.3379C1.84943 11.4281 2.1387 11.504 2.46035 11.5701C3.10665 11.7027 3.89674 11.8046 4.76447 11.878Z" />
    </svg>
  )
}

function FontBoldIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M5.10505 12C4.70805 12 4.4236 11.7639 4.25533 11.4536L4.25209 11.4471C4.15351 11.2566 4.10505 11.0282 4.10505 10.78V4.22C4.10505 3.96177 4.15351 3.73416 4.25533 3.5464C4.35714 3.35934 4.55574 3.15926 4.83505 3.04778C5.11436 2.93631 5.41004 2.88 5.72203 2.88H7.55005C8.09265 2.88 8.58457 2.99561 9.02579 3.22682C9.46702 3.45803 9.81699 3.78337 10.0757 4.20285C10.3345 4.62234 10.4639 5.09667 10.4639 5.62585V5.67585C10.4639 6.20503 10.3345 6.67937 10.0757 7.09885C9.81699 7.51833 9.46702 7.84368 9.02579 8.07488C8.58457 8.30609 8.09265 8.4217 7.55005 8.4217H5.72203C5.57576 8.4217 5.44036 8.39961 5.31583 8.35543V10.78C5.31583 11.0282 5.26737 11.2566 5.16879 11.4471L5.16555 11.4536C4.99728 11.7639 4.71283 12 4.31583 12H5.10505ZM5.72203 7.2H7.55005C7.84774 7.2 8.11389 7.12937 8.3485 6.98812C8.58311 6.84687 8.76707 6.65428 8.90038 6.41037C9.0337 6.16645 9.10036 5.89394 9.10036 5.59285V5.59285C9.10036 5.29177 9.0337 5.01925 8.90038 4.77534C8.76707 4.53143 8.58311 4.33884 8.3485 4.19759C8.11389 4.05634 7.84774 3.98571 7.55005 3.98571H5.72203C5.57576 3.98571 5.44036 4.0078 5.31583 4.05198V7.14873C5.44036 7.19291 5.57576 7.2 5.72203 7.2Z" />
    </svg>
  )
}
function FontItalicIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M5.67494 3.50017C5.67494 3.25164 5.87641 3.05017 6.12494 3.05017H10.6249C10.8735 3.05017 11.0749 3.25164 11.0749 3.50017C11.0749 3.7487 10.8735 3.95017 10.6249 3.95017H8.75361L7.02735 11.0502H8.87494C9.12347 11.0502 9.32494 11.2517 9.32494 11.5002C9.32494 11.7487 9.12347 11.9502 8.87494 11.9502H4.37494C4.12641 11.9502 3.92494 11.7487 3.92494 11.5002C3.92494 11.2517 4.12641 11.0502 4.37494 11.0502H6.24627L7.97253 3.95017H6.12494C5.87641 3.95017 5.67494 3.7487 5.67494 3.50017Z" />
    </svg>
  )
}
function StrikethroughIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M5.00003 3.25C5.00003 2.97386 4.77617 2.75 4.50003 2.75C4.22389 2.75 4.00003 2.97386 4.00003 3.25V7.10003H2.49998C2.22384 7.10003 1.99998 7.32389 1.99998 7.60003C1.99998 7.87617 2.22384 8.10003 2.49998 8.10003H4.00003V11.75C4.00003 12.0261 4.22389 12.25 4.50003 12.25C4.77617 12.25 5.00003 12.0261 5.00003 11.75V8.10003H10V11.75C10 12.0261 10.2239 12.25 10.5 12.25C10.7762 12.25 11 12.0261 11 11.75V8.10003H12.5C12.7762 8.10003 13 7.87617 13 7.60003C13 7.32389 12.7762 7.10003 12.5 7.10003H11V3.25C11 2.97386 10.7762 2.75 10.5 2.75C10.2239 2.75 10 2.97386 10 3.25V7.10003H5.00003V3.25Z" />
    </svg>
  )
}
function TextAlignLeftIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H7.5C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H10.5C10.7761 10 11 10.2239 11 10.5C11 10.7761 10.7761 11 10.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z" />
    </svg>
  )
}
function TextAlignCenterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM4 7.5C4 7.22386 4.22386 7 4.5 7H10.5C10.7761 7 11 7.22386 11 7.5C11 7.77614 10.7761 8 10.5 8H4.5C4.22386 8 4 7.77614 4 7.5ZM3 10.5C3 10.2239 3.22386 10 3.5 10H11.5C11.7761 10 12 10.2239 12 10.5C12 10.7761 11.7761 11 11.5 11H3.5C3.22386 11 3 10.7761 3 10.5Z" />
    </svg>
  )
}
function TextAlignRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM7 7.5C7 7.22386 7.22386 7 7.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H7.5C7.22386 8 7 7.77614 7 7.5ZM4 10.5C4 10.2239 4.22386 10 4.5 10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7761 12.7761 11 12.5 11H4.5C4.22386 11 4 10.7761 4 10.5Z" />
    </svg>
  )
}
function MagicWandIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M13.9 0.499976C13.9 0.279062 13.7209 0.0999756 13.5 0.0999756C13.2791 0.0999756 13.1 0.279062 13.1 0.499976V1.09998H12.5C12.2791 1.09998 12.1 1.27906 12.1 1.49998C12.1 1.72089 12.2791 1.89998 12.5 1.89998H13.1V2.49998C13.1 2.72089 13.2791 2.89998 13.5 2.89998C13.7209 2.89998 13.9 2.72089 13.9 2.49998V1.89998H14.5C14.7209 1.89998 14.9 1.72089 14.9 1.49998C14.9 1.27906 14.7209 1.09998 14.5 1.09998H13.9V0.499976ZM11.8536 3.14642C12.0488 3.34168 12.0488 3.65827 11.8536 3.85353L3.85355 11.8535C3.65829 12.0488 3.34171 12.0488 3.14645 11.8535C2.95118 11.6583 2.95118 11.3417 3.14645 11.1464L11.1464 3.14642C11.3417 2.95116 11.6583 2.95116 11.8536 3.14642Z" />
    </svg>
  )
}

// ── Toggle Buttons Component ───────────────────────────────────
function ToggleButtons(props: {
  values: string[]
  value: string | string[]
  onChange: (v: any) => void
  multiple?: boolean
  children?: (value: string) => JSX.Element
}) {
  const isActive = (v: string) => (Array.isArray(props.value) ? props.value.includes(v) : props.value === v)

  return (
    <For each={props.values}>
      {(val) => (
        <button
          class={`${styles.toggleBtn} ${isActive(val) ? styles.toggleBtnActive : ""}`}
          onClick={() => {
            if (props.multiple && Array.isArray(props.value)) {
              props.onChange(isActive(val) ? props.value.filter((x: string) => x !== val) : [...props.value, val])
            } else {
              props.onChange(val)
            }
          }}
        >
          {props.children ? props.children(val) : val}
        </button>
      )}
    </For>
  )
}

// Color swatch helper
const swatchColors: Record<string, string> = {
  White: "white",
  Gray: "oklch(60% 0 0)",
  Black: "#1B1B18",
  Red: "oklch(55% 0.2 25deg)",
  Pink: "oklch(65% 0.2 350deg)",
  Violet: "oklch(50% 0.2 290deg)",
  Blue: "oklch(55% 0.18 260deg)",
  Green: "oklch(55% 0.15 170deg)",
  Beige: "#E5DFCF",
}

// ── Main E-commerce Component ──────────────────────────────────
export function ExampleEcommerce() {
  const [sneakersBookmarked, setSneakersBookmarked] = createSignal(false)
  const [jeansBookmarked, setJeansBookmarked] = createSignal(false)
  const [delivery, setDelivery] = createSignal("")
  const [size, setSize] = createSignal("9")
  const [material, setMaterial] = createSignal("")
  const [color, setColor] = createSignal("")
  const [productMaterial, setProductMaterial] = createSignal("")
  const [productColor, setProductColor] = createSignal("")
  const [productSizes, setProductSizes] = createSignal<string[]>([])

  return (
    <div class={styles.layout}>
      {/* ── Column 1 ──────────────────────────────────────── */}
      <div class={`${styles.col} ${styles.col1}`}>
        {/* Promo Card */}
        <div class={`${styles.card} ${styles.cardSm}`}>
          <img
            class={styles.productImg}
            src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=560&h=424&q=80"
            width="280"
            height="212"
            style={{ "margin-bottom": "8px" }}
          />
          <div class={styles.flexBetween}>
            <div>
              <a
                class={styles.linkBold}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{ "font-size": "0.875rem" }}
              >
                Back to basics
              </a>
              <p class={`${styles.textSm} ${styles.textMuted}`} style={{ margin: "0" }}>
                Simple and versatile
              </p>
            </div>
            <Button class={`${styles.btn} ${styles.btnSoft}`}>Shop now</Button>
          </div>
        </div>

        {/* Sneakers Product */}
        <div class={`${styles.card} ${styles.cardSm}`}>
          <div style={{ position: "relative", "margin-bottom": "8px" }}>
            <img
              class={styles.productImg}
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=560&h=540&q=80"
              width="280"
              height="270"
            />
            <button class={styles.bookmarkBtn} onClick={() => setSneakersBookmarked(!sneakersBookmarked())}>
              {sneakersBookmarked() ? <BookmarkFilledIcon /> : <BookmarkIcon />}
            </button>
          </div>
          <div class={`${styles.flexBetween} ${styles.alignEnd} ${styles.mb2}`}>
            <div>
              <a
                class={`${styles.linkBold} ${styles.textSm}`}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{ "margin-bottom": "4px", display: "block" }}
              >
                Footwear
              </a>
              <h3 class={styles.h3}>Sneakers #12</h3>
            </div>
            <span class={styles.text2Xl}>$149</span>
          </div>
          <p class={`${styles.textSm} ${styles.textMuted} ${styles.mb4}`} style={{ margin: "0 0 16px" }}>
            Love at the first sight for enthusiasts seeking a fresh and whimsical style.
          </p>
          <Separator class={styles.separator} style={{ margin: "16px 0" }} />
          <div class={`${styles.flex} ${styles.gap2} ${styles.alignEnd}`}>
            <div class={`${styles.flexCol} ${styles.flexGrow}`}>
              <label class={`${styles.textXs} ${styles.textMuted} ${styles.mb1}`}>Color</label>
              <select class={styles.select}>
                <option>Pastel</option>
                <option>Bright</option>
              </select>
            </div>
            <div class={styles.flexCol} style={{ "min-width": "80px" }}>
              <label class={`${styles.textXs} ${styles.textMuted} ${styles.mb1}`}>Size</label>
              <select class={styles.select}>
                {Array.from({ length: 12 }, (_, i) => (
                  <option>{i * 0.5 + 5}</option>
                ))}
              </select>
            </div>
            <Button class={`${styles.btn} ${styles.btnSolid}`}>Buy</Button>
          </div>
        </div>

        {/* Filter Panel */}
        <div class={`${styles.card} ${styles.cardSm}`}>
          <div class={`${styles.flexCol} ${styles.gap5}`}>
            <div>
              <div class={`${styles.textSm} ${styles.textBold} ${styles.mb2}`}>Delivery</div>
              <div class={`${styles.grid2} ${styles.gap1}`}>
                <ToggleButtons values={["Tomorrow", "Within 3 days"]} value={delivery()} onChange={setDelivery} />
              </div>
            </div>
            <div>
              <div class={`${styles.textSm} ${styles.textBold} ${styles.mb2}`}>Size</div>
              <div class={`${styles.grid5} ${styles.gap1}`}>
                <ToggleButtons
                  values={["5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"]}
                  value={size()}
                  onChange={setSize}
                />
              </div>
            </div>
            <div>
              <div class={`${styles.textSm} ${styles.textBold} ${styles.mb2}`}>Material</div>
              <div class={`${styles.grid4} ${styles.gap1}`}>
                <ToggleButtons
                  values={["Leather", "Suede", "Mesh", "Canvas"]}
                  value={material()}
                  onChange={setMaterial}
                />
              </div>
            </div>
            <div>
              <div class={`${styles.textSm} ${styles.textBold} ${styles.mb2}`}>Color</div>
              <div class={`${styles.grid3} ${styles.gap1}`}>
                <ToggleButtons values={Object.keys(swatchColors)} value={color()} onChange={setColor}>
                  {(val) => (
                    <>
                      <span class={styles.swatch} style={{ background: swatchColors[val] }} />
                      {val}
                    </>
                  )}
                </ToggleButtons>
              </div>
            </div>
          </div>
        </div>

        {/* Shopping Cart */}
        <div class={`${styles.card} ${styles.cardSm}`}>
          <h3 class={`${styles.h3} ${styles.mb3}`}>Shopping cart</h3>
          <div class={`${styles.flexCol} ${styles.gap3}`}>
            {[
              {
                name: "Poncho #4",
                url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80&crop=entropy",
                caption: "Size M",
                count: "1",
                price: "$79",
              },
              {
                name: "Jeans #8",
                url: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80&crop=entropy",
                caption: "Size 30",
                count: "2",
                price: "$118",
              },
              {
                name: "Sneakers #14",
                url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80&crop=center",
                caption: "Size 8",
                count: "1",
                price: "$116",
              },
            ].map((item) => (
              <div class={`${styles.flexCenter} ${styles.justifyBetween} ${styles.gap4}`}>
                <div class={`${styles.flexCenter} ${styles.gap2} ${styles.flexGrow}`} style={{ height: "32px" }}>
                  <img src={item.url} class={styles.productImgSmall} />
                  <div>
                    <a
                      class={styles.linkBold}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      style={{ "font-size": "0.875rem" }}
                    >
                      {item.name}
                    </a>
                    <div class={`${styles.textXs} ${styles.textMuted}`}>{item.caption}</div>
                  </div>
                </div>
                <select class={`${styles.select} ${styles.selectSm}`} style={{ width: "48px" }}>
                  {Array.from({ length: 9 }, (_, i) => (
                    <option selected={String(i + 1) === item.count}>{i + 1}</option>
                  ))}
                </select>
                <span class={`${styles.textSm} ${styles.textBold}`} style={{ width: "40px", "text-align": "right" }}>
                  {item.price}
                </span>
              </div>
            ))}
          </div>
          <Separator class={styles.separator} style={{ margin: "16px 0" }} />
          <div class={styles.flexBetween}>
            <span class={styles.textSm}>
              Total <strong>$313</strong>
            </span>
            <Button class={`${styles.btn} ${styles.btnSolid}`}>Go to checkout</Button>
          </div>
        </div>
      </div>

      {/* ── Column 2 ──────────────────────────────────────── */}
      <div class={`${styles.col} ${styles.col2}`}>
        {/* Jeans Product */}
        <div class={`${styles.card} ${styles.cardSm}`}>
          <div style={{ position: "relative", "margin-bottom": "8px" }}>
            <img
              class={styles.productImg}
              src="https://images.unsplash.com/photo-1577210897949-1f56f943bf82?ixlib=rb-4.0.3&auto=format&fit=crop&w=560&h=540&q=80&crop=bottom"
              width="280"
              height="270"
            />
            <button class={styles.bookmarkBtn} onClick={() => setJeansBookmarked(!jeansBookmarked())}>
              {jeansBookmarked() ? <BookmarkFilledIcon /> : <BookmarkIcon />}
            </button>
          </div>
          <div class={`${styles.flexBetween} ${styles.alignEnd} ${styles.mb2}`}>
            <div>
              <a
                class={`${styles.linkBold} ${styles.textSm}`}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{ display: "block", "margin-bottom": "4px" }}
              >
                Pants and jeans
              </a>
              <h3 class={styles.h3}>Jeans #7</h3>
            </div>
            <span class={styles.text2Xl}>$149</span>
          </div>
          <p class={`${styles.textSm} ${styles.textMuted}`} style={{ margin: "0 0 16px" }}>
            Jeans with a sense of nostalgia, as if they carry whispered tales of past adventures.
          </p>
          <Separator class={styles.separator} style={{ margin: "16px 0" }} />
          <div class={`${styles.flex} ${styles.gap2} ${styles.alignEnd}`}>
            <div class={`${styles.flexCol} ${styles.flexGrow}`}>
              <label class={`${styles.textXs} ${styles.textMuted} ${styles.mb1}`}>Color</label>
              <select class={styles.select}>
                <option>Lighter</option>
                <option>Darker</option>
              </select>
            </div>
            <div class={styles.flexCol}>
              <label class={`${styles.textXs} ${styles.textMuted} ${styles.mb1}`}>Size</label>
              <select class={styles.select}>
                {Array.from({ length: 17 }, (_, i) => (
                  <option>{i + 24}</option>
                ))}
              </select>
            </div>
            <Button class={`${styles.btn} ${styles.btnSolid}`}>Add to cart</Button>
          </div>
        </div>

        {/* Promo 2 */}
        <div class={`${styles.card} ${styles.cardSm}`}>
          <img
            class={styles.productImg}
            src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixlib=rb-4.0.3&auto=format&fit=crop&w=560&h=424&q=80"
            width="280"
            height="212"
            style={{ "margin-bottom": "8px" }}
          />
          <div class={styles.flexBetween}>
            <div>
              <a
                class={styles.linkBold}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{ "font-size": "0.875rem" }}
              >
                Unexpected pairings
              </a>
              <p class={`${styles.textSm} ${styles.textMuted}`} style={{ margin: "0" }}>
                Break the fashion norms
              </p>
            </div>
            <Button class={`${styles.btn} ${styles.btnSoft}`}>Shop now</Button>
          </div>
        </div>

        {/* Delivery */}
        <div class={`${styles.card} ${styles.cardSm}`}>
          <h3 class={`${styles.h3} ${styles.mb3}`}>Delivery</h3>
          <span
            class={`${styles.badge} ${styles.badgeAmber}`}
            style={{ position: "absolute", top: "8px", right: "8px" }}
          >
            Guaranteed
          </span>
          <div class={styles.mb4}>
            <div class={`${styles.textSm} ${styles.textBold} ${styles.mb1}`}>Tomorrow</div>
            <div class={styles.textSm}>12:00 pm – 2:00 pm</div>
          </div>
          <div class={styles.mb4}>
            <div class={`${styles.textSm} ${styles.textBold} ${styles.mb1}`}>Luna Rodriguez</div>
            <div class={styles.textSm}>9876 Maple Avenue</div>
            <div class={styles.textSm}>Cityville, WA 54321</div>
          </div>
          <img
            class={styles.productImg}
            src="https://workos.imgix.net/images/bc04b345-f225-488d-8a46-1811096d0c3b.png?auto=format&fit=clip&q=90&w=840&h=654"
            width="280"
            height="218"
            style={{ "margin-bottom": "16px" }}
          />
          <div class={`${styles.flexEnd} ${styles.gap2}`}>
            <Button class={`${styles.btn} ${styles.btnSoft}`}>Edit</Button>
            <Button class={`${styles.btn} ${styles.btnSolid}`}>Confirm</Button>
          </div>
        </div>

        {/* Bookmarks */}
        <div class={`${styles.card} ${styles.cardSm}`}>
          <div class={`${styles.flexBetween} ${styles.mb2}`}>
            <h3 class={styles.h3}>Bookmarks</h3>
            <Button class={`${styles.btn} ${styles.btnGhost} ${styles.btnXs}`}>Buy all</Button>
          </div>
          <div class={`${styles.grid2} ${styles.gap2}`} style={{ "row-gap": "16px" }}>
            {[
              {
                name: "Jeans #8",
                url: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=272&h=272&q=80&crop=entropy",
                price: "$118",
              },
              {
                name: "Jacket #3",
                url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&crop=entropy&w=272&h=272&q=80",
                price: "$49",
              },
              {
                name: "Pants #10",
                url: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=272&h=272&q=80",
                price: "$32",
              },
              {
                name: "Shirt #11",
                url: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=272&h=272&q=80",
                price: "$39",
              },
            ].map((item) => (
              <div>
                <img src={item.url} style={{ "border-radius": "6px", width: "100%", "margin-bottom": "8px" }} />
                <span class={`${styles.textSm} ${styles.textMuted}`}>
                  <a
                    class={styles.linkBold}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ "font-size": "0.875rem" }}
                  >
                    {item.name}
                  </a>
                  , {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Column 3: Edit Product, Orders ────────────────── */}
      <div class={`${styles.col} ${styles.col3}`}>
        {/* Product Discarded */}
        <div class={`${styles.card} ${styles.cardMd}`}>
          <div class={`${styles.flexCol} ${styles.alignCenter} ${styles.py2}`}>
            <div class={styles.mb2}>
              <CrumpledPaperIcon />
            </div>
            <h3 class={`${styles.h3} ${styles.h3Lg} ${styles.mb1}`}>Product discarded</h3>
            <p class={`${styles.textSm} ${styles.textMuted} ${styles.mb4}`} style={{ margin: "0 0 16px" }}>
              It's still available in the{" "}
              <a class={styles.link} href="#" onClick={(e) => e.preventDefault()}>
                archive
              </a>
              .
            </p>
            <div class={`${styles.flex} ${styles.gap2}`}>
              <Button class={`${styles.btn} ${styles.btnSoft}`}>Undo</Button>
              <Button class={`${styles.btn} ${styles.btnSolid}`}>Done</Button>
            </div>
          </div>
        </div>

        {/* Edit Product */}
        <div class={`${styles.card} ${styles.cardMd}`}>
          <h3 class={`${styles.h3} ${styles.h3Lg} ${styles.mb4}`}>Edit product</h3>
          <div class={`${styles.grid5} ${styles.gap2} ${styles.mb4}`}>
            <div class={styles.span4of5}>
              <label
                class={`${styles.textSm} ${styles.textBold}`}
                style={{ display: "inline-block", "margin-bottom": "8px" }}
              >
                Title
              </label>
              <input class={styles.inputField} value="Skirt #16" />
            </div>
            <div>
              <label
                class={`${styles.textSm} ${styles.textBold}`}
                style={{ display: "inline-block", "margin-bottom": "8px" }}
              >
                Price
              </label>
              <input class={styles.inputField} value="$99" />
            </div>
          </div>
          <div class={styles.mb4}>
            <div
              class={`${styles.textSm} ${styles.textBold}`}
              style={{ display: "inline-block", "margin-bottom": "8px" }}
            >
              Media
            </div>
            <div class={`${styles.grid3} ${styles.gap2}`}>
              <img
                class={styles.mediaImg}
                src="https://images.unsplash.com/photo-1551163943-3f6a855d1153?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80&crop=bottom"
              />
              <img
                class={styles.mediaImg}
                src="https://workos.imgix.net/images/c773ee38-9136-49d1-804c-6d166dad9c65.png?auto=format&fit=clip&q=80w=400&h=400"
              />
              <div class={styles.mediaUpload}>
                <div class={`${styles.grid2} ${styles.gap2}`} style={{ padding: "8px" }}>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <ImageIcon />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <VideoIcon />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <ImageIcon />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <ImageIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class={styles.mb4}>
            <label
              class={`${styles.textSm} ${styles.textBold}`}
              style={{ display: "inline-block", "margin-bottom": "8px" }}
            >
              Description
            </label>
            <div style={{ position: "relative" }}>
              <textarea class={styles.textarea} rows={10} spellcheck={false}>
                Amidst the soft hues and delicate silence, one's gaze is always drawn towards this skirt. The fabric
                seems to possess a story of its own, woven with threads of history and whispered secrets. Its savory
                color, reminiscent of lush meadows in spring, holds the promise of new beginnings. Delicate ruffles
                cascade elegantly, like gentle waves lapping against an untouched shore.
              </textarea>
              <div class={styles.textareaToolbar}>
                <div class={`${styles.flex} ${styles.gap1}`}>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <FontItalicIcon />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <FontBoldIcon />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <StrikethroughIcon />
                  </button>
                </div>
                <div class={`${styles.flex} ${styles.gap1}`}>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <TextAlignLeftIcon />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <TextAlignCenterIcon />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <TextAlignRightIcon />
                  </button>
                </div>
                <div class={`${styles.flex} ${styles.gap1}`}>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <MagicWandIcon />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <ImageIcon />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <CrumpledPaperIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class={styles.mb4}>
            <div
              class={`${styles.textSm} ${styles.textBold}`}
              style={{ display: "inline-block", "margin-bottom": "8px" }}
            >
              Main material
            </div>
            <div class={`${styles.grid3} ${styles.gap1}`}>
              <ToggleButtons
                values={["Synthetic", "Wool", "Cotton", "Linen", "Denim", "Leather", "Silk", "Chiffon", "Other"]}
                value={productMaterial()}
                onChange={setProductMaterial}
              />
            </div>
          </div>
          <div class={styles.mb4}>
            <div
              class={`${styles.textSm} ${styles.textBold}`}
              style={{ display: "inline-block", "margin-bottom": "8px" }}
            >
              Main color
            </div>
            <div class={`${styles.grid3} ${styles.gap1}`}>
              <ToggleButtons values={Object.keys(swatchColors)} value={productColor()} onChange={setProductColor}>
                {(val) => (
                  <>
                    <span class={styles.swatch} style={{ background: swatchColors[val] }} />
                    {val}
                  </>
                )}
              </ToggleButtons>
            </div>
          </div>
          <div>
            <div
              class={`${styles.textSm} ${styles.textBold}`}
              style={{ display: "inline-block", "margin-bottom": "8px" }}
            >
              Sizes
            </div>
            <div class={`${styles.grid3} ${styles.gap1}`}>
              <ToggleButtons
                multiple
                values={["XS", "S", "M", "L", "XL"]}
                value={productSizes()}
                onChange={setProductSizes}
              />
            </div>
          </div>
        </div>

        {/* Orders */}
        <div class={`${styles.card} ${styles.cardMd}`}>
          <div class={`${styles.flexBetween} ${styles.mb4}`}>
            <h3 class={`${styles.h3} ${styles.h3Lg}`}>Orders</h3>
            <Button class={`${styles.btn} ${styles.btnGhost} ${styles.btnSm}`}>
              <CalendarIcon /> May 2023
            </Button>
          </div>
          <div class={`${styles.ordersGrid} ${styles.mb4}`}>
            <span class={`${styles.textSm} ${styles.textMuted}`}>Order no.</span>
            <span class={`${styles.textSm} ${styles.textMuted}`}>Payment</span>
            <span class={`${styles.textSm} ${styles.textMuted}`}>Fulfillment</span>
            <span class={`${styles.textSm} ${styles.textMuted} ${styles.textRight}`}>Amount</span>
            <div class={styles.spanFull}>
              <Separator class={styles.separator} />
            </div>
            {(
              [
                {
                  id: 1005,
                  pay: "Paid",
                  payColor: "Teal" as const,
                  ful: "Delivering",
                  fulColor: "Amber" as const,
                  amount: "$154.60",
                },
                {
                  id: 1004,
                  pay: "Paid",
                  payColor: "Teal" as const,
                  ful: "Unfulfilled",
                  fulColor: "Amber" as const,
                  amount: "$93.49",
                },
                {
                  id: 1003,
                  pay: "Refunded",
                  payColor: "Gray" as const,
                  ful: "Cancelled",
                  fulColor: "Red" as const,
                  amount: "$39.00",
                },
                {
                  id: 1002,
                  pay: "Unpaid",
                  payColor: "Amber" as const,
                  ful: "Unfulfilled",
                  fulColor: "Amber" as const,
                  amount: "$438.90",
                },
                {
                  id: 1001,
                  pay: "Paid",
                  payColor: "Teal" as const,
                  ful: "Fulfilled",
                  fulColor: "Teal" as const,
                  amount: "$532.64",
                },
                {
                  id: 1000,
                  pay: "Paid",
                  payColor: "Teal" as const,
                  ful: "Fulfilled",
                  fulColor: "Teal" as const,
                  amount: "$625.03",
                },
              ] as const
            ).map((order) => {
              const badgeClass = (c: string) =>
                c === "Teal"
                  ? styles.badgeTeal
                  : c === "Red"
                    ? styles.badgeRed
                    : c === "Amber"
                      ? styles.badgeAmber
                      : styles.badgeGray
              return (
                <>
                  <a
                    class={styles.linkBold}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ "font-size": "0.875rem" }}
                  >
                    #{order.id}
                  </a>
                  <span>
                    <span class={`${styles.badge} ${badgeClass(order.payColor)}`}>{order.pay}</span>
                  </span>
                  <span>
                    <span class={`${styles.badge} ${badgeClass(order.fulColor)}`}>{order.ful}</span>
                  </span>
                  <span class={`${styles.textSm} ${styles.textRight}`}>{order.amount}</span>
                </>
              )
            })}
          </div>
          <div class={styles.flexEnd}>
            <Button class={`${styles.btn} ${styles.btnSoft}`}>Show more</Button>
          </div>
        </div>
      </div>

      {/* ── Column 4: Shipment, Promo, Top Customers ──────── */}
      <div class={`${styles.col} ${styles.col4}`}>
        {/* Shipment Tracking */}
        <div class={`${styles.card} ${styles.cardMd}`}>
          <h3 class={`${styles.h3} ${styles.h3Lg} ${styles.mb4}`}>Shipment tracking</h3>
          <div class={`${styles.inputWithIcon} ${styles.mb5}`}>
            <span class={styles.inputIcon}>
              <MagnifyingGlassIcon />
            </span>
            <input class={styles.inputField} placeholder="Enter package number" />
          </div>
          <div class={styles.grid2}>
            <div class={`${styles.flexCol} ${styles.gap4}`} style={{ "padding-right": "24px" }}>
              <div>
                <div class={`${styles.textSm} ${styles.textBold} ${styles.mb1}`}>Package number</div>
                <div class={styles.textMd}>LASC966124786554</div>
              </div>
              <div>
                <div class={`${styles.textSm} ${styles.textBold} ${styles.mb1}`}>Order number</div>
                <a
                  class={styles.linkBold}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{ "font-size": "0.875rem" }}
                >
                  #94356
                </a>
              </div>
              <div>
                <div class={`${styles.textSm} ${styles.textBold} ${styles.mb1}`}>Ship to</div>
                <div class={`${styles.textMd} ${styles.mb1}`}>Sophia Martinez</div>
                <div class={`${styles.textSm} ${styles.textMuted}`}>
                  512 Oakwood Avenue, Unit 201, Greenville, SC 67890
                </div>
              </div>
              <div class={`${styles.grid3}`}>
                <div>
                  <div class={`${styles.textSm} ${styles.textBold} ${styles.mb1}`}>Status</div>
                  <span class={`${styles.badge} ${styles.badgeGreen}`}>On time</span>
                </div>
                <div>
                  <div class={`${styles.textSm} ${styles.textBold} ${styles.mb1}`}>Weight</div>
                  <div class={styles.textMd}>3 lb</div>
                </div>
                <div>
                  <div class={`${styles.textSm} ${styles.textBold} ${styles.mb1}`}>Order total</div>
                  <div class={styles.textMd}>$243</div>
                </div>
              </div>
            </div>
            <div class={styles.timeline}>
              <div class={styles.timelineLine} />
              {[
                { date: "July 1, 2023, 10:28 AM", text: "Package picked up from the warehouse in Phoenix, TX" },
                { date: "July 1, 2023, 12:43 PM", text: "Departed from Phoenix, TX" },
                { date: "July 2, 2023, 3:20 PM", text: "Arrived at a sorting facility in Seattle, WA" },
                { date: "July 2, 2023, 7:31 PM", text: "Departed Seattle, WA" },
                { date: "July 2, 2023, 11:03 PM", text: "Arrived to a facility in Greenville, WA" },
              ].map((evt) => (
                <div class={styles.timelineEvent}>
                  <div class={styles.timelineDot} />
                  <div class={`${styles.textXs} ${styles.textMuted} ${styles.mb1}`}>{evt.date}</div>
                  <div class={styles.textSm}>{evt.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promotional Banner */}
        <div class={styles.card}>
          <div class={styles.promoGrid}>
            <div class={styles.promoCell}>
              <h3 class={`${styles.h3} ${styles.h3Xl} ${styles.mb2}`}>Dare to stand out</h3>
              <p class={`${styles.textMd} ${styles.mb3}`}>Striking patterns, vibrant hues, and unusual designs.</p>
              <Button class={`${styles.btn} ${styles.btnSolid}`}>Shop now</Button>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1514866747592-c2d279258a78?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80" />
            </div>
            <div
              class={styles.promoCell}
              style={{ "font-size": "0.6875rem", color: "var(--ui-muted)", "line-height": "20px" }}
            >
              <span style={{ "margin-right": "6px" }}>Men's</span>
              {[
                "Polo #11",
                "Shirt #12",
                "Shirt #24",
                "Sneakers #3",
                "Jeans #9",
                "T-shirt #4",
                "Pants #20",
                "Socks #9",
                "Watch #15",
                "Belt #7",
                "Bag #6",
              ].map((p) => (
                <>
                  <a
                    class={styles.linkBold}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ "margin-right": "6px", "font-size": "0.6875rem" }}
                  >
                    {p}
                  </a>
                  <wbr />
                </>
              ))}
              <span style={{ "margin-right": "6px" }}>Women's</span>
              {[
                "Blouse #16",
                "Dress #3",
                "Skirt #22",
                "Heels #13",
                "Sandals #18",
                "Bag #14",
                "Scarf #19",
                "Earrings #23",
                "Bracelet #21",
              ].map((p) => (
                <>
                  <a
                    class={styles.linkBold}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ "margin-right": "6px", "font-size": "0.6875rem" }}
                  >
                    {p}
                  </a>
                  <wbr />
                </>
              ))}
            </div>
            <div>
              <img src="https://plus.unsplash.com/premium_photo-1668485968648-f29fe5157463?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80" />
            </div>
            <div class={`${styles.promoCell} ${styles.flexCol} ${styles.alignCenter} ${styles.justifyBetween}`}>
              <span class={`${styles.textXs} ${styles.textCenter} ${styles.textMuted}`}>15 – 30 Mar</span>
              <span class={styles.text4Xl} style={{ "margin-right": "16px" }}>
                -25%
              </span>
              <span class={`${styles.textXs} ${styles.textCenter} ${styles.textMuted}`}>Get our boldest designs.</span>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1532660621034-fb55e2e59762?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700&q=80" />
            </div>
          </div>
        </div>

        {/* Top Customers */}
        <div class={`${styles.card} ${styles.cardMd}`}>
          <h3 class={`${styles.h3} ${styles.h3Lg} ${styles.mb4}`}>Top customers</h3>
          <div class={`${styles.flex} ${styles.gap2} ${styles.mb5}`}>
            <div class={`${styles.inputWithIcon} ${styles.flexGrow}`}>
              <span class={styles.inputIcon}>
                <MagnifyingGlassIcon />
              </span>
              <input class={styles.inputField} placeholder="Search" />
            </div>
            <select class={styles.select} style={{ "min-width": "140px" }}>
              <option>All customers</option>
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>
          </div>
          <div class={`${styles.flexCol} ${styles.gap5}`}>
            {[
              {
                name: "Elijah Wilson",
                address: "735 Pine Street, Apartment 4C, Portland, OR 34567",
                since: "November 3, 2017",
                sales: "$15,432.56",
                orders: 42,
              },
              {
                name: "Cameron Johnson",
                address: "2465 Main Street, Apt 3B, Springfield, OH 12345",
                since: "June 10, 2020",
                sales: "$13,976.43",
                orders: 12,
              },
              {
                name: "Sophia Martinez",
                address: "512 Oakwood Avenue, Unit 201, Greenville, SC 67890",
                since: "September 27, 2019",
                sales: "$11,653.03",
                orders: 34,
              },
              {
                name: "Nathan Thompson",
                address: "837 Maple Lane, Suite 102, Lexington, KY 45678",
                since: "May 5, 2018",
                sales: "$8,245.92",
                orders: 22,
              },
              {
                name: "Olivia Adams",
                address: "1123 Elmwood Drive, Boulder, CO 23456",
                since: "January 12, 2021",
                sales: "$6,789.21",
                orders: 18,
              },
            ].map((c) => (
              <div class={styles.customerRow}>
                <div>
                  <a
                    class={styles.linkBold}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ "font-size": "0.9375rem" }}
                  >
                    {c.name}
                  </a>
                  <div class={`${styles.textSm} ${styles.mb2}`}>Customer since {c.since}</div>
                  <div class={`${styles.textXs} ${styles.textMuted}`}>{c.address}</div>
                </div>
                <div class={styles.customerStats}>
                  <div class={styles.customerStat}>
                    <span class={`${styles.textSm} ${styles.textMuted} ${styles.textRight}`}>Sales</span>
                    <span class={`${styles.text2Xl} ${styles.textRight}`}>{c.sales}</span>
                  </div>
                  <div class={styles.separatorV} style={{ height: "48px" }} />
                  <div class={styles.customerStat} style={{ "min-width": "70px" }}>
                    <span class={`${styles.textSm} ${styles.textMuted}`}>Orders</span>
                    <span class={styles.text2Xl}>{c.orders}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
