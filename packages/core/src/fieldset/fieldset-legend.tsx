import { type ParentProps, type ValidComponent } from "solid-js"

import { type ElementOf, Polymorphic, type PolymorphicProps } from "../polymorphic"

export interface FieldsetLegendOptions {}

export interface FieldsetLegendCommonProps<T extends HTMLElement = HTMLElement> {}

export interface FieldsetLegendRenderProps extends FieldsetLegendCommonProps {}

export type FieldsetLegendProps<T extends ValidComponent | HTMLElement = HTMLElement> = FieldsetLegendOptions &
  Partial<FieldsetLegendCommonProps<ElementOf<T>>>

/**
 * The caption for the parent `Fieldset`. Renders a native `<legend>` element.
 */
export function FieldsetLegend<T extends ValidComponent = "legend">(
  props: PolymorphicProps<T, ParentProps<FieldsetLegendProps<T>>>,
) {
  return <Polymorphic<FieldsetLegendRenderProps> as="legend" {...(props as ParentProps<FieldsetLegendProps>)} />
}
