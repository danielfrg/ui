/*
 * Portions of this file are based on code from radix-ui-primitives.
 * MIT Licensed, Copyright (c) 2022 WorkOS.
 *
 * Credits to the Radix UI team:
 * https://github.com/radix-ui/primitives/blob/ea6376900d54af536dbb7b71b4fefd6ec2ce9dc0/packages/react/menubar/src/Menubar.tsx
 */

import { type Orientation, contains, createGenerateId, mergeDefaultProps, mergeRefs } from "../utils"
import {
  type Accessor,
  type Setter,
  type ValidComponent,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  onCleanup,
  splitProps,
} from "solid-js"
import { isServer } from "solid-js/web"

import { useLocale } from "../i18n"
import { type ElementOf, Polymorphic, type PolymorphicProps } from "../polymorphic"
import { createControllableSignal, createInteractOutside } from "../primitives"
import { MenuBarContext, type MenuBarContextValue, type MenuBarDataSet } from "./menu-bar-context"

export interface MenuBarRootOptions {
  /** The value of the menu that should be open when initially rendered. Use when you do not need to control the value state. */
  defaultValue?: string

  /** The controlled value of the menu to open. Should be used in conjunction with onValueChange. */
  value?: string | null

  /** Event handler called when the value changes. */
  onValueChange?: (value: string | undefined | null) => void

  /** When true, keyboard navigation will loop from last item to first, and vice versa. (default: true) */
  loop?: boolean

  /** When true, click on alt by itself will focus this Menubar (some browsers interfere) */
  focusOnAlt?: boolean

  /** Whether to auto-focus the menu when it opens. */
  autoFocusMenu?: boolean

  /** Event handler called when the autoFocusMenu state changes. */
  onAutoFocusMenuChange?: Setter<boolean>

  /** The orientation of the menubar. */
  orientation?: Orientation

  /** Whether the menubar is disabled. */
  disabled?: boolean

  /**
   * Used to force mounting when more control is needed.
   * Useful when controlling animation with SolidJS animation libraries.
   */
  forceMount?: boolean

  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string
}

export interface MenuBarRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string
  ref: T | ((el: T) => void)
}

export interface MenuBarRootRenderProps extends MenuBarRootCommonProps, MenuBarDataSet {
  role: "menubar"
  "data-orientation": Orientation
  "aria-orientation": Orientation
}

export type MenuBarRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenuBarRootOptions &
  Partial<MenuBarRootCommonProps<ElementOf<T>>>

export function MenuBarRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, MenuBarRootProps<T>>) {
  let ref: HTMLElement | undefined
  const defaultId = `menubar-${createUniqueId()}`

  const mergedProps = mergeDefaultProps(
    { id: defaultId, loop: true, orientation: "horizontal" as Orientation },
    props as MenuBarRootProps,
  )

  const [local, others] = splitProps(mergedProps as typeof mergedProps & { id: string }, [
    "ref",
    "value",
    "defaultValue",
    "onValueChange",
    "loop",
    "focusOnAlt",
    "autoFocusMenu",
    "onAutoFocusMenuChange",
    "orientation",
    "disabled",
    "forceMount",
  ])

  const [value, setValue] = createControllableSignal<string | null | undefined>({
    value: () => local.value,
    defaultValue: () => local.defaultValue,
    onChange: (value) => local.onValueChange?.(value),
  })

  const [lastValue, setLastValue] = createSignal<string | undefined>()

  const [menuRefs, setMenuRefs] = createSignal<Map<string, Array<HTMLElement>>>(new Map<string, Array<HTMLElement>>())

  const [autoFocusMenu, setAutoFocusMenu] = createControllableSignal({
    value: () => local.autoFocusMenu,
    defaultValue: () => false,
    onChange: local.onAutoFocusMenuChange,
  })

  const expanded = () => {
    return value() && autoFocusMenu() && !value()?.includes("link-trigger-")
  }

  const dataset: Accessor<MenuBarDataSet> = createMemo(() => ({
    "data-expanded": expanded() ? "" : undefined,
    "data-closed": !expanded() ? "" : undefined,
  }))

  const context: MenuBarContextValue = {
    dataset,
    value,
    setValue,
    lastValue,
    setLastValue,
    menus: () => new Set([...menuRefs().keys()]),
    menuRefs: () => [...menuRefs().values()].flat(),
    menuRefMap: () => menuRefs(),
    registerMenu: (menuValue, refs) => {
      setMenuRefs((prev) => {
        const map = new Map<string, Array<HTMLElement>>()
        prev.forEach((v, k) => map.set(k, v))
        map.set(menuValue, refs)
        return map
      })
    },
    unregisterMenu: (menuValue: string) => {
      setMenuRefs((prev) => {
        prev.delete(menuValue)
        const map = new Map<string, Array<HTMLElement>>()
        prev.forEach((v, k) => map.set(k, v))
        return map
      })
    },
    nextMenu: () => {
      const menusArray = [...menuRefs().keys()]

      if (value() == null) {
        setValue(menusArray[0])
        return
      }

      const currentIndex = menusArray.indexOf(value()!)

      if (currentIndex === menusArray.length - 1) {
        if (local.loop) setValue(menusArray[0])
        return
      }

      setValue(menusArray[currentIndex + 1])
    },
    previousMenu: () => {
      const menusArray = [...menuRefs().keys()]

      if (value() == null) {
        setValue(menusArray[0])
        return
      }

      const currentIndex = menusArray.indexOf(value()!)

      if (currentIndex === 0) {
        if (local.loop) setValue(menusArray[menusArray.length - 1])
        return
      }

      setValue(menusArray[currentIndex - 1])
    },
    closeMenu: () => {
      setAutoFocusMenu(false)
      setValue(undefined)
    },
    autoFocusMenu: () => autoFocusMenu()!,
    setAutoFocusMenu,
    generateId: createGenerateId(() => others.id!),
    orientation: () => local.orientation!,
  }

  createEffect(() => {
    if (value() == null) setAutoFocusMenu(false)
  })

  createInteractOutside(
    {
      onInteractOutside: () => {
        context.closeMenu()
        setTimeout(() => context.closeMenu())
      },
      shouldExcludeElement: (element) => {
        return [ref, ...menuRefs().values()].flat().some((r) => r && contains(r, element))
      },
    },
    () => ref,
  )

  const keydownHandler = (e: KeyboardEvent) => {
    if (e.key === "Alt") {
      e.preventDefault()
      e.stopPropagation()
      if (context.value() === undefined) context.nextMenu()
      else context.closeMenu()
    }
  }

  createEffect(() => {
    if (isServer) return
    if (local.focusOnAlt) window.addEventListener("keydown", keydownHandler)
    else window.removeEventListener("keydown", keydownHandler)

    onCleanup(() => {
      window.removeEventListener("keydown", keydownHandler)
    })
  })

  createEffect(() => {
    if (value() != null) setLastValue(value()!)
  })

  return (
    <MenuBarContext.Provider value={context}>
      <Polymorphic<MenuBarRootRenderProps>
        as="div"
        ref={mergeRefs((el: HTMLElement) => (ref = el), local.ref)}
        role="menubar"
        data-orientation={local.orientation!}
        aria-orientation={local.orientation!}
        {...dataset()}
        {...others}
      />
    </MenuBarContext.Provider>
  )
}
