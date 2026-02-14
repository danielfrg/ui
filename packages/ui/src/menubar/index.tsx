import {
	Arrow,
	type PopperArrowCommonProps as MenubarArrowCommonProps,
	type PopperArrowOptions as MenubarArrowOptions,
	type PopperArrowProps as MenubarArrowProps,
	type PopperArrowRenderProps as MenubarArrowRenderProps,
} from "../popper";
import {
	Root as SeparatorRoot,
	type SeparatorRootCommonProps as MenubarSeparatorCommonProps,
	type SeparatorRootOptions as MenubarSeparatorOptions,
	type SeparatorRootProps as MenubarSeparatorProps,
	type SeparatorRootRenderProps as MenubarSeparatorRenderProps,
} from "../separator";
import {
	MenuBarMenu,
	type MenuBarMenuOptions,
	type MenuBarMenuProps,
} from "./menu-bar-menu";
import {
	MenuBarRoot,
	type MenuBarRootCommonProps,
	type MenuBarRootOptions,
	type MenuBarRootProps,
	type MenuBarRootRenderProps,
} from "./menu-bar-root";
import {
	MenuBarTrigger,
	type MenuBarTriggerCommonProps,
	type MenuBarTriggerOptions,
	type MenuBarTriggerProps,
	type MenuBarTriggerRenderProps,
} from "./menu-bar-trigger";
import {
	MenuCheckboxItem,
	type MenuCheckboxItemCommonProps,
	type MenuCheckboxItemOptions,
	type MenuCheckboxItemProps,
	type MenuCheckboxItemRenderProps,
} from "./menu-checkbox-item";
import {
	MenuContent,
	type MenuContentCommonProps,
	type MenuContentOptions,
	type MenuContentProps,
	type MenuContentRenderProps,
} from "./menu-content";
import {
	MenuGroup,
	type MenuGroupCommonProps,
	type MenuGroupOptions,
	type MenuGroupProps,
	type MenuGroupRenderProps,
} from "./menu-group";
import {
	MenuGroupLabel,
	type MenuGroupLabelCommonProps,
	type MenuGroupLabelOptions,
	type MenuGroupLabelProps,
	type MenuGroupLabelRenderProps,
} from "./menu-group-label";
import {
	MenuIcon,
	type MenuIconCommonProps,
	type MenuIconOptions,
	type MenuIconProps,
	type MenuIconRenderProps,
} from "./menu-icon";
import {
	MenuItem,
	type MenuItemCommonProps,
	type MenuItemOptions,
	type MenuItemProps,
	type MenuItemRenderProps,
} from "./menu-item";
import {
	MenuItemDescription,
	type MenuItemDescriptionCommonProps,
	type MenuItemDescriptionOptions,
	type MenuItemDescriptionProps,
	type MenuItemDescriptionRenderProps,
} from "./menu-item-description";
import {
	MenuItemIndicator,
	type MenuItemIndicatorCommonProps,
	type MenuItemIndicatorOptions,
	type MenuItemIndicatorProps,
	type MenuItemIndicatorRenderProps,
} from "./menu-item-indicator";
import {
	MenuItemLabel,
	type MenuItemLabelCommonProps,
	type MenuItemLabelOptions,
	type MenuItemLabelProps,
	type MenuItemLabelRenderProps,
} from "./menu-item-label";
import { type MenuPortalProps, MenuPortal } from "./menu-portal";
import {
	MenuRadioGroup,
	type MenuRadioGroupCommonProps,
	type MenuRadioGroupOptions,
	type MenuRadioGroupProps,
	type MenuRadioGroupRenderProps,
} from "./menu-radio-group";
import {
	MenuRadioItem,
	type MenuRadioItemCommonProps,
	type MenuRadioItemOptions,
	type MenuRadioItemProps,
	type MenuRadioItemRenderProps,
} from "./menu-radio-item";
import {
	MenuSub,
	type MenuSubOptions,
	type MenuSubProps,
} from "./menu-sub";
import {
	MenuSubContent,
	type MenuSubContentCommonProps,
	type MenuSubContentOptions,
	type MenuSubContentProps,
	type MenuSubContentRenderProps,
} from "./menu-sub-content";
import {
	MenuSubTrigger,
	type MenuSubTriggerCommonProps,
	type MenuSubTriggerOptions,
	type MenuSubTriggerProps,
	type MenuSubTriggerRenderProps,
} from "./menu-sub-trigger";

// Base-UI aligned naming for Menubar:
// Menubar.Root = top-level menubar container (role="menubar")
// Menubar.Menu = individual dropdown menu within the menubar
// Menubar.Trigger = trigger button
// Menubar.Popup = popup content
// Menubar.SubmenuRoot = submenu container
// Menubar.SubmenuTrigger = submenu trigger
// Menubar.SubmenuPopup = submenu content

