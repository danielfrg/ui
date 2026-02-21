import { Show, type ValidComponent } from "solid-js"
import { type ElementOf, Polymorphic, type PolymorphicProps } from "../polymorphic"
import { useAutocompleteContext } from "./autocomplete-context"

export interface AutocompleteNoResultOptions {}

export interface AutocompleteNoResultCommonProps<T extends HTMLElement = HTMLElement> {}

export interface AutocompleteNoResultRenderProps extends AutocompleteNoResultCommonProps {}

export type AutocompleteNoResultProps<T extends ValidComponent | HTMLElement = HTMLElement> =
  AutocompleteNoResultOptions & Partial<AutocompleteNoResultCommonProps<ElementOf<T>>>

/**
 * Displayed in portal when no options are presented
 */
export function AutocompleteNoResult<T extends ValidComponent = "span">(
  props: PolymorphicProps<T, AutocompleteNoResultProps<T>>,
) {
  const context = useAutocompleteContext()

  return (
    <Show when={context.noResult()}>
      <Polymorphic as="div" {...props} />
    </Show>
  )
}
