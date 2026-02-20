import { createSignal, For, Show, type JSX } from "solid-js"
import * as Avatar from "@danielfrg/ui/avatar"
import { Button } from "@danielfrg/ui/button"
import * as Checkbox from "@danielfrg/ui/checkbox"
import * as Switch from "@danielfrg/ui/switch"
import { Separator } from "@danielfrg/ui/separator"
import { Menu } from "@danielfrg/ui/menu"
import * as Input from "@danielfrg/ui/input"
import {
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  Check as CheckIconLucide,
  Ellipsis as DotsHorizontalIcon,
  X as Cross2Icon,
  Pin as PinIcon,
  PinOff as PinFilledIcon,
  ExternalLink as OpenInNewWindowIcon,
  Copy as CopyIcon,
  Share2 as ShareIcon,
  Plus as PlusIcon,
} from "lucide-solid"
import { allPeople, email } from "./people"
import styles from "./dashboard.module.css"

// ── Icon wrapper for CheckIcon with variable size ──────────────
function CheckIcon(props: { width?: number; height?: number }) {
  return <CheckIconLucide size={props.width ?? 14} stroke-width={2.5} />
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
      <a class={styles.todoLink} href="#" onClick={(e) => e.preventDefault()}>
        #384
      </a>{" "}
      from Travis Ross
    </span>
  ),
  b: () => (
    <span>
      Invite{" "}
      <a class={styles.todoLink} href="#" onClick={(e) => e.preventDefault()}>
        Acme Co.
      </a>{" "}
      team to Slack
    </span>
  ),
  c: () => (
    <span>
      Create a report{" "}
      <a class={styles.todoLink} href="#" onClick={(e) => e.preventDefault()}>
        requested
      </a>{" "}
      by Danilo Sousa
    </span>
  ),
  d: () => (
    <span>
      Review support request{" "}
      <a class={styles.todoLink} href="#" onClick={(e) => e.preventDefault()}>
        #85
      </a>
    </span>
  ),
  e: () => <span>Close Q2 finances</span>,
  f: () => (
    <span>
      Review invoice{" "}
      <a class={styles.todoLink} href="#" onClick={(e) => e.preventDefault()}>
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
          <h3 class={styles.h3} style={{ "margin-bottom": "8px" }}>
            Your team
          </h3>
          <p class={`${styles.textSm} ${styles.textMuted}`} style={{ margin: "0 0 20px" }}>
            Invite and manage your team members.
          </p>
          <div class={`${styles.flex} ${styles.gap3}`} style={{ "margin-bottom": "20px" }}>
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
                        <Menu.Trigger class={`${styles.iconBtn} ${styles.iconBtnGray}`}>
                          <DotsHorizontalIcon size={15} />
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
          <h3 class={styles.h3} style={{ "margin-bottom": "8px" }}>
            Notifications
          </h3>
          <p class={`${styles.textSm} ${styles.textMuted}`} style={{ margin: "0 0 24px" }}>
            Manage your notification settings.
          </p>
          <Separator class={styles.separator} style={{ margin: "20px 0" }} />
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
                  <h4 class={styles.h4} style={{ "margin-bottom": "4px" }}>
                    {notif.title}
                  </h4>
                  <p class={`${styles.textSm} ${styles.textMuted}`} style={{ margin: "0" }}>
                    {notif.desc}
                  </p>
                </div>
                <div class={styles.notifSwitches}>
                  <Switch.Root class={styles.switchRow} defaultChecked={notif.push}>
                    <Switch.Input />
                    <Switch.Control class={styles.switchControl}>
                      <Switch.Thumb class={styles.switchThumb} />
                    </Switch.Control>
                    <Switch.Label class={styles.switchLabel}>Push</Switch.Label>
                  </Switch.Root>
                  <Switch.Root class={styles.switchRow} defaultChecked={notif.emailOn}>
                    <Switch.Input />
                    <Switch.Control class={styles.switchControl}>
                      <Switch.Thumb class={styles.switchThumb} />
                    </Switch.Control>
                    <Switch.Label class={styles.switchLabel}>Email</Switch.Label>
                  </Switch.Root>
                  <Switch.Root class={styles.switchRow} defaultChecked={notif.slack}>
                    <Switch.Input />
                    <Switch.Control class={styles.switchControl}>
                      <Switch.Thumb class={styles.switchThumb} />
                    </Switch.Control>
                    <Switch.Label class={styles.switchLabel}>Slack</Switch.Label>
                  </Switch.Root>
                </div>
              </div>
              {idx < 2 && <Separator class={styles.separator} />}
            </>
          ))}
        </div>

        {/* Pricing */}
        <div class={styles.card}>
          <h3 class={styles.h3} style={{ "margin-bottom": "8px" }}>
            Pricing
          </h3>
          <p class={`${styles.textSm} ${styles.textMuted}`} style={{ margin: "0 0 20px" }}>
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
                <span class={`${styles.textLg} ${styles.textBold}`} style={{ "margin-bottom": "4px" }}>
                  {tier.name}
                </span>
                <span class={`${styles.textSm} ${styles.textMuted} ${styles.mb4}`}>{tier.members}</span>
                <span class={`${styles.textLg} ${styles.textBold} ${styles.mb4}`}>
                  {tier.price}
                  <span class={styles.priceMuted}>{" / mo"}</span>
                </span>
                <div class={`${styles.flexCol} ${styles.gap2}`}>
                  {tier.features.map((f) => (
                    <div class={`${styles.flexCenter} ${styles.gap2}`}>
                      <Marker>
                        <CheckIcon width={14} height={14} />
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
          <h3 class={`${styles.h3}`} style={{ "margin-bottom": "20px" }}>
            Sign up
          </h3>
          <div class={styles.mb5}>
            <div class={styles.flex} style={{ "margin-bottom": "4px" }}>
              <label class={`${styles.textSm} ${styles.textBold}`}>Email address</label>
            </div>
            <input
              class={styles.inputField}
              style={{ width: "100%", "box-sizing": "border-box" }}
              placeholder="Enter your email"
            />
          </div>
          <div class={styles.mb5} style={{ position: "relative" }}>
            <div class={styles.flexBetween} style={{ "margin-bottom": "4px", "align-items": "baseline" }}>
              <label class={`${styles.textSm} ${styles.textBold}`}>Password</label>
              <a class={styles.link} href="#" style={{ "font-size": "0.875rem" }} onClick={(e) => e.preventDefault()}>
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
            <Cross2Icon size={20} />
          </button>
          <h3 class={styles.h3} style={{ "margin-bottom": "8px" }}>
            Your company card
          </h3>
          <p class={`${styles.textSm} ${styles.textMuted}`} style={{ margin: "0 0 24px" }}>
            View and manage your corporate card.
          </p>
          <div class={styles.creditCardWrap}>
            <div class={styles.creditCard}>
              <span class={styles.textSm} style={{ "font-weight": "500" }}>
                Sophie Johnson
              </span>
              <div>
                <div class={`${styles.flexCenter} ${styles.gap3}`} style={{ "margin-bottom": "4px" }}>
                  <span class={styles.textSm}>
                    4929 3849<span> </span>5027 1846
                  </span>
                  <button class={styles.iconBtn} style={{ width: "24px", height: "24px", color: "white" }}>
                    <CopyIcon size={14} />
                  </button>
                </div>
                <div class={`${styles.flex} ${styles.gap3}`} style={{ "margin-bottom": "8px" }}>
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
            <Cross2Icon size={20} />
          </button>
          <div class={`${styles.flexCol} ${styles.gap3}`} style={{ "align-items": "center" }}>
            <Marker large>
              <CheckIcon width={32} height={32} />
            </Marker>
            <h3 class={styles.h3} style={{ "margin-bottom": "8px" }}>
              Invoice paid
            </h3>
          </div>
          <p class={styles.textMd} style={{ "text-align": "center", margin: "0 0 20px" }}>
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
            <Cross2Icon size={20} />
          </button>
          <h3 class={styles.h3} style={{ "margin-bottom": "20px" }}>
            Invoice{" "}
            <a
              class={styles.link}
              href="#"
              style={{ "font-weight": "700", "font-size": "inherit" }}
              onClick={(e) => e.preventDefault()}
            >
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
              <Separator class={styles.separator} style={{ margin: "4px 0 8px" }} />
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
          <h3 class={styles.h3} style={{ "margin-bottom": "8px" }}>
            Financial performance
          </h3>
          <div class={styles.cardActions}>
            <button class={styles.iconBtn} style={{ margin: "0" }}>
              <OpenInNewWindowIcon size={20} />
            </button>
            <button
              class={`${styles.iconBtn} ${financePinned() ? styles.iconBtnActive : ""}`}
              style={{ margin: "0" }}
              onClick={() => setFinancePinned(!financePinned())}
            >
              {financePinned() ? <PinFilledIcon size={20} /> : <PinIcon size={20} />}
            </button>
          </div>
          <p class={`${styles.textSm} ${styles.textMuted}`} style={{ margin: "0 0 24px" }}>
            Review your company's KPIs compared to the month before.
          </p>
          <div class={styles.grid3Tight}>
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
                <div class={`${styles.flexCenter} ${styles.gap2}`} style={{ "margin-bottom": "8px" }}>
                  <span class={styles.kpiLabel}>{kpi.label}</span>
                  <span
                    class={`${styles.badge} ${
                      kpi.badge === "teal" ? styles.badgeTeal : kpi.badge === "red" ? styles.badgeRed : styles.badgeGray
                    }`}
                  >
                    {kpi.dir === "up" && <ArrowUpIcon size={12} />}
                    {kpi.dir === "down" && <ArrowDownIcon size={12} />}
                    {kpi.pct}
                  </span>
                </div>
                <div class={styles.kpiValue} style={{ "margin-bottom": "8px" }}>
                  {kpi.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div class={styles.card}>
          <h3 class={styles.h3} style={{ "margin-bottom": "8px" }}>
            Recent activity
          </h3>
          <div class={styles.cardActions}>
            <button class={styles.iconBtn} style={{ margin: "0" }}>
              <OpenInNewWindowIcon size={20} />
            </button>
            <button
              class={`${styles.iconBtn} ${activityPinned() ? styles.iconBtnActive : ""}`}
              style={{ margin: "0" }}
              onClick={() => setActivityPinned(!activityPinned())}
            >
              {activityPinned() ? <PinFilledIcon size={20} /> : <PinIcon size={20} />}
            </button>
          </div>
          <p class={`${styles.textSm} ${styles.textMuted}`} style={{ margin: "0 0 28px" }}>
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
                  <Avatar.Root class={`${styles.avatarRoot} ${styles.avatarMd}`}>
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
          <h3 class={styles.h3} style={{ "margin-bottom": "8px" }}>
            To-do
          </h3>
          <div class={styles.cardActions} style={{ gap: "12px" }}>
            <button class={styles.iconBtn}>
              <ShareIcon size={20} />
            </button>
            <button class={styles.iconBtn}>
              <PlusIcon size={20} />
            </button>
          </div>
          <p class={`${styles.textSm} ${styles.textMuted}`} style={{ margin: "0 0 20px" }}>
            Stay on top of your daily tasks.
          </p>
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