const Root = MenuBarRoot;
const Menu = MenuBarMenu;
const Trigger = MenuBarTrigger;
const Popup = MenuContent;
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
	// Menubar.Root (top-level)
	MenuBarRootOptions as MenubarRootOptions,
	MenuBarRootCommonProps as MenubarRootCommonProps,
	MenuBarRootRenderProps as MenubarRootRenderProps,
	MenuBarRootProps as MenubarRootProps,
	// Menubar.Menu (individual dropdown)
	MenuBarMenuOptions as MenubarMenuOptions,
	MenuBarMenuProps as MenubarMenuProps,
	// Menubar.Trigger
	MenuBarTriggerOptions as MenubarTriggerOptions,
	MenuBarTriggerCommonProps as MenubarTriggerCommonProps,
	MenuBarTriggerRenderProps as MenubarTriggerRenderProps,
	MenuBarTriggerProps as MenubarTriggerProps,
	// Menubar.Popup (content)
	MenuContentOptions as MenubarPopupOptions,
	MenuContentCommonProps as MenubarPopupCommonProps,
	MenuContentRenderProps as MenubarPopupRenderProps,
	MenuContentProps as MenubarPopupProps,
	// Menubar.SubmenuRoot
	MenuSubOptions as MenubarSubmenuRootOptions,
	MenuSubProps as MenubarSubmenuRootProps,
	// Menubar.SubmenuTrigger
	MenuSubTriggerOptions as MenubarSubmenuTriggerOptions,
	MenuSubTriggerCommonProps as MenubarSubmenuTriggerCommonProps,
	MenuSubTriggerRenderProps as MenubarSubmenuTriggerRenderProps,
	MenuSubTriggerProps as MenubarSubmenuTriggerProps,
	// Menubar.SubmenuPopup (sub-content)
	MenuSubContentOptions as MenubarSubmenuPopupOptions,
	MenuSubContentCommonProps as MenubarSubmenuPopupCommonProps,
	MenuSubContentRenderProps as MenubarSubmenuPopupRenderProps,
	MenuSubContentProps as MenubarSubmenuPopupProps,
	// Arrow
	MenubarArrowOptions,
	MenubarArrowCommonProps,
	MenubarArrowRenderProps,
	MenubarArrowProps,
	// Item
	MenuItemOptions as MenubarItemOptions,
	MenuItemCommonProps as MenubarItemCommonProps,
	MenuItemRenderProps as MenubarItemRenderProps,
	MenuItemProps as MenubarItemProps,
	// CheckboxItem
	MenuCheckboxItemOptions as MenubarCheckboxItemOptions,
	MenuCheckboxItemCommonProps as MenubarCheckboxItemCommonProps,
	MenuCheckboxItemRenderProps as MenubarCheckboxItemRenderProps,
	MenuCheckboxItemProps as MenubarCheckboxItemProps,
	// RadioGroup
	MenuRadioGroupOptions as MenubarRadioGroupOptions,
	MenuRadioGroupCommonProps as MenubarRadioGroupCommonProps,
	MenuRadioGroupRenderProps as MenubarRadioGroupRenderProps,
	MenuRadioGroupProps as MenubarRadioGroupProps,
	// RadioItem
	MenuRadioItemOptions as MenubarRadioItemOptions,
	MenuRadioItemCommonProps as MenubarRadioItemCommonProps,
	MenuRadioItemRenderProps as MenubarRadioItemRenderProps,
	MenuRadioItemProps as MenubarRadioItemProps,
	// Group
	MenuGroupOptions as MenubarGroupOptions,
	MenuGroupCommonProps as MenubarGroupCommonProps,
	MenuGroupRenderProps as MenubarGroupRenderProps,
	MenuGroupProps as MenubarGroupProps,
	// GroupLabel
	MenuGroupLabelOptions as MenubarGroupLabelOptions,
	MenuGroupLabelCommonProps as MenubarGroupLabelCommonProps,
	MenuGroupLabelRenderProps as MenubarGroupLabelRenderProps,
	MenuGroupLabelProps as MenubarGroupLabelProps,
	// Icon
	MenuIconOptions as MenubarIconOptions,
	MenuIconCommonProps as MenubarIconCommonProps,
	MenuIconRenderProps as MenubarIconRenderProps,
	MenuIconProps as MenubarIconProps,
	// ItemDescription
	MenuItemDescriptionOptions as MenubarItemDescriptionOptions,
	MenuItemDescriptionCommonProps as MenubarItemDescriptionCommonProps,
	MenuItemDescriptionRenderProps as MenubarItemDescriptionRenderProps,
	MenuItemDescriptionProps as MenubarItemDescriptionProps,
	// ItemIndicator
	MenuItemIndicatorOptions as MenubarItemIndicatorOptions,
	MenuItemIndicatorCommonProps as MenubarItemIndicatorCommonProps,
	MenuItemIndicatorRenderProps as MenubarItemIndicatorRenderProps,
	MenuItemIndicatorProps as MenubarItemIndicatorProps,
	// ItemLabel
	MenuItemLabelOptions as MenubarItemLabelOptions,
	MenuItemLabelCommonProps as MenubarItemLabelCommonProps,
	MenuItemLabelRenderProps as MenubarItemLabelRenderProps,
	MenuItemLabelProps as MenubarItemLabelProps,
	// Portal
	MenuPortalProps as MenubarPortalProps,
	// Separator
	MenubarSeparatorOptions,
	MenubarSeparatorCommonProps,
	MenubarSeparatorRenderProps,
	MenubarSeparatorProps,
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
	Menu,
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

export const Menubar = {
	Arrow,
	CheckboxItem,
	Group,
	GroupLabel,
	Icon,
	Item,
	ItemDescription,
	ItemIndicator,
	ItemLabel,
	Menu,
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

export { useMenuBarContext, type MenuBarContextValue } from "./menu-bar-context";
