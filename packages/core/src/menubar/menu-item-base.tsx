import {
  callHandler,
  composeEventHandlers,
  createGenerateId,
  focusWithoutScrolling,
  mergeDefaultProps,
  mergeRefs,
} from "../utils"
import {
  type Accessor,
  type JSX,
  type ValidComponent,
  createMemo,
  createSignal,
  createUniqueId,
  splitProps,
} from "solid-js"

import { type ElementOf, Polymorphic, type PolymorphicProps } from "../polymorphic"
import { type CollectionItemWithRef, createRegisterId } from "../primitives"
import { createDomCollectionItem } from "../primitives/create-dom-collection"
import { createSelectableItem } from "../selection"
import { useMenuContext } from "./menu-context"
import { MenuItemContext, type MenuItemContextValue, type MenuItemDataSet } from "./menu-item.context"
import { useMenuRootContext } from "./menu-root-context"

export interface MenuItemBaseOptions {
  textValue?: string
  disabled?: boolean
  checked?: boolean
  indeterminate?: boolean
  closeOnSelect?: boolean
  onSelect?: () => void
}

export interface MenuItemBaseCommonProps<T extends HTMLElement = HTMLElement> {
  id: string
  ref: T | ((el: T) => void)
  onPointerMove: JSX.EventHandlerUnion<T, PointerEvent>
  onPointerLeave: JSX.EventHandlerUnion<T, PointerEvent>
  onPointerDown: JSX.EventHandlerUnion<T, PointerEvent>
  onPointerUp: JSX.EventHandlerUnion<T, PointerEvent>
  onClick: JSX.EventHandlerUnion<T, MouseEvent>
  onKeyDown: JSX.EventHandlerUnion<T, KeyboardEvent>
  onMouseDown: JSX.EventHandlerUnion<T, MouseEvent>
  onFocus: JSX.EventHandlerUnion<T, FocusEvent>
}

export interface MenuItemBaseRenderProps extends MenuItemBaseCommonProps, MenuItemDataSet {
  tabIndex: number | undefined
  "aria-checked": boolean | "mixed" | undefined
  "aria-disabled": boolean | undefined
  "aria-labelledby": string | undefined
  "aria-describedby": string | undefined
  "data-key": string | undefined
}

export type MenuItemBaseProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenuItemBaseOptions &
  Partial<MenuItemBaseCommonProps<ElementOf<T>>>

export function MenuItemBase<T extends ValidComponent = "div">(props: PolymorphicProps<T, MenuItemBaseProps<T>>) {
  let ref: HTMLElement | undefined

  const rootContext = useMenuRootContext()
  const menuContext = useMenuContext()

  const mergedProps = mergeDefaultProps(
    {
      id: rootContext.generateId(`item-${createUniqueId()}`),
    },
    props as MenuItemBaseProps,
  )

  const [local, others] = splitProps(mergedProps, [
    "ref",
    "textValue",
    "disabled",
    "closeOnSelect",
    "checked",
    "indeterminate",
    "onSelect",
    "onPointerMove",
    "onPointerLeave",
    "onPointerDown",
    "onPointerUp",
    "onClick",
    "onKeyDown",
    "onMouseDown",
    "onFocus",
  ])

  const [labelId, setLabelId] = createSignal<string>()
  const [descriptionId, setDescriptionId] = createSignal<string>()
  const [labelRef, setLabelRef] = createSignal<HTMLElement>()

  const selectionManager = () => menuContext.listState().selectionManager()

  const key = () => others.id!

  const isHighlighted = () => selectionManager().focusedKey() === key()

  const onSelect = () => {
    local.onSelect?.()

    if (local.closeOnSelect) {
      setTimeout(() => {
        menuContext.close(true)
      }, 1)
    }
  }

  createDomCollectionItem<CollectionItemWithRef>({
    getItem: () => ({
      ref: () => ref,
      type: "item",
      key: key(),
      textValue: local.textValue ?? labelRef()?.textContent ?? ref?.textContent ?? "",
      disabled: local.disabled ?? false,
    }),
  })

  const selectableItem = createSelectableItem(
    {
      key,
      selectionManager: selectionManager,
      shouldSelectOnPressUp: true,
      allowsDifferentPressOrigin: true,
      disabled: () => local.disabled,
    },
    () => ref,
  )

  const onPointerMove: JSX.EventHandlerUnion<HTMLElement, PointerEvent> = (e) => {
    callHandler(e, local.onPointerMove)

    if (e.pointerType !== "mouse") {
      return
    }

    if (local.disabled) {
      menuContext.onItemLeave(e)
    } else {
      menuContext.onItemEnter(e)

      if (!e.defaultPrevented) {
        focusWithoutScrolling(e.currentTarget)
        menuContext.listState().selectionManager().setFocused(true)
        menuContext.listState().selectionManager().setFocusedKey(key())
      }
    }
  }

  const onPointerLeave: JSX.EventHandlerUnion<HTMLElement, PointerEvent> = (e) => {
    callHandler(e, local.onPointerLeave)

    if (e.pointerType !== "mouse") {
      return
    }

    menuContext.onItemLeave(e)
  }

  const onPointerUp: JSX.EventHandlerUnion<HTMLElement, PointerEvent> = (e) => {
    callHandler(e, local.onPointerUp)

    if (!local.disabled && e.button === 0) {
      onSelect()
    }
  }

  const onKeyDown: JSX.EventHandlerUnion<HTMLElement, KeyboardEvent> = (e) => {
    callHandler(e, local.onKeyDown)

    if (e.repeat) {
      return
    }

    if (local.disabled) {
      return
    }

    switch (e.key) {
      case "Enter":
      case " ":
        onSelect()
        break
    }
  }

  const ariaChecked = createMemo(() => {
    if (local.indeterminate) {
      return "mixed"
    }

    if (local.checked == null) {
      return undefined
    }

    return local.checked
  })

  const dataset: Accessor<MenuItemDataSet> = createMemo(() => ({
    "data-indeterminate": local.indeterminate ? "" : undefined,
    "data-checked": local.checked && !local.indeterminate ? "" : undefined,
    "data-disabled": local.disabled ? "" : undefined,
    "data-highlighted": isHighlighted() ? "" : undefined,
  }))

  const context: MenuItemContextValue = {
    isChecked: () => local.checked,
    dataset,
    setLabelRef,
    generateId: createGenerateId(() => others.id!),
    registerLabel: createRegisterId(setLabelId),
    registerDescription: createRegisterId(setDescriptionId),
  }

  return (
    <MenuItemContext.Provider value={context}>
      <Polymorphic<MenuItemBaseRenderProps>
        as="div"
        ref={mergeRefs((el) => (ref = el), local.ref)}
        tabIndex={selectableItem.tabIndex()}
        aria-checked={ariaChecked()}
        aria-disabled={local.disabled}
        aria-labelledby={labelId()}
        aria-describedby={descriptionId()}
        data-key={selectableItem.dataKey()}
        onPointerDown={composeEventHandlers([local.onPointerDown, selectableItem.onPointerDown])}
        onPointerUp={composeEventHandlers([onPointerUp, selectableItem.onPointerUp])}
        onClick={composeEventHandlers([local.onClick, selectableItem.onClick])}
        onKeyDown={composeEventHandlers([onKeyDown, selectableItem.onKeyDown])}
        onMouseDown={composeEventHandlers([local.onMouseDown, selectableItem.onMouseDown])}
        onFocus={composeEventHandlers([local.onFocus, selectableItem.onFocus])}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        {...dataset()}
        {...others}
      />
    </MenuItemContext.Provider>
  )
}
