import {
  Arrow,
  type PopperArrowCommonProps as MenuArrowCommonProps,
  type PopperArrowOptions as MenuArrowOptions,
  type PopperArrowProps as MenuArrowProps,
  type PopperArrowRenderProps as MenuArrowRenderProps,
} from "../popper"
import {
  Root as SeparatorRoot,
  type SeparatorRootCommonProps as MenuSeparatorCommonProps,
  type SeparatorRootOptions as MenuSeparatorOptions,
  type SeparatorRootProps as MenuSeparatorProps,
  type SeparatorRootRenderProps as MenuSeparatorRenderProps,
} from "../separator"

// Re-export shared menu primitives from menubar (the internal menu engine)
import {
  MenuCheckboxItem,
  type MenuCheckboxItemCommonProps,
  type MenuCheckboxItemOptions,
  type MenuCheckboxItemProps,
  type MenuCheckboxItemRenderProps,
} from "../menubar/menu-checkbox-item"
import {
  MenuGroup,
  type MenuGroupCommonProps,
  type MenuGroupOptions,
  type MenuGroupProps,
  type MenuGroupRenderProps,
} from "../menubar/menu-group"
import {
  MenuGroupLabel,
  type MenuGroupLabelCommonProps,
  type MenuGroupLabelOptions,
  type MenuGroupLabelProps,
  type MenuGroupLabelRenderProps,
} from "../menubar/menu-group-label"
import {
  MenuIcon,
  type MenuIconCommonProps,
  type MenuIconOptions,
  type MenuIconProps,
  type MenuIconRenderProps,
} from "../menubar/menu-icon"
import {
  MenuItem,
  type MenuItemCommonProps,
  type MenuItemOptions,
  type MenuItemProps,
  type MenuItemRenderProps,
} from "../menubar/menu-item"
import {
  MenuItemDescription,
  type MenuItemDescriptionCommonProps,
  type MenuItemDescriptionOptions,
  type MenuItemDescriptionProps,
  type MenuItemDescriptionRenderProps,
} from "../menubar/menu-item-description"
import {
  MenuItemIndicator,
  type MenuItemIndicatorCommonProps,
  type MenuItemIndicatorOptions,
  type MenuItemIndicatorProps,
  type MenuItemIndicatorRenderProps,
} from "../menubar/menu-item-indicator"
import {
  MenuItemLabel,
  type MenuItemLabelCommonProps,
  type MenuItemLabelOptions,
  type MenuItemLabelProps,
  type MenuItemLabelRenderProps,
} from "../menubar/menu-item-label"
import { type MenuPortalProps, MenuPortal } from "../menubar/menu-portal"
import {
  MenuRadioGroup,
  type MenuRadioGroupCommonProps,
  type MenuRadioGroupOptions,
  type MenuRadioGroupProps,
  type MenuRadioGroupRenderProps,
} from "../menubar/menu-radio-group"
import {
  MenuRadioItem,
  type MenuRadioItemCommonProps,
  type MenuRadioItemOptions,
  type MenuRadioItemProps,
  type MenuRadioItemRenderProps,
} from "../menubar/menu-radio-item"
import { MenuSub, type MenuSubOptions, type MenuSubProps } from "../menubar/menu-sub"
import {
  MenuSubContent,
  type MenuSubContentCommonProps,
  type MenuSubContentOptions,
  type MenuSubContentProps,
  type MenuSubContentRenderProps,
} from "../menubar/menu-sub-content"
import {
  MenuSubTrigger,
  type MenuSubTriggerCommonProps,
  type MenuSubTriggerOptions,
  type MenuSubTriggerProps,
  type MenuSubTriggerRenderProps,
} from "../menubar/menu-sub-trigger"
import {
  MenuTrigger,
  type MenuTriggerCommonProps,
  type MenuTriggerOptions,
  type MenuTriggerProps,
  type MenuTriggerRenderProps,
} from "../menubar/menu-trigger"

// Custom dropdown-menu specific components
import { DropdownMenuRoot, type DropdownMenuRootOptions, type DropdownMenuRootProps } from "./menu-root"
import {
  DropdownMenuPopup,
  type DropdownMenuPopupCommonProps,
  type DropdownMenuPopupOptions,
  type DropdownMenuPopupProps,
  type DropdownMenuPopupRenderProps,
} from "./menu-popup"

