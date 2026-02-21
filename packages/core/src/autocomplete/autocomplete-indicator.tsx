import { type JSX, Show, type ValidComponent, splitProps } from "solid-js"

import { type ElementOf, Polymorphic, type PolymorphicProps } from "../polymorphic"
import { useAutocompleteContext } from "./autocomplete-context"

export interface AutocompleteIndicatorOptions {}

export interface AutocompleteIndicatorCommonProps<T extends HTMLElement = HTMLElement> {
  children: JSX.Element
  loadingComponent?: JSX.Element
}

export interface AutocompleteIndicatorRenderProps extends AutocompleteIndicatorCommonProps {}

export type AutocompleteIndicatorProps<T extends ValidComponent | HTMLElement = HTMLElement> =
  AutocompleteIndicatorOptions & Partial<AutocompleteIndicatorCommonProps<ElementOf<T>>>

export function AutocompleteIndicator<T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AutocompleteIndicatorProps<T>>,
) {
  const [local, other] = splitProps(props, ["loadingComponent"])
  const context = useAutocompleteContext()

  return (
    <Polymorphic as="span" aria-hidden="true" {...other}>
      <Show
        when={context.isLoadingSuggestions() === false || !local.loadingComponent}
        fallback={local.loadingComponent}
      >
        {props.children}
      </Show>
    </Polymorphic>
  )
}
