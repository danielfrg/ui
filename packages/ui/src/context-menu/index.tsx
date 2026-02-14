import {
	Arrow,
	type PopperArrowCommonProps as ContextMenuArrowCommonProps,
	type PopperArrowOptions as ContextMenuArrowOptions,
	type PopperArrowProps as ContextMenuArrowProps,
	type PopperArrowRenderProps as ContextMenuArrowRenderProps,
} from "../popper";
import {
	Root as SeparatorRoot,
	type SeparatorRootCommonProps as ContextMenuSeparatorCommonProps,
	type SeparatorRootOptions as ContextMenuSeparatorOptions,
	type SeparatorRootProps as ContextMenuSeparatorProps,
	type SeparatorRootRenderProps as ContextMenuSeparatorRenderProps,
} from "../separator";

// Re-export shared menu primitives from menubar (the internal menu engine)
import {
	MenuCheckboxItem,
	type MenuCheckboxItemCommonProps,
	type MenuCheckboxItemOptions,
	type MenuCheckboxItemProps,
	type MenuCheckboxItemRenderProps,
} from "../menubar/menu-checkbox-item";
import {
	MenuGroup,
	type MenuGroupCommonProps,
	type MenuGroupOptions,
	type MenuGroupProps,
	type MenuGroupRenderProps,
} from "../menubar/menu-group";
import {
	MenuGroupLabel,
	type MenuGroupLabelCommonProps,
	type MenuGroupLabelOptions,
	type MenuGroupLabelProps,
	type MenuGroupLabelRenderProps,
} from "../menubar/menu-group-label";
import {
	MenuIcon,
	type MenuIconCommonProps,
	type MenuIconOptions,
	type MenuIconProps,
	type MenuIconRenderProps,
} from "../menubar/menu-icon";
import {
	MenuItem,
	type MenuItemCommonProps,
	type MenuItemOptions,
	type MenuItemProps,
	type MenuItemRenderProps,
} from "../menubar/menu-item";
import {
	MenuItemDescription,
	type MenuItemDescriptionCommonProps,
	type MenuItemDescriptionOptions,
	type MenuItemDescriptionProps,
	type MenuItemDescriptionRenderProps,
} from "../menubar/menu-item-description";
import {
	MenuItemIndicator,
	type MenuItemIndicatorCommonProps,
	type MenuItemIndicatorOptions,
	type MenuItemIndicatorProps,
	type MenuItemIndicatorRenderProps,
} from "../menubar/menu-item-indicator";
import {
	MenuItemLabel,
	type MenuItemLabelCommonProps,
	type MenuItemLabelOptions,
	type MenuItemLabelProps,
	type MenuItemLabelRenderProps,
} from "../menubar/menu-item-label";
import { type MenuPortalProps, MenuPortal } from "../menubar/menu-portal";
import {
	MenuRadioGroup,
	type MenuRadioGroupCommonProps,
	type MenuRadioGroupOptions,
	type MenuRadioGroupProps,
	type MenuRadioGroupRenderProps,
} from "../menubar/menu-radio-group";
import {
	MenuRadioItem,
	type MenuRadioItemCommonProps,
	type MenuRadioItemOptions,
	type MenuRadioItemProps,
	type MenuRadioItemRenderProps,
} from "../menubar/menu-radio-item";
import {
	MenuSub,
	type MenuSubOptions,
	type MenuSubProps,
} from "../menubar/menu-sub";
import {
	MenuSubContent,
	type MenuSubContentCommonProps,
	type MenuSubContentOptions,
	type MenuSubContentProps,
	type MenuSubContentRenderProps,
} from "../menubar/menu-sub-content";
import {
	MenuSubTrigger,
	type MenuSubTriggerCommonProps,
	type MenuSubTriggerOptions,
	type MenuSubTriggerProps,
	type MenuSubTriggerRenderProps,
} from "../menubar/menu-sub-trigger";

// Custom context-menu specific components
import {
	ContextMenuRoot,
	type ContextMenuRootOptions,
	type ContextMenuRootProps,
} from "./context-menu-root";
import {
	ContextMenuTrigger,
	type ContextMenuTriggerCommonProps,
	type ContextMenuTriggerOptions,
	type ContextMenuTriggerProps,
	type ContextMenuTriggerRenderProps,
} from "./context-menu-trigger";
import {
	ContextMenuPopup,
	type ContextMenuPopupCommonProps,
	type ContextMenuPopupOptions,
	type ContextMenuPopupProps,
	type ContextMenuPopupRenderProps,
} from "./context-menu-popup";

// Base-UI aligned naming:
// ContextMenu.Root = context menu root (right-click triggered)
// ContextMenu.Trigger = the area that responds to right-click
// ContextMenu.Popup = popup content

const Root = ContextMenuRoot;
const Trigger = ContextMenuTrigger;
const Popup = ContextMenuPopup;
const Separator = SeparatorRoot;
const SubmenuRoot = MenuSub;
const SubmenuTrigger = MenuSubTrigger;
const SubmenuPopup = MenuSubContent;
const Item = MenuItem;
const CheckboxItem = MenuCheckboxItem;
const RadioGroup = MenuRadioGroup;
const RadioItem = MenuRadioItem;
const Group = MenuGroup;
const GroupLabel = MenuGroupLabel;
const Icon = MenuIcon;
const ItemDescription = MenuItemDescription;
const ItemIndicator = MenuItemIndicator;
const ItemLabel = MenuItemLabel;
const Portal = MenuPortal;

