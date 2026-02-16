import type { Orientation } from "../utils"
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
  type SeparatorRootCommonProps as NavigationMenuSeparatorCommonProps,
  type SeparatorRootOptions as NavigationMenuSeparatorOptions,
  type SeparatorRootProps as NavigationMenuSeparatorProps,
  type SeparatorRootRenderProps as NavigationMenuSeparatorRenderProps,
  Root as Separator,
} from "../separator"
import {
  NavigationMenuArrow as Arrow,
  type NavigationMenuArrowCommonProps,
  type NavigationMenuArrowOptions,
  type NavigationMenuArrowProps,
  type NavigationMenuArrowRenderProps,
} from "./navigation-menu-arrow"
import {
  NavigationMenuContent as Content,
  type Motion,
  type NavigationMenuContentCommonProps,
  type NavigationMenuContentOptions,
  type NavigationMenuContentProps,
  type NavigationMenuContentRenderProps,
} from "./navigation-menu-content"
import { NavigationMenuItem as Item } from "./navigation-menu-item"
import {
  NavigationMenuMenu as Menu,
  type NavigationMenuMenuOptions,
  type NavigationMenuMenuProps,
} from "./navigation-menu-menu"
import { type NavigationMenuPortalProps, NavigationMenuPortal as Portal } from "./navigation-menu-portal"
import {
  type NavigationMenuRootCommonProps,
  type NavigationMenuRootOptions,
  type NavigationMenuRootProps,
  type NavigationMenuRootRenderProps,
  NavigationMenuRoot as Root,
} from "./navigation-menu-root"
import {
  type NavigationMenuTriggerCommonProps,
  type NavigationMenuTriggerOptions,
  type NavigationMenuTriggerProps,
  type NavigationMenuTriggerRenderProps,
  NavigationMenuTrigger as Trigger,
} from "./navigation-menu-trigger"
import {
  type NavigationMenuViewportCommonProps,
  type NavigationMenuViewportOptions,
  type NavigationMenuViewportProps,
  type NavigationMenuViewportRenderProps,
  NavigationMenuViewport as Viewport,
} from "./navigation-menu-viewport"

// Re-export menu sub-component types with NavigationMenu prefix
type NavigationMenuCheckboxItemOptions = MenuCheckboxItemOptions
type NavigationMenuCheckboxItemCommonProps = MenuCheckboxItemCommonProps
type NavigationMenuCheckboxItemRenderProps = MenuCheckboxItemRenderProps
type NavigationMenuCheckboxItemProps = MenuCheckboxItemProps
type NavigationMenuGroupOptions = MenuGroupOptions
type NavigationMenuGroupCommonProps = MenuGroupCommonProps
type NavigationMenuGroupRenderProps = MenuGroupRenderProps
type NavigationMenuGroupProps = MenuGroupProps
type NavigationMenuGroupLabelOptions = MenuGroupLabelOptions
type NavigationMenuGroupLabelCommonProps = MenuGroupLabelCommonProps
type NavigationMenuGroupLabelRenderProps = MenuGroupLabelRenderProps
type NavigationMenuGroupLabelProps = MenuGroupLabelProps
type NavigationMenuIconOptions = MenuIconOptions
type NavigationMenuIconCommonProps = MenuIconCommonProps
type NavigationMenuIconRenderProps = MenuIconRenderProps
type NavigationMenuIconProps = MenuIconProps
type NavigationMenuItemOptions = MenuItemOptions
type NavigationMenuItemCommonProps = MenuItemCommonProps
type NavigationMenuItemRenderProps = MenuItemRenderProps
type NavigationMenuItemProps = MenuItemProps
type NavigationMenuItemDescriptionOptions = MenuItemDescriptionOptions
type NavigationMenuItemDescriptionCommonProps = MenuItemDescriptionCommonProps
type NavigationMenuItemDescriptionRenderProps = MenuItemDescriptionRenderProps
type NavigationMenuItemDescriptionProps = MenuItemDescriptionProps
type NavigationMenuItemIndicatorOptions = MenuItemIndicatorOptions
type NavigationMenuItemIndicatorCommonProps = MenuItemIndicatorCommonProps
type NavigationMenuItemIndicatorRenderProps = MenuItemIndicatorRenderProps
type NavigationMenuItemIndicatorProps = MenuItemIndicatorProps
type NavigationMenuItemLabelOptions = MenuItemLabelOptions
type NavigationMenuItemLabelCommonProps = MenuItemLabelCommonProps
type NavigationMenuItemLabelRenderProps = MenuItemLabelRenderProps
type NavigationMenuItemLabelProps = MenuItemLabelProps
type NavigationMenuRadioGroupOptions = MenuRadioGroupOptions
type NavigationMenuRadioGroupCommonProps = MenuRadioGroupCommonProps
type NavigationMenuRadioGroupRenderProps = MenuRadioGroupRenderProps
type NavigationMenuRadioGroupProps = MenuRadioGroupProps
type NavigationMenuRadioItemOptions = MenuRadioItemOptions
type NavigationMenuRadioItemCommonProps = MenuRadioItemCommonProps
type NavigationMenuRadioItemRenderProps = MenuRadioItemRenderProps
type NavigationMenuRadioItemProps = MenuRadioItemProps
type NavigationMenuSubOptions = MenuSubOptions
type NavigationMenuSubProps = MenuSubProps
type NavigationMenuSubContentOptions = MenuSubContentOptions
type NavigationMenuSubContentCommonProps = MenuSubContentCommonProps
type NavigationMenuSubContentRenderProps = MenuSubContentRenderProps
type NavigationMenuSubContentProps = MenuSubContentProps
type NavigationMenuSubTriggerOptions = MenuSubTriggerOptions
type NavigationMenuSubTriggerCommonProps = MenuSubTriggerCommonProps
type NavigationMenuSubTriggerRenderProps = MenuSubTriggerRenderProps
type NavigationMenuSubTriggerProps = MenuSubTriggerProps

