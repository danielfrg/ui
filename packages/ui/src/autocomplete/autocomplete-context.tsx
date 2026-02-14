import { type Accessor, createContext, useContext } from "solid-js";

export interface AutocompleteContextValue {
	/** No results found */
	noResult: Accessor<boolean>;

	/** Are we currently loading suggestions? */
	isLoadingSuggestions: Accessor<boolean>;
}

export const AutocompleteContext = createContext<AutocompleteContextValue>();

export function useAutocompleteContext() {
	const context = useContext(AutocompleteContext);

	if (context === undefined) {
		throw new Error(
			"[ui]: `useAutocompleteContext` must be used within an `Autocomplete` component",
		);
	}

	return context;
}
