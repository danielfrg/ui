import { createSignal, For, Show, type JSX } from "solid-js"
import * as Avatar from "@danielfrg/ui/avatar"
import { Button } from "@danielfrg/ui/button"
import * as Checkbox from "@danielfrg/ui/checkbox"
import * as Switch from "@danielfrg/ui/switch"
import { Separator } from "@danielfrg/ui/separator"
import { Menu } from "@danielfrg/ui/menu"
import * as Input from "@danielfrg/ui/input"
import { allPeople, email } from "./people"
import styles from "./dashboard.module.css"

// ── SVG Icons ──────────────────────────────────────────────────
function ArrowUpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 15 15" fill="currentColor">
      <path d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" />
    </svg>
  )
}

function ArrowDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 15 15" fill="currentColor">
      <path d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.65829 13.0488 7.34171 13.0488 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z" />
    </svg>
  )
}

function CheckIcon(props: { width?: number; height?: number }) {
  return (
    <svg width={props.width ?? 14} height={props.height ?? 14} viewBox="0 0 15 15" fill="currentColor">
      <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3354 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.5553 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" />
    </svg>
  )
}

function DotsHorizontalIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" />
    </svg>
  )
}

function Cross2Icon() {
  return (
    <svg width="20" height="20" viewBox="0 0 15 15" fill="currentColor">
      <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 15 15" fill="currentColor">
      <path d="M9.62129 1.13607C9.81656 0.940808 10.1331 0.940808 10.3284 1.13607L14.8638 5.67147C15.059 5.86673 15.059 6.18331 14.8638 6.37858C14.6685 6.57384 14.3519 6.57384 14.1567 6.37858L13.1038 5.32568L10.4628 7.96672L10.2282 10.6708C10.2152 10.8155 10.1421 10.9481 10.0265 11.0349L7.24739 13.1186C6.99812 13.3053 6.64724 13.2775 6.43298 13.0548L4.37829 10.9295L1.85355 13.4543C1.65829 13.6495 1.34171 13.6495 1.14645 13.4543C0.951184 13.259 0.951184 12.9424 1.14645 12.7472L3.67119 10.2224L1.54095 8.16278C1.31824 7.94851 1.29043 7.59763 1.47718 7.34836L3.56085 4.56929C3.64767 4.45365 3.78023 4.38053 3.92494 4.36752L6.62905 4.13297L9.27009 1.49192L8.21719 0.439028C8.02193 0.243766 8.02193 -0.0728168 8.21719 -0.268079C8.41246 -0.463341 8.72904 -0.463341 8.9243 -0.268079L9.62129 1.13607ZM9.99996 7.25961L7.65281 4.91246L7.00586 4.96884L4.31224 5.19746L2.66498 7.40463L7.19143 11.8534L9.39853 10.2062L9.62715 7.51254L9.56079 6.86559L9.99996 7.25961Z" />
    </svg>
  )
}

function PinFilledIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 15 15" fill="currentColor">
      <path d="M9.62129 1.13607C9.81656 0.940808 10.1331 0.940808 10.3284 1.13607L14.8638 5.67147C15.059 5.86673 15.059 6.18331 14.8638 6.37858C14.6685 6.57384 14.3519 6.57384 14.1567 6.37858L13.1038 5.32568L10.4628 7.96672L10.2282 10.6708C10.2152 10.8155 10.1421 10.9481 10.0265 11.0349L7.24739 13.1186C6.99812 13.3053 6.64724 13.2775 6.43298 13.0548L4.37829 10.9295L1.85355 13.4543C1.65829 13.6495 1.34171 13.6495 1.14645 13.4543C0.951184 13.259 0.951184 12.9424 1.14645 12.7472L3.67119 10.2224L1.54095 8.16278C1.31824 7.94851 1.29043 7.59763 1.47718 7.34836L3.56085 4.56929C3.64767 4.45365 3.78023 4.38053 3.92494 4.36752L6.62905 4.13297L9.27009 1.49192L8.21719 0.439028C8.02193 0.243766 8.02193 -0.0728168 8.21719 -0.268079C8.41246 -0.463341 8.72904 -0.463341 8.9243 -0.268079L9.62129 1.13607Z" />
    </svg>
  )
}

function OpenInNewWindowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 15 15" fill="currentColor">
      <path d="M12 13C12.5523 13 13 12.5523 13 12V3C13 2.44771 12.5523 2 12 2H3C2.44771 2 2 2.44771 2 3V6.5C2 6.77614 2.22386 7 2.5 7C2.77614 7 3 6.77614 3 6.5V3H12V12H8.5C8.22386 12 8 12.2239 8 12.5C8 12.7761 8.22386 13 8.5 13H12ZM9 6.5C9 6.5001 9 6.50021 9 6.50031V6.50031C9 6.7765 8.77614 7 8.5 7H2.5C2.22386 7 2 7.22386 2 7.5V12.5C2 12.7761 2.22386 13 2.5 13H7.5C7.77614 13 8 12.7761 8 12.5V7.5C8 7.22386 8.22386 7 8.5 7C8.77614 7 9 6.77614 9 6.5Z" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 15 15" fill="currentColor">
      <path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.77620 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00006H5.5C4.67157 4.00006 4 4.67163 4 5.50006V12.5001C4 13.3285 4.67157 14.0001 5.5 14.0001H12.5C13.3284 14.0001 14 13.3285 14 12.5001V5.50006C14 4.67163 13.3284 4.00006 12.5 4.00006H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50006C5 5.22392 5.22386 5.00006 5.5 5.00006H12.5C12.7761 5.00006 13 5.22392 13 5.50006V12.5001C13 12.7762 12.7761 13.0001 12.5 13.0001H5.5C5.22386 13.0001 5 12.7762 5 12.5001V5.50006Z" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 15 15" fill="currentColor">
      <path d="M3.5 5.00006C3.22386 5.00006 3 5.22392 3 5.50006V11.5001C3 11.7762 3.22386 12.0001 3.5 12.0001H11.5C11.7761 12.0001 12 11.7762 12 11.5001V8.50006C12 8.22392 12.2239 8.00006 12.5 8.00006C12.7761 8.00006 13 8.22392 13 8.50006V11.5001C13 12.3285 12.3284 13.0001 11.5 13.0001H3.5C2.67157 13.0001 2 12.3285 2 11.5001V5.50006C2 4.67163 2.67157 4.00006 3.5 4.00006H6.5C6.77614 4.00006 7 4.22392 7 4.50006C7 4.77620 6.77614 5.00006 6.5 5.00006H3.5ZM9 2.50006C9 2.22392 9.22386 2.00006 9.5 2.00006H13.5C13.7761 2.00006 14 2.22392 14 2.50006V6.50006C14 6.77620 13.7761 7.00006 13.5 7.00006C13.2239 7.00006 13 6.77620 13 6.50006V3.70717L8.85355 7.85361C8.65829 8.04888 8.34171 8.04888 8.14645 7.85361C7.95118 7.65835 7.95118 7.34177 8.14645 7.14651L12.2929 3.00006H9.5C9.22386 3.00006 9 2.77620 9 2.50006Z" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 15 15" fill="currentColor">
      <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" />
    </svg>
  )
}

// ── Marker helper ──────────────────────────────────────────────
function Marker(props: { children: JSX.Element; large?: boolean }) {
  return <span class={`${styles.marker} ${props.large ? styles.markerLg : ""}`}>{props.children}</span>
}

// ── ToDoList sub-component ─────────────────────────────────────
interface ToDoItem {
  id: string
  completed: boolean
}