export type {
	// Root
	ContextMenuRootOptions,
	ContextMenuRootProps,
	// Trigger
	ContextMenuTriggerOptions,
	ContextMenuTriggerCommonProps,
	ContextMenuTriggerRenderProps,
	ContextMenuTriggerProps,
	// Popup
	ContextMenuPopupOptions,
	ContextMenuPopupCommonProps,
	ContextMenuPopupRenderProps,
	ContextMenuPopupProps,
	// SubmenuRoot
	MenuSubOptions as ContextMenuSubmenuRootOptions,
	MenuSubProps as ContextMenuSubmenuRootProps,
	// SubmenuTrigger
	MenuSubTriggerOptions as ContextMenuSubmenuTriggerOptions,
	MenuSubTriggerCommonProps as ContextMenuSubmenuTriggerCommonProps,
	MenuSubTriggerRenderProps as ContextMenuSubmenuTriggerRenderProps,
	MenuSubTriggerProps as ContextMenuSubmenuTriggerProps,
	// SubmenuPopup
	MenuSubContentOptions as ContextMenuSubmenuPopupOptions,
	MenuSubContentCommonProps as ContextMenuSubmenuPopupCommonProps,
	MenuSubContentRenderProps as ContextMenuSubmenuPopupRenderProps,
	MenuSubContentProps as ContextMenuSubmenuPopupProps,
	// Arrow
	ContextMenuArrowOptions,
	ContextMenuArrowCommonProps,
	ContextMenuArrowRenderProps,
	ContextMenuArrowProps,
	// Item
	MenuItemOptions as ContextMenuItemOptions,
	MenuItemCommonProps as ContextMenuItemCommonProps,
	MenuItemRenderProps as ContextMenuItemRenderProps,
	MenuItemProps as ContextMenuItemProps,
	// CheckboxItem
	MenuCheckboxItemOptions as ContextMenuCheckboxItemOptions,
	MenuCheckboxItemCommonProps as ContextMenuCheckboxItemCommonProps,
	MenuCheckboxItemRenderProps as ContextMenuCheckboxItemRenderProps,
	MenuCheckboxItemProps as ContextMenuCheckboxItemProps,
	// RadioGroup
	MenuRadioGroupOptions as ContextMenuRadioGroupOptions,
	MenuRadioGroupCommonProps as ContextMenuRadioGroupCommonProps,
	MenuRadioGroupRenderProps as ContextMenuRadioGroupRenderProps,
	MenuRadioGroupProps as ContextMenuRadioGroupProps,
	// RadioItem
	MenuRadioItemOptions as ContextMenuRadioItemOptions,
	MenuRadioItemCommonProps as ContextMenuRadioItemCommonProps,
	MenuRadioItemRenderProps as ContextMenuRadioItemRenderProps,
	MenuRadioItemProps as ContextMenuRadioItemProps,
	// Group
	MenuGroupOptions as ContextMenuGroupOptions,
	MenuGroupCommonProps as ContextMenuGroupCommonProps,
	MenuGroupRenderProps as ContextMenuGroupRenderProps,
	MenuGroupProps as ContextMenuGroupProps,
	// GroupLabel
	MenuGroupLabelOptions as ContextMenuGroupLabelOptions,
	MenuGroupLabelCommonProps as ContextMenuGroupLabelCommonProps,
	MenuGroupLabelRenderProps as ContextMenuGroupLabelRenderProps,
	MenuGroupLabelProps as ContextMenuGroupLabelProps,
	// Icon
	MenuIconOptions as ContextMenuIconOptions,
	MenuIconCommonProps as ContextMenuIconCommonProps,
	MenuIconRenderProps as ContextMenuIconRenderProps,
	MenuIconProps as ContextMenuIconProps,
	// ItemDescription
	MenuItemDescriptionOptions as ContextMenuItemDescriptionOptions,
	MenuItemDescriptionCommonProps as ContextMenuItemDescriptionCommonProps,
	MenuItemDescriptionRenderProps as ContextMenuItemDescriptionRenderProps,
	MenuItemDescriptionProps as ContextMenuItemDescriptionProps,
	// ItemIndicator
	MenuItemIndicatorOptions as ContextMenuItemIndicatorOptions,
	MenuItemIndicatorCommonProps as ContextMenuItemIndicatorCommonProps,
	MenuItemIndicatorRenderProps as ContextMenuItemIndicatorRenderProps,
	MenuItemIndicatorProps as ContextMenuItemIndicatorProps,
	// ItemLabel
	MenuItemLabelOptions as ContextMenuItemLabelOptions,
	MenuItemLabelCommonProps as ContextMenuItemLabelCommonProps,
	MenuItemLabelRenderProps as ContextMenuItemLabelRenderProps,
	MenuItemLabelProps as ContextMenuItemLabelProps,
	// Portal
	MenuPortalProps as ContextMenuPortalProps,
	// Separator
	ContextMenuSeparatorOptions,
	ContextMenuSeparatorCommonProps,
	ContextMenuSeparatorRenderProps,
	ContextMenuSeparatorProps,
};

export {
	Arrow,
	CheckboxItem,
	Group,
	GroupLabel,
	Icon,
	Item,
	ItemDescription,
	ItemIndicator,
	ItemLabel,
	Popup,
	Portal,
	RadioGroup,
	RadioItem,
	Root,
	Separator,
	SubmenuPopup,
	SubmenuRoot,
	SubmenuTrigger,
	Trigger,
};

export const ContextMenu = {
	Arrow,
	CheckboxItem,
	Group,
	GroupLabel,
	Icon,
	Item,
	ItemDescription,
	ItemIndicator,
	ItemLabel,
	Popup,
	Portal,
	RadioGroup,
	RadioItem,
	Root,
	Separator,
	SubmenuPopup,
	SubmenuRoot,
	SubmenuTrigger,
	Trigger,
};

export {
	useContextMenuContext,
	type ContextMenuContextValue,
} from "./context-menu-context";
