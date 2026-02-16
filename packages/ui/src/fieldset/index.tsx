import {
  FieldsetRoot as Root,
  type FieldsetRootCommonProps,
  type FieldsetRootOptions,
  type FieldsetRootProps,
  type FieldsetRootRenderProps,
} from "./fieldset-root"

import {
  FieldsetLegend as Legend,
  type FieldsetLegendCommonProps,
  type FieldsetLegendOptions,
  type FieldsetLegendProps,
  type FieldsetLegendRenderProps,
} from "./fieldset-legend"

export type {
  FieldsetRootOptions,
  FieldsetRootCommonProps,
  FieldsetRootRenderProps,
  FieldsetRootProps,
  FieldsetLegendOptions,
  FieldsetLegendCommonProps,
  FieldsetLegendRenderProps,
  FieldsetLegendProps,
}

export { Root, Legend }

export const Fieldset = Root
