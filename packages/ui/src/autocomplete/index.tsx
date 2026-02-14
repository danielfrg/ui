import {
	FormControlDescription as Description,
	FormControlLabel as Label,
	type FormControlDescriptionCommonProps as AutocompleteDescriptionCommonProps,
	type FormControlDescriptionOptions as AutocompleteDescriptionOptions,
	type FormControlDescriptionProps as AutocompleteDescriptionProps,
	type FormControlDescriptionRenderProps as AutocompleteDescriptionRenderProps,
	type FormControlLabelCommonProps as AutocompleteLabelCommonProps,
	type FormControlLabelOptions as AutocompleteLabelOptions,
	type FormControlLabelProps as AutocompleteLabelProps,
	type FormControlLabelRenderProps as AutocompleteLabelRenderProps,
} from "../form-control";
import {
	Item,
	ItemDescription,
	ItemLabel,
	type ListboxItemCommonProps as AutocompleteItemCommonProps,
	type ListboxItemDescriptionCommonProps as AutocompleteItemDescriptionCommonProps,
	type ListboxItemDescriptionOptions as AutocompleteItemDescriptionOptions,
	type ListboxItemDescriptionProps as AutocompleteItemDescriptionProps,
	type ListboxItemDescriptionRenderProps as AutocompleteItemDescriptionRenderProps,
	type ListboxItemLabelCommonProps as AutocompleteItemLabelCommonProps,
	type ListboxItemLabelOptions as AutocompleteItemLabelOptions,
	type ListboxItemLabelProps as AutocompleteItemLabelProps,
	type ListboxItemLabelRenderProps as AutocompleteItemLabelRenderProps,
	type ListboxItemOptions as AutocompleteItemOptions,
	type ListboxItemProps as AutocompleteItemProps,
	type ListboxItemRenderProps as AutocompleteItemRenderProps,
	type ListboxSectionCommonProps as AutocompleteSectionCommonProps,
	type ListboxSectionOptions as AutocompleteSectionOptions,
	type ListboxSectionProps as AutocompleteSectionProps,
	type ListboxSectionRenderProps as AutocompleteSectionRenderProps,
	Section,
} from "../listbox";
import {
	Arrow,
	type PopperArrowOptions as AutocompleteArrowOptions,
	type PopperArrowProps as AutocompleteArrowProps,
} from "../popper";

import type {
	ComboboxBaseItemComponentProps as AutocompleteRootItemComponentProps,
	ComboboxBaseSectionComponentProps as AutocompleteRootSectionComponentProps,
} from "../combobox/combobox-base";
// Autocomplete implements combobox without filter, hence the import alias
import {
	ComboboxContent as Content,
	type ComboboxContentCommonProps as AutocompleteContentCommonProps,
	type ComboboxContentOptions as AutocompleteContentOptions,
	type ComboboxContentProps as AutocompleteContentProps,
	type ComboboxContentRenderProps as AutocompleteContentRenderProps,
} from "../combobox/combobox-content";
import {
	ComboboxControl as Control,
	type ComboboxControlCommonProps as AutocompleteControlCommonProps,
	type ComboboxControlOptions as AutocompleteControlOptions,
	type ComboboxControlProps as AutocompleteControlProps,
	type ComboboxControlRenderProps as AutocompleteControlRenderProps,
} from "../combobox/combobox-control";
import {
	ComboboxHiddenSelect as HiddenSelect,
	type ComboboxHiddenSelectProps as AutocompleteHiddenSelectProps,
} from "../combobox/combobox-hidden-select";
import {
	ComboboxIcon as Icon,
	type ComboboxIconProps as AutocompleteIconProps,
} from "../combobox/combobox-icon";
import {
	ComboboxInput as Input,
	type ComboboxInputCommonProps as AutocompleteInputCommonProps,
	type ComboboxInputOptions as AutocompleteInputOptions,
	type ComboboxInputProps as AutocompleteInputProps,
	type ComboboxInputRenderProps as AutocompleteInputRenderProps,
} from "../combobox/combobox-input";
import {
	ComboboxListbox as Listbox,
	type ComboboxListboxCommonProps as AutocompleteListboxCommonProps,
	type ComboboxListboxOptions as AutocompleteListboxOptions,
	type ComboboxListboxProps as AutocompleteListboxProps,
	type ComboboxListboxRenderProps as AutocompleteListboxRenderProps,
} from "../combobox/combobox-listbox";
import {
	ComboboxPortal as Portal,
	type ComboboxPortalProps as AutocompletePortalProps,
} from "../combobox/combobox-portal";
import type { ComboboxTriggerMode as AutocompleteTriggerMode } from "../combobox/types";