// Base-UI aligned naming for Menu:
// Menu.Root = dropdown menu root
// Menu.Trigger = trigger button
// Menu.Popup = popup content
// Menu.SubmenuRoot = submenu container
// Menu.SubmenuTrigger = submenu trigger
// Menu.SubmenuPopup = submenu content

const Root = DropdownMenuRoot
const Trigger = MenuTrigger
const Popup = DropdownMenuPopup
const Separator = SeparatorRoot
const SubmenuRoot = MenuSub
const SubmenuTrigger = MenuSubTrigger
const SubmenuPopup = MenuSubContent
const Item = MenuItem
const CheckboxItem = MenuCheckboxItem
const RadioGroup = MenuRadioGroup
const RadioItem = MenuRadioItem
const Group = MenuGroup
const GroupLabel = MenuGroupLabel
const Icon = MenuIcon
const ItemDescription = MenuItemDescription
const ItemIndicator = MenuItemIndicator
const ItemLabel = MenuItemLabel
const Portal = MenuPortal

export type {
  // Menu.Root
  DropdownMenuRootOptions as MenuRootOptions,
  DropdownMenuRootProps as MenuRootProps,
  // Menu.Trigger
  MenuTriggerOptions,
  MenuTriggerCommonProps,
  MenuTriggerRenderProps,
  MenuTriggerProps,
  // Menu.Popup
  DropdownMenuPopupOptions as MenuPopupOptions,
  DropdownMenuPopupCommonProps as MenuPopupCommonProps,
  DropdownMenuPopupRenderProps as MenuPopupRenderProps,
  DropdownMenuPopupProps as MenuPopupProps,
  // Menu.SubmenuRoot
  MenuSubOptions as MenuSubmenuRootOptions,
  MenuSubProps as MenuSubmenuRootProps,
  // Menu.SubmenuTrigger
  MenuSubTriggerOptions as MenuSubmenuTriggerOptions,
  MenuSubTriggerCommonProps as MenuSubmenuTriggerCommonProps,
  MenuSubTriggerRenderProps as MenuSubmenuTriggerRenderProps,
  MenuSubTriggerProps as MenuSubmenuTriggerProps,
  // Menu.SubmenuPopup
  MenuSubContentOptions as MenuSubmenuPopupOptions,
  MenuSubContentCommonProps as MenuSubmenuPopupCommonProps,
  MenuSubContentRenderProps as MenuSubmenuPopupRenderProps,
  MenuSubContentProps as MenuSubmenuPopupProps,
  // Arrow
  MenuArrowOptions,
  MenuArrowCommonProps,
  MenuArrowRenderProps,
  MenuArrowProps,
  // Item
  MenuItemOptions,
  MenuItemCommonProps,
  MenuItemRenderProps,
  MenuItemProps,
  // CheckboxItem
  MenuCheckboxItemOptions,
  MenuCheckboxItemCommonProps,
  MenuCheckboxItemRenderProps,
  MenuCheckboxItemProps,
  // RadioGroup
  MenuRadioGroupOptions,
  MenuRadioGroupCommonProps,
  MenuRadioGroupRenderProps,
  MenuRadioGroupProps,
  // RadioItem
  MenuRadioItemOptions,
  MenuRadioItemCommonProps,
  MenuRadioItemRenderProps,
  MenuRadioItemProps,
  // Group
  MenuGroupOptions,
  MenuGroupCommonProps,
  MenuGroupRenderProps,
  MenuGroupProps,
  // GroupLabel
  MenuGroupLabelOptions,
  MenuGroupLabelCommonProps,
  MenuGroupLabelRenderProps,
  MenuGroupLabelProps,
  // Icon
  MenuIconOptions,
  MenuIconCommonProps,
  MenuIconRenderProps,
  MenuIconProps,
  // ItemDescription
  MenuItemDescriptionOptions,
  MenuItemDescriptionCommonProps,
  MenuItemDescriptionRenderProps,
  MenuItemDescriptionProps,
  // ItemIndicator
  MenuItemIndicatorOptions,
  MenuItemIndicatorCommonProps,
  MenuItemIndicatorRenderProps,
  MenuItemIndicatorProps,
  // ItemLabel
  MenuItemLabelOptions,
  MenuItemLabelCommonProps,
  MenuItemLabelRenderProps,
  MenuItemLabelProps,
  // Portal
  MenuPortalProps,
  // Separator
  MenuSeparatorOptions,
  MenuSeparatorCommonProps,
  MenuSeparatorRenderProps,
  MenuSeparatorProps,
}

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
}

export const Menu = {
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
}
