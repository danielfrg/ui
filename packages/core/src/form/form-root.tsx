import { type JSX, type ParentProps, type ValidComponent, splitProps } from "solid-js"

import { type ElementOf, Polymorphic, type PolymorphicProps } from "../polymorphic"

export interface FormRootOptions {
  /**
   * Event handler called when the form is submitted.
   * Receives the submit event after `preventDefault` has been called.
   */
  onSubmit?: (event: SubmitEvent) => void
}

export interface FormRootCommonProps<T extends HTMLElement = HTMLElement> {
  onSubmit: JSX.EventHandlerUnion<T, SubmitEvent>
}

export interface FormRootRenderProps extends FormRootCommonProps {
  onSubmit: JSX.EventHandlerUnion<HTMLElement, SubmitEvent>
}

export type FormRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = FormRootOptions &
  Partial<FormRootCommonProps<ElementOf<T>>>

/**
 * A form wrapper that prevents default submission and provides an onSubmit handler.
 * Renders a native `<form>` element.
 */
export function FormRoot<T extends ValidComponent = "form">(props: PolymorphicProps<T, ParentProps<FormRootProps<T>>>) {
  const [local, others] = splitProps(props as ParentProps<FormRootProps>, ["onSubmit"])

  const onSubmit: JSX.EventHandlerUnion<HTMLElement, SubmitEvent> = (e) => {
    e.preventDefault()
    local.onSubmit?.(e)
  }

  return <Polymorphic<FormRootRenderProps> as="form" onSubmit={onSubmit} {...others} />
}