import {
	AutocompleteIndicator as Indicator,
	type AutocompleteIndicatorCommonProps,
	type AutocompleteIndicatorOptions,
	type AutocompleteIndicatorProps,
} from "./autocomplete-indicator";
import {
	AutocompleteNoResult as NoResult,
	type AutocompleteNoResultCommonProps,
	type AutocompleteNoResultOptions,
	type AutocompleteNoResultProps,
} from "./autocomplete-no-result";

// Wrappers over Combobox need to redefine prop types
import {
	AutocompleteRoot as Root,
	type AutocompleteMultipleSelectionOptions,
	type AutocompleteRootCommonProps,
	type AutocompleteRootOptions,
	type AutocompleteRootProps,
	type AutocompleteRootRenderProps,
	type AutocompleteSingleSelectionOptions,
} from "./autocomplete-root";

export type {
	AutocompleteArrowOptions,
	AutocompleteArrowProps,
	AutocompleteContentOptions,
	AutocompleteContentCommonProps,
	AutocompleteContentRenderProps,
	AutocompleteContentProps,
	AutocompleteControlOptions,
	AutocompleteControlCommonProps,
	AutocompleteControlRenderProps,
	AutocompleteControlProps,
	AutocompleteDescriptionOptions,
	AutocompleteDescriptionCommonProps,
	AutocompleteDescriptionRenderProps,
	AutocompleteDescriptionProps,
	AutocompleteHiddenSelectProps,
	AutocompleteIconProps,
	AutocompleteInputOptions,
	AutocompleteInputCommonProps,
	AutocompleteInputRenderProps,
	AutocompleteInputProps,
	AutocompleteItemDescriptionOptions,
	AutocompleteItemDescriptionCommonProps,
	AutocompleteItemDescriptionRenderProps,
	AutocompleteItemDescriptionProps,
	AutocompleteItemLabelOptions,
	AutocompleteItemLabelCommonProps,
	AutocompleteItemLabelRenderProps,
	AutocompleteItemLabelProps,
	AutocompleteItemOptions,
	AutocompleteItemCommonProps,
	AutocompleteItemRenderProps,
	AutocompleteItemProps,
	AutocompleteLabelOptions,
	AutocompleteLabelCommonProps,
	AutocompleteLabelRenderProps,
	AutocompleteLabelProps,
	AutocompleteListboxOptions,
	AutocompleteListboxCommonProps,
	AutocompleteListboxRenderProps,
	AutocompleteListboxProps,
	AutocompleteMultipleSelectionOptions,
	AutocompletePortalProps,
	AutocompleteRootItemComponentProps,
	AutocompleteRootOptions,
	AutocompleteRootCommonProps,
	AutocompleteRootRenderProps,
	AutocompleteRootProps,
	AutocompleteRootSectionComponentProps,
	AutocompleteSectionOptions,
	AutocompleteSectionCommonProps,
	AutocompleteSectionRenderProps,
	AutocompleteSectionProps,
	AutocompleteSingleSelectionOptions,
	AutocompleteTriggerMode,
	AutocompleteNoResultOptions,
	AutocompleteNoResultCommonProps,
	AutocompleteNoResultProps,
	AutocompleteIndicatorCommonProps,
	AutocompleteIndicatorOptions,
	AutocompleteIndicatorProps,
};

export {
	Arrow,
	Content,
	Control,
	Description,
	HiddenSelect,
	Icon,
	Input,
	Item,
	ItemDescription,
	ItemLabel,
	Label,
	Listbox,
	Portal,
	Root,
	Section,
	NoResult,
	Indicator,
};

export const Autocomplete = Object.assign(Root, {
	Arrow,
	Content,
	Control,
	Description,
	HiddenSelect,
	Icon,
	Input,
	Item,
	ItemDescription,
	ItemLabel,
	Label,
	Listbox,
	Portal,
	Section,
	NoResult,
	Indicator,
});

export {
	useAutocompleteContext,
	type AutocompleteContextValue,
} from "./autocomplete-context";
