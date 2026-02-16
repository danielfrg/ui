import { createGenerateId, mergeDefaultProps } from "../utils"
import { type Accessor, type ParentProps, createMemo, createSignal, createUniqueId, splitProps } from "solid-js"

import createPresence from "solid-presence"
import { Popper, type PopperRootOptions } from "../popper"
import { createDisclosureState, createRegisterId } from "../primitives"
import { PopoverContext, type PopoverContextValue, type PopoverDataSet } from "./popover-context"
import { POPOVER_INTL_TRANSLATIONS, type PopoverIntlTranslations } from "./popover.intl"

export interface PopoverRootOptions extends Omit<
  PopperRootOptions,
  "anchorRef" | "contentRef" | "onCurrentPlacementChange"
> {
  anchorRef?: Accessor<HTMLElement | undefined>
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  id?: string
  modal?: boolean
  preventScroll?: boolean
  forceMount?: boolean
  translations?: PopoverIntlTranslations
}

export interface PopoverRootProps extends ParentProps<PopoverRootOptions> {}

export function PopoverRoot(props: PopoverRootProps) {
  const defaultId = `popover-${createUniqueId()}`

  const mergedProps = mergeDefaultProps(
    {
      id: defaultId,
      modal: false,
      translations: POPOVER_INTL_TRANSLATIONS,
    },
    props,
  )

  const [local, others] = splitProps(mergedProps, [
    "translations",
    "id",
    "open",
    "defaultOpen",
    "onOpenChange",
    "modal",
    "preventScroll",
    "forceMount",
    "anchorRef",
  ])

  const [defaultAnchorRef, setDefaultAnchorRef] = createSignal<HTMLElement>()
  const [triggerRef, setTriggerRef] = createSignal<HTMLElement>()
  const [contentRef, setContentRef] = createSignal<HTMLElement>()

  const [contentId, setContentId] = createSignal<string>()
  const [titleId, setTitleId] = createSignal<string>()
  const [descriptionId, setDescriptionId] = createSignal<string>()

  const disclosureState = createDisclosureState({
    open: () => local.open,
    defaultOpen: () => local.defaultOpen,
    onOpenChange: (isOpen) => local.onOpenChange?.(isOpen),
  })

  const anchorRef = () => {
    return local.anchorRef?.() ?? defaultAnchorRef() ?? triggerRef()
  }

  const { present: contentPresent } = createPresence({
    show: () => local.forceMount || disclosureState.isOpen(),
    element: () => contentRef() ?? null,
  })

  const dataset: Accessor<PopoverDataSet> = createMemo(() => ({
    "data-expanded": disclosureState.isOpen() ? "" : undefined,
    "data-closed": !disclosureState.isOpen() ? "" : undefined,
  }))

  const context: PopoverContextValue = {
    translations: () => local.translations ?? POPOVER_INTL_TRANSLATIONS,
    dataset,
    isOpen: disclosureState.isOpen,
    isModal: () => local.modal ?? false,
    preventScroll: () => local.preventScroll ?? context.isModal(),
    contentPresent,
    triggerRef,
    contentId,
    titleId,
    descriptionId,
    setDefaultAnchorRef,
    setTriggerRef,
    setContentRef,
    close: disclosureState.close,
    toggle: disclosureState.toggle,
    generateId: createGenerateId(() => local.id!),
    registerContentId: createRegisterId(setContentId),
    registerTitleId: createRegisterId(setTitleId),
    registerDescriptionId: createRegisterId(setDescriptionId),
  }

  return (
    <PopoverContext.Provider value={context}>
      <Popper anchorRef={anchorRef} contentRef={contentRef} {...others} />
    </PopoverContext.Provider>
  )
}