const todoContent: Record<string, () => JSX.Element> = {
  a: () => (
    <span>
      Respond to comment{" "}
      <a class={styles.link} href="#" onClick={(e) => e.preventDefault()}>
        #384
      </a>{" "}
      from Travis Ross
    </span>
  ),
  b: () => (
    <span>
      Invite{" "}
      <a class={styles.link} href="#" onClick={(e) => e.preventDefault()}>
        Acme Co.
      </a>{" "}
      team to Slack
    </span>
  ),
  c: () => (
    <span>
      Create a report{" "}
      <a class={styles.link} href="#" onClick={(e) => e.preventDefault()}>
        requested
      </a>{" "}
      by Danilo Sousa
    </span>
  ),
  d: () => (
    <span>
      Review support request{" "}
      <a class={styles.link} href="#" onClick={(e) => e.preventDefault()}>
        #85
      </a>
    </span>
  ),
  e: () => <span>Close Q2 finances</span>,
  f: () => (
    <span>
      Review invoice{" "}
      <a class={styles.link} href="#" onClick={(e) => e.preventDefault()}>
        #3456
      </a>
    </span>
  ),
}

function ToDoList(props: { items: ToDoItem[]; onToggle: (id: string, checked: boolean) => void }) {
  return (
    <div class={`${styles.flexCol} ${styles.gap2}`}>
      <For each={props.items}>
        {(item) => (
          <Checkbox.Root
            checked={item.completed}
            onChange={(checked) => props.onToggle(item.id, checked)}
            class={styles.todoItem}
          >
            <Checkbox.Input />
            <Checkbox.Control class={styles.checkboxControl}>
              <Checkbox.Indicator class={styles.checkboxIndicator}>
                <CheckIcon width={10} height={10} />
              </Checkbox.Indicator>
            </Checkbox.Control>
            <span class={item.completed ? styles.todoCompleted : ""} style={{ "font-size": "0.875rem" }}>
              {todoContent[item.id]?.()}
            </span>
          </Checkbox.Root>
        )}
      </For>
    </div>
  )
}

