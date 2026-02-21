import { createSignal } from "solid-js"
import * as Autocomplete from "@danielfrg/ui-core/autocomplete"
import styles from "./index.module.css"

interface Fruit {
  value: string
  label: string
  disabled: boolean
}

const ALL_FRUITS: Fruit[] = [
  { value: "apple", label: "Apple", disabled: false },
  { value: "banana", label: "Banana", disabled: false },
  { value: "blueberry", label: "Blueberry", disabled: false },
  { value: "cherry", label: "Cherry", disabled: false },
  { value: "coconut", label: "Coconut", disabled: false },
  { value: "grape", label: "Grape", disabled: false },
  { value: "mango", label: "Mango", disabled: false },
  { value: "orange", label: "Orange", disabled: false },
  { value: "peach", label: "Peach", disabled: false },
  { value: "strawberry", label: "Strawberry", disabled: false },
]

export function DemoAutocompleteHero() {
  const [options, setOptions] = createSignal<Fruit[]>(ALL_FRUITS)

  const onInputChange = (value: string) => {
    const filtered = ALL_FRUITS.filter((fruit) => fruit.label.toLowerCase().includes(value.toLowerCase()))
    setOptions(filtered)
  }

  return (
    <Autocomplete.Root<Fruit>
      class={styles.root}
      options={options()}
      optionValue="value"
      optionTextValue="label"
      optionLabel="label"
      optionDisabled="disabled"
      onInputChange={onInputChange}
      placeholder="Search a fruit..."
      itemComponent={(props) => (
        <Autocomplete.Item item={props.item} class={styles.item}>
          <Autocomplete.ItemLabel>{props.item.rawValue.label}</Autocomplete.ItemLabel>
        </Autocomplete.Item>
      )}
    >
      <Autocomplete.Label class={styles.label}>Fruit</Autocomplete.Label>
      <Autocomplete.Control class={styles.control}>
        <Autocomplete.Input class={styles.input} />
        <Autocomplete.Indicator class={styles.indicator}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </Autocomplete.Indicator>
      </Autocomplete.Control>
      <Autocomplete.Portal>
        <Autocomplete.Content class={styles.content}>
          <Autocomplete.Listbox class={styles.listbox} />
          <Autocomplete.NoResult class={styles["no-result"]}>No results found.</Autocomplete.NoResult>
        </Autocomplete.Content>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  )
}