const CheckboxItem = MenuCheckboxItem
const Group = MenuGroup
const GroupLabel = MenuGroupLabel
const Icon = MenuIcon
const ItemDescription = MenuItemDescription
const ItemIndicator = MenuItemIndicator
const ItemLabel = MenuItemLabel
const RadioGroup = MenuRadioGroup
const RadioItem = MenuRadioItem
const Sub = MenuSub
const SubContent = MenuSubContent
const SubTrigger = MenuSubTrigger

export type {
  NavigationMenuRootOptions,
  NavigationMenuRootCommonProps,
  NavigationMenuRootRenderProps,
  NavigationMenuRootProps,
  NavigationMenuMenuOptions,
  NavigationMenuMenuProps,
  NavigationMenuArrowOptions,
  NavigationMenuArrowCommonProps,
  NavigationMenuArrowRenderProps,
  NavigationMenuArrowProps,
  NavigationMenuCheckboxItemOptions,
  NavigationMenuCheckboxItemCommonProps,
  NavigationMenuCheckboxItemRenderProps,
  NavigationMenuCheckboxItemProps,
  NavigationMenuContentOptions,
  NavigationMenuContentCommonProps,
  NavigationMenuContentRenderProps,
  NavigationMenuContentProps,
  NavigationMenuGroupLabelOptions,
  NavigationMenuGroupLabelCommonProps,
  NavigationMenuGroupLabelRenderProps,
  NavigationMenuGroupLabelProps,
  NavigationMenuGroupOptions,
  NavigationMenuGroupCommonProps,
  NavigationMenuGroupRenderProps,
  NavigationMenuGroupProps,
  NavigationMenuIconOptions,
  NavigationMenuIconCommonProps,
  NavigationMenuIconRenderProps,
  NavigationMenuIconProps,
  NavigationMenuItemDescriptionOptions,
  NavigationMenuItemDescriptionCommonProps,
  NavigationMenuItemDescriptionRenderProps,
  NavigationMenuItemDescriptionProps,
  NavigationMenuItemIndicatorOptions,
  NavigationMenuItemIndicatorCommonProps,
  NavigationMenuItemIndicatorRenderProps,
  NavigationMenuItemIndicatorProps,
  NavigationMenuItemLabelOptions,
  NavigationMenuItemLabelCommonProps,
  NavigationMenuItemLabelRenderProps,
  NavigationMenuItemLabelProps,
  NavigationMenuItemOptions,
  NavigationMenuItemCommonProps,
  NavigationMenuItemRenderProps,
  NavigationMenuItemProps,
  NavigationMenuPortalProps,
  NavigationMenuRadioGroupOptions,
  NavigationMenuRadioGroupCommonProps,
  NavigationMenuRadioGroupRenderProps,
  NavigationMenuRadioGroupProps,
  NavigationMenuRadioItemOptions,
  NavigationMenuRadioItemCommonProps,
  NavigationMenuRadioItemRenderProps,
  NavigationMenuRadioItemProps,
  NavigationMenuSeparatorOptions,
  NavigationMenuSeparatorCommonProps,
  NavigationMenuSeparatorRenderProps,
  NavigationMenuSeparatorProps,
  NavigationMenuSubContentOptions,
  NavigationMenuSubContentCommonProps,
  NavigationMenuSubContentRenderProps,
  NavigationMenuSubContentProps,
  NavigationMenuSubOptions,
  NavigationMenuSubProps,
  NavigationMenuSubTriggerOptions,
  NavigationMenuSubTriggerCommonProps,
  NavigationMenuSubTriggerRenderProps,
  NavigationMenuSubTriggerProps,
  NavigationMenuTriggerOptions,
  NavigationMenuTriggerCommonProps,
  NavigationMenuTriggerRenderProps,
  NavigationMenuTriggerProps,
  NavigationMenuViewportOptions,
  NavigationMenuViewportCommonProps,
  NavigationMenuViewportRenderProps,
  NavigationMenuViewportProps,
  Motion,
  Orientation,
}

export {
  Arrow,
  CheckboxItem,
  Content,
  Group,
  GroupLabel,
  Icon,
  Item,
  ItemDescription,
  ItemIndicator,
  ItemLabel,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Menu,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
  Viewport,
}

export const NavigationMenu = {
  Arrow,
  CheckboxItem,
  Content,
  Group,
  GroupLabel,
  Icon,
  Item,
  ItemDescription,
  ItemIndicator,
  ItemLabel,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Menu,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
  Viewport,
}

export { useNavigationMenuContext, type NavigationMenuContextValue } from "./navigation-menu-context"
