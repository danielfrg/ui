import * as Select from "@danielfrg/ui-core/select"
import styles from "./index.module.css"

const FRUITS = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]

export function DemoSelectHero() {
  return (
    <Select.Root
      options={FRUITS}
      placeholder="Select a fruit..."
      itemComponent={(props) => (
        <Select.Item item={props.item} class={styles.item}>
          <Select.ItemIndicator class={styles["item-indicator"]}>
            <CheckIcon />
          </Select.ItemIndicator>
          <Select.ItemLabel>{props.item.rawValue}</Select.ItemLabel>
        </Select.Item>
      )}
    >
      <Select.Trigger class={styles.trigger} aria-label="Fruit">
        <Select.Value<string> class={styles.value}>{(state) => state.selectedOption()}</Select.Value>
        <Select.Icon class={styles.icon}>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class={styles.content}>
          <Select.Listbox class={styles.listbox} />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentcolor" style={{ display: "block" }}>
      <path d="M9.854 3.146a.5.5 0 0 1 0 .708l-5 5a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L4.5 7.793l4.646-4.647a.5.5 0 0 1 .708 0Z" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
  )
}