// ── Main Dashboard Component ───────────────────────────────────
export function ExampleDashboard() {
  const [todo, setTodo] = createSignal<ToDoItem[]>([
    { id: "a", completed: false },
    { id: "b", completed: false },
    { id: "c", completed: false },
    { id: "d", completed: false },
    { id: "e", completed: true },
    { id: "f", completed: true },
  ])
  const [activityPinned, setActivityPinned] = createSignal(true)
  const [financePinned, setFinancePinned] = createSignal(false)

  const teamMembers = [4, 2, 12, 20, 16]

  return (
    <div class={styles.layout}>
      {/* ── Column 1: Team, Notifications, Pricing ────────── */}
      <div class={`${styles.col} ${styles.col1}`}>
        {/* Your Team */}
        <div class={styles.card}>
          <h3 class={styles.h3}>Your team</h3>
          <p class={styles.subtitle}>Invite and manage your team members.</p>
          <div class={`${styles.flex} ${styles.gap3} ${styles.mb5} ${styles.mt5}`}>
            <Input.Root class={styles.inputRoot}>
              <Input.Field class={styles.inputField} placeholder="Email address" />
            </Input.Root>
            <Button class={`${styles.btn} ${styles.btnPrimary}`}>Invite</Button>
          </div>
          <div class={styles.flexCol}>
            <For each={teamMembers}>
              {(number, i) => (
                <>
                  <div class={styles.teamRow}>
                    <div class={styles.teamInfo}>
                      <Avatar.Root class={styles.avatarRoot}>
                        <Avatar.Image
                          class={styles.avatarImage}
                          src={allPeople[number]?.image}
                          alt={allPeople[number]?.name}
                        />
                        <Avatar.Fallback class={styles.avatarFallback}>
                          {allPeople[number]?.name[0].toUpperCase()}
                        </Avatar.Fallback>
                      </Avatar.Root>
                      <a
                        class={`${styles.link} ${styles.linkSubtle} ${styles.teamName}`}
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        {allPeople[number]?.name}
                      </a>
                    </div>
                    <span class={styles.teamEmail}>{email(allPeople[number]?.name)}</span>
                    <div class={styles.teamActions}>
                      <Menu.Root gutter={4}>
                        <Menu.Trigger class={styles.iconBtn}>
                          <DotsHorizontalIcon />
                        </Menu.Trigger>
                        <Menu.Portal>
                          <Menu.Popup class={styles.menuPopup}>
                            <Menu.Item class={styles.menuItem}>View profile</Menu.Item>
                            <Menu.Item class={styles.menuItem}>Change role</Menu.Item>
                            <Menu.Separator class={styles.menuSeparator} />
                            <Menu.Item class={`${styles.menuItem} ${styles.menuItemDanger}`}>Remove</Menu.Item>
                          </Menu.Popup>
                        </Menu.Portal>
                      </Menu.Root>
                    </div>
                  </div>
                  <Show when={i() < teamMembers.length - 1}>
                    <Separator class={styles.separator} style={{ margin: "12px 0" }} />
                  </Show>
                </>
              )}
            </For>
          </div>
        </div>

        {/* Notifications */}
        <div class={styles.card}>
          <h3 class={styles.h3}>Notifications</h3>
          <p class={`${styles.subtitle} ${styles.mb6}`}>Manage your notification settings.</p>
          <Separator class={styles.separator} />
          {[
            {
              title: "Comments",
              desc: "Receive notifications when someone comments on your documents or mentions you.",
              push: true,
              emailOn: true,
              slack: false,
            },
            {
              title: "Favorites",
              desc: "Receive notifications when there is activity related to your favorited items.",
              push: true,
              emailOn: true,
              slack: false,
            },
            {
              title: "New documents",
              desc: "Receive notifications whenever people on your team create new documents.",
              push: true,
              emailOn: true,
              slack: false,
            },
          ].map((notif, idx) => (
            <>
              <div class={`${styles.notifRow} ${styles.my5}`}>
                <div>
                  <h4 class={styles.h4}>{notif.title}</h4>
                  <p class={`${styles.textSm} ${styles.textMuted}`} style={{ "margin-top": "4px" }}>
                    {notif.desc}
                  </p>
                </div>
                <div class={styles.notifSwitches}>
                  <label class={styles.switchLabel}>
                    <Switch.Root defaultChecked={notif.push}>
                      <Switch.Input />
                      <Switch.Control class={styles.switchControl}>
                        <Switch.Thumb class={styles.switchThumb} />
                      </Switch.Control>
                    </Switch.Root>
                    Push
                  </label>
                  <label class={styles.switchLabel}>
                    <Switch.Root defaultChecked={notif.emailOn}>
                      <Switch.Input />
                      <Switch.Control class={styles.switchControl}>
                        <Switch.Thumb class={styles.switchThumb} />
                      </Switch.Control>
                    </Switch.Root>
                    Email
                  </label>
                  <label class={styles.switchLabel}>
                    <Switch.Root defaultChecked={notif.slack}>
                      <Switch.Input />
                      <Switch.Control class={styles.switchControl}>
                        <Switch.Thumb class={styles.switchThumb} />
                      </Switch.Control>
                    </Switch.Root>
                    Slack
                  </label>
                </div>
              </div>
              {idx < 2 && <Separator class={styles.separator} />}
            </>
          ))}
        </div>

        {/* Pricing */}
        <div class={styles.card}>
          <h3 class={styles.h3}>Pricing</h3>
          <p class={`${styles.subtitle} ${styles.mb5}`}>
            No credit card required. Every plan includes a 30-day trial of all Pro features.
          </p>
          <div class={styles.grid3}>
            {[
              {
                name: "Basic",
                members: "3 team members",
                price: "$0",
                features: [
                  "Expense tracking",
                  "Invoicing",
                  "Payment tracking",
                  "Transaction recording",
                  "Basic reports",
                  "Email support",
                ],
                action: "Downgrade",
                variant: "outline" as const,
              },
              {
                name: "Growth",
                members: "10 team members",
                price: "$49",
                features: [
                  "Online payments",
                  "Recurring invoices",
                  "Bill management",
                  "Inventory tracking",
                  "Detailed reports",
                  "Phone support",
                ],
                action: "Go to Billing",
                variant: "outline" as const,
              },
              {
                name: "Pro",
                members: "Unlimited team members",
                price: "$99",
                features: [
                  "Custom invoices",
                  "Multi-business",
                  "Team collaboration",
                  "App integrations",
                  "Advanced security",
                  "Priority support",
                ],
                action: "Upgrade",
                variant: "primary" as const,
              },
            ].map((tier) => (
              <div class={styles.flexCol}>
                <span class={`${styles.textLg} ${styles.textBold}`}>{tier.name}</span>
                <span class={`${styles.textSm} ${styles.textMuted} ${styles.mb4}`}>{tier.members}</span>
                <span class={`${styles.textLg} ${styles.textBold} ${styles.mb4}`}>
                  {tier.price}
                  <span class={styles.priceMuted}>{" / mo"}</span>
                </span>
                <div class={`${styles.flexCol} ${styles.gap2}`}>
                  {tier.features.map((f) => (
                    <div class={`${styles.flexCenter} ${styles.gap2}`}>
                      <Marker>
                        <CheckIcon width={10} height={10} />
                      </Marker>
                      <span class={styles.textSm}>{f}</span>
                    </div>
                  ))}
                  <Button
                    class={`${styles.btn} ${tier.variant === "primary" ? styles.btnPrimary : styles.btnOutline} ${styles.mt3}`}
                  >
                    {tier.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Column 2: Sign Up, Credit Card, Invoice Paid, Invoice Detail ── */}
      <div class={`${styles.col} ${styles.col2}`}>
        {/* Sign Up */}
        <div class={styles.card}>
          <h3 class={`${styles.h3} ${styles.mb5}`}>Sign up</h3>
          <div class={styles.mb5}>
            <label class={`${styles.textSm} ${styles.textBold}`} style={{ display: "block", "margin-bottom": "4px" }}>
              Email address
            </label>
            <input
              class={styles.inputField}
              style={{ width: "100%", "box-sizing": "border-box" }}
              placeholder="Enter your email"
            />
          </div>
          <div class={styles.mb5}>
            <div class={styles.flexBetween} style={{ "margin-bottom": "4px" }}>
              <label class={`${styles.textSm} ${styles.textBold}`}>Password</label>
              <a class={styles.link} href="#" onClick={(e) => e.preventDefault()}>
                Forgot password?
              </a>
            </div>
            <input
              class={styles.inputField}
              style={{ width: "100%", "box-sizing": "border-box" }}
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div class={`${styles.flexEnd} ${styles.gap3} ${styles.mt6}`}>
            <Button class={`${styles.btn} ${styles.btnOutline}`}>Create an account</Button>
            <Button class={`${styles.btn} ${styles.btnPrimary}`}>Sign in</Button>
          </div>
        </div>

        {/* Your Company Card */}
        <div class={styles.card}>
          <button class={`${styles.iconBtn} ${styles.closeBtn}`}>
            <Cross2Icon />
          </button>
          <h3 class={styles.h3}>Your company card</h3>
          <p class={`${styles.subtitle} ${styles.mb6}`}>View and manage your corporate card.</p>
          <div class={styles.creditCardWrap}>
            <div class={styles.creditCard}>
              <span class={styles.textSm} style={{ "font-weight": "500" }}>
                Sophie Johnson
              </span>
              <div>
                <div class={`${styles.flexCenter} ${styles.gap3} ${styles.mb1}`}>
                  <span class={styles.textSm}>4929 3849 5027 1846</span>
                  <button class={styles.iconBtn} style={{ width: "24px", height: "24px", color: "white" }}>
                    <CopyIcon />
                  </button>
                </div>
                <div class={`${styles.flex} ${styles.gap3}`}>
                  <span class={styles.textSm}>01 / 27</span>
                  <span class={styles.textSm}>999</span>
                </div>
              </div>
            </div>
          </div>
          <div class={`${styles.flexEnd} ${styles.gap3} ${styles.mt6}`}>
            <Button class={`${styles.btn} ${styles.btnDanger}`}>Freeze</Button>
            <Button class={`${styles.btn} ${styles.btnPrimary}`}>Done</Button>
          </div>
        </div>

        {/* Invoice Paid */}
        <div class={styles.card}>
          <button class={`${styles.iconBtn} ${styles.closeBtn}`}>
            <Cross2Icon />
          </button>
          <div class={`${styles.flexCol} ${styles.gap3}`} style={{ "align-items": "center" }}>
            <Marker large>
              <CheckIcon width={32} height={32} />
            </Marker>
            <h3 class={`${styles.h3} ${styles.mb2}`}>Invoice paid</h3>
          </div>
          <p class={styles.textMd} style={{ "text-align": "center", "margin-bottom": "20px" }}>
            You paid $17,975.30. A receipt copy was sent to <strong>accounting@example.com</strong>
          </p>
          <div class={`${styles.flexCol} ${styles.gap3}`} style={{ "align-items": "stretch" }}>
            <Button class={`${styles.btn} ${styles.btnPrimary}`}>Next invoice</Button>
            <Button class={`${styles.btn} ${styles.btnOutline}`}>Done</Button>
          </div>
        </div>

        {/* Invoice Detail */}
        <div class={styles.card}>
          <button class={`${styles.iconBtn} ${styles.closeBtn}`}>
            <Cross2Icon />
          </button>
          <h3 class={`${styles.h3} ${styles.mb5}`}>
            Invoice{" "}
            <a class={styles.link} href="#" style={{ "font-weight": "700" }} onClick={(e) => e.preventDefault()}>
              #3463
            </a>
          </h3>
          <div class={styles.invoiceGrid}>
            <div>
              <div class={`${styles.textSm} ${styles.textMuted} ${styles.mb1}`}>Issued</div>
              <div class={`${styles.textMd} ${styles.textBold}`}>June 21, 2023</div>
            </div>
            <div>
              <div class={`${styles.textSm} ${styles.textMuted} ${styles.mb1}`}>Due</div>
              <div class={`${styles.textMd} ${styles.textBold}`}>July 21, 2023</div>
            </div>
            <div>
              <div class={`${styles.textSm} ${styles.textMuted} ${styles.mb1}`}>To</div>
              <div class={`${styles.textMd} ${styles.textBold} ${styles.mb1}`}>Paradise Ventures</div>
              <div class={styles.textSm}>742 Evergreen Terrace, Springfield, IL 62704</div>
            </div>
            <div>
              <div class={`${styles.textSm} ${styles.textMuted} ${styles.mb1}`}>From</div>
              <div class={`${styles.textMd} ${styles.textBold} ${styles.mb1}`}>Rogue Widgets</div>
              <div class={styles.textSm}>1600 Baker Street NW, Washington, DC 20500</div>
            </div>
            <div class={styles.invoiceLineItems}>
              <div class={styles.invoiceLine}>
                <span class={`${styles.textSm} ${styles.textMuted}`}>Services</span>
                <span class={`${styles.textSm} ${styles.textMuted}`}>Price</span>
              </div>
              <div class={styles.invoiceLine}>
                <span class={`${styles.textMd} ${styles.textBold}`}>Branding</span>
                <span class={styles.textSm}>$20,000</span>
              </div>
              <div class={styles.invoiceLine}>
                <span class={`${styles.textMd} ${styles.textBold}`}>Marketing website</span>
                <span class={styles.textSm}>$17,500</span>
              </div>
              <Separator class={styles.separator} style={{ margin: "6px 0 8px" }} />
              <div class={styles.invoiceLine}>
                <span class={styles.textSm}>Total</span>
                <span class={styles.textSm}>$38,500</span>
              </div>
            </div>
          </div>
          <div class={`${styles.flexEnd} ${styles.gap3} ${styles.mt6}`}>
            <Button class={`${styles.btn} ${styles.btnDanger}`}>Reject</Button>
            <Button class={`${styles.btn} ${styles.btnPrimary}`}>Approve</Button>
          </div>
        </div>
      </div>

      {/* ── Column 3: Financial Performance, Recent Activity, To-Do ── */}
      <div class={`${styles.col} ${styles.col3}`}>
        {/* Financial Performance */}
        <div class={styles.card}>
          <h3 class={styles.h3}>Financial performance</h3>
          <div class={styles.cardActions}>
            <button class={styles.iconBtn}>
              <OpenInNewWindowIcon />
            </button>
            <button
              class={`${styles.iconBtn} ${financePinned() ? styles.iconBtnActive : ""}`}
              onClick={() => setFinancePinned(!financePinned())}
            >
              {financePinned() ? <PinFilledIcon /> : <PinIcon />}
            </button>
          </div>
          <p class={`${styles.subtitle} ${styles.mb6}`}>Review your company's KPIs compared to the month before.</p>
          <div class={styles.grid3}>
            {(
              [
                { label: "MRR", badge: "teal", dir: "up", pct: "3.2%", value: "$350K" },
                { label: "OpEx", badge: "red", dir: "up", pct: "12.8%", value: "$211K" },
                { label: "CapEx", badge: "teal", dir: "down", pct: "8.8%", value: "$94K" },
                { label: "GPM", badge: "red", dir: "down", pct: "1.2%", value: "44.6%" },
                { label: "NPM", badge: "gray", dir: "none", pct: "0.0%", value: "9.1%" },
                { label: "EBITDA", badge: "teal", dir: "up", pct: "4.1%", value: "$443K" },
                { label: "CAC", badge: "teal", dir: "down", pct: "11.0%", value: "$146" },
                { label: "LTV", badge: "teal", dir: "up", pct: "3%", value: "$1,849" },
                { label: "Churn", badge: "red", dir: "up", pct: "1.1%", value: "12.4%" },
              ] as const
            ).map((kpi) => (
              <div>
                <div class={`${styles.flexCenter} ${styles.gap2} ${styles.mb2}`}>
                  <span class={styles.kpiLabel}>{kpi.label}</span>
                  <span
                    class={`${styles.badge} ${
                      kpi.badge === "teal" ? styles.badgeTeal : kpi.badge === "red" ? styles.badgeRed : styles.badgeGray
                    }`}
                  >
                    {kpi.dir === "up" && <ArrowUpIcon />}
                    {kpi.dir === "down" && <ArrowDownIcon />}
                    {kpi.pct}
                  </span>
                </div>
                <div class={styles.kpiValue}>{kpi.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div class={styles.card}>
          <h3 class={styles.h3}>Recent activity</h3>
          <div class={styles.cardActions}>
            <button class={styles.iconBtn}>
              <OpenInNewWindowIcon />
            </button>
            <button
              class={`${styles.iconBtn} ${activityPinned() ? styles.iconBtnActive : ""}`}
              onClick={() => setActivityPinned(!activityPinned())}
            >
              {activityPinned() ? <PinFilledIcon /> : <PinIcon />}
            </button>
          </div>
          <p class={`${styles.subtitle} ${styles.mb6}`} style={{ "margin-bottom": "28px" }}>
            Review what has happened over the past days.
          </p>
          {(
            [
              {
                person: 6,
                text: () => (
                  <>
                    Approved invoice{" "}
                    <a class={styles.link} href="#" onClick={(e: Event) => e.preventDefault()}>
                      #3461
                    </a>
                  </>
                ),
                time: "June 21, 11:34 am",
              },
              {
                person: 8,
                text: () => (
                  <>
                    Purchased{" "}
                    <a class={styles.link} href="#" onClick={(e: Event) => e.preventDefault()}>
                      15 office chairs
                    </a>{" "}
                    and{" "}
                    <a class={styles.link} href="#" onClick={(e: Event) => e.preventDefault()}>
                      2 drum sets
                    </a>
                  </>
                ),
                time: "June 21, 9:43 am",
              },
              {
                person: 8,
                text: () => (
                  <>
                    Responded to your comment{" "}
                    <a class={styles.link} href="#" onClick={(e: Event) => e.preventDefault()}>
                      #7514
                    </a>
                  </>
                ),
                time: "June 21, 9:41 am",
              },
              {
                person: 28,
                text: () => (
                  <>
                    Created{" "}
                    <a class={styles.link} href="#" onClick={(e: Event) => e.preventDefault()}>
                      4 invoices
                    </a>
                  </>
                ),
                time: "June 20, 4:55 pm",
              },
              {
                person: 26,
                text: () => (
                  <>
                    Updated client details for{" "}
                    <a class={styles.link} href="#" onClick={(e: Event) => e.preventDefault()}>
                      Acme Co.
                    </a>
                  </>
                ),
                time: "June 20, 3:30 pm",
              },
              {
                person: 25,
                text: () => (
                  <>
                    Created{" "}
                    <a class={styles.link} href="#" onClick={(e: Event) => e.preventDefault()}>
                      a new report
                    </a>
                  </>
                ),
                time: "June 20, 3:22 pm",
              },
              {
                person: 25,
                text: () => (
                  <>
                    Deleted report{" "}
                    <a class={styles.link} href="#" onClick={(e: Event) => e.preventDefault()}>
                      #34
                    </a>
                  </>
                ),
                time: "June 20, 1:00 pm",
              },
              { person: 20, text: () => <>Joined the team</>, time: "June 20, 12:47 pm" },
            ] as const
          ).map((act, idx) => (
            <>
              <div
                class={styles.activityRow}
                style={{ padding: idx === 0 ? "0 0 20px" : idx === 7 ? "20px 0 0" : "20px 0" }}
              >
                <div class={styles.activityMeta}>
                  <Avatar.Root class={styles.avatarRoot}>
                    <Avatar.Image
                      class={styles.avatarImage}
                      src={allPeople[act.person]?.image}
                      alt={allPeople[act.person]?.name}
                    />
                    <Avatar.Fallback class={styles.avatarFallback}>
                      {allPeople[act.person]?.name[0].toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <div>
                    <div class={`${styles.textSm} ${styles.textBold}`}>{allPeople[act.person]?.name}</div>
                    <div class={`${styles.textSm} ${styles.textMuted}`}>{act.text()}</div>
                  </div>
                </div>
                <span class={styles.activityTime}>{act.time}</span>
              </div>
              {idx < 7 && <Separator class={styles.separator} />}
            </>
          ))}
        </div>

        {/* To-Do */}
        <div class={styles.card}>
          <h3 class={styles.h3}>To-do</h3>
          <div class={styles.cardActions} style={{ gap: "4px" }}>
            <button class={styles.iconBtn}>
              <ShareIcon />
            </button>
            <button class={styles.iconBtn}>
              <PlusIcon />
            </button>
          </div>
          <p class={`${styles.subtitle} ${styles.mb5}`}>Stay on top of your daily tasks.</p>
          <ToDoList
            items={todo()}
            onToggle={(id, checked) => {
              setTodo((items) => items.map((item) => (item.id === id ? { ...item, completed: checked } : item)))
            }}
          />
        </div>
      </div>
    </div>
  )
}
