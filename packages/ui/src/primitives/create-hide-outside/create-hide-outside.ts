/*
 * This file is based on code from react-spectrum.
 * Apache License Version 2.0, Copyright 2020 Adobe.
 *
 * Credits to the React Spectrum team:
 * https://github.com/adobe/react-spectrum/blob/810579b671791f1593108f62cdc1893de3a220e3/packages/@react-aria/overlays/src/ariaHideOutside.ts
 */

import { type MaybeAccessor, access } from "../../utils"
import { createEffect, onCleanup } from "solid-js"

import { DATA_TOP_LAYER_ATTR } from "../../dismissable-layer/layer-stack"

const DATA_LIVE_ANNOUNCER_ATTR = "data-live-announcer"

export interface CreateHideOutsideProps {
  /** The elements that should remain visible. */
  targets: MaybeAccessor<Array<Element>>

  /** Nothing will be hidden above this element. */
  root?: MaybeAccessor<HTMLElement | undefined>

  /** Whether the hide outside behavior is disabled or not. */
  isDisabled?: MaybeAccessor<boolean | undefined>
}

export function createHideOutside(props: CreateHideOutsideProps) {
  createEffect(() => {
    if (access(props.isDisabled)) {
      return
    }

    onCleanup(ariaHideOutside(access(props.targets), access(props.root)))
  })
}

interface ObserverWrapper {
  observe(): void
  disconnect(): void
}

const refCountMap = new WeakMap<Element, number>()
const observerStack: Array<ObserverWrapper> = []

export function ariaHideOutside(targets: Element[], root = document.body) {
  const visibleNodes = new Set<Element>(targets)
  const hiddenNodes = new Set<Element>()

  const walk = (root: Element) => {
    for (const element of root.querySelectorAll(`[${DATA_LIVE_ANNOUNCER_ATTR}], [${DATA_TOP_LAYER_ATTR}]`)) {
      visibleNodes.add(element)
    }

    const acceptNode = (node: Element) => {
      if (
        visibleNodes.has(node) ||
        (node.parentElement && hiddenNodes.has(node.parentElement) && node.parentElement.getAttribute("role") !== "row")
      ) {
        return NodeFilter.FILTER_REJECT
      }

      for (const target of visibleNodes) {
        if (node.contains(target)) {
          return NodeFilter.FILTER_SKIP
        }
      }

      return NodeFilter.FILTER_ACCEPT
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
      acceptNode,
    })

    const acceptRoot = acceptNode(root)
    if (acceptRoot === NodeFilter.FILTER_ACCEPT) {
      hide(root)
    }

    if (acceptRoot !== NodeFilter.FILTER_REJECT) {
      let node = walker.nextNode() as Element
      while (node != null) {
        hide(node)
        node = walker.nextNode() as Element
      }
    }
  }

  const hide = (node: Element) => {
    const refCount = refCountMap.get(node) ?? 0

    if (node.getAttribute("aria-hidden") === "true" && refCount === 0) {
      return
    }

    if (refCount === 0) {
      node.setAttribute("aria-hidden", "true")
    }

    hiddenNodes.add(node)
    refCountMap.set(node, refCount + 1)
  }

  if (observerStack.length) {
    observerStack[observerStack.length - 1]!.disconnect()
  }

  walk(root)

  const observer = new MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type !== "childList" || change.addedNodes.length === 0) {
        continue
      }

      if (![...visibleNodes, ...hiddenNodes].some((node) => node.contains(change.target))) {
        for (const node of change.removedNodes) {
          if (node instanceof Element) {
            visibleNodes.delete(node)
            hiddenNodes.delete(node)
          }
        }

        for (const node of change.addedNodes) {
          if (
            (node instanceof HTMLElement || node instanceof SVGElement) &&
            (node.dataset.liveAnnouncer === "true" || node.dataset.reactAriaTopLayer === "true")
          ) {
            visibleNodes.add(node)
          } else if (node instanceof Element) {
            walk(node)
          }
        }
      }
    }
  })

  observer.observe(root, { childList: true, subtree: true })

  const observerWrapper = {
    observe() {
      observer.observe(root, { childList: true, subtree: true })
    },
    disconnect() {
      observer.disconnect()
    },
  }

  observerStack.push(observerWrapper)

  return () => {
    observer.disconnect()

    for (const node of hiddenNodes) {
      const count = refCountMap.get(node)

      if (count == null) {
        return
      }

      if (count === 1) {
        node.removeAttribute("aria-hidden")
        refCountMap.delete(node)
      } else {
        refCountMap.set(node, count - 1)
      }
    }

    if (observerWrapper === observerStack[observerStack.length - 1]) {
      observerStack.pop()
      if (observerStack.length) {
        observerStack[observerStack.length - 1]!.observe()
      }
    } else {
      observerStack.splice(observerStack.indexOf(observerWrapper), 1)
    }
  }
}
