import {
  FieldRoot as Root,
  type FieldRootCommonProps,
  type FieldRootOptions,
  type FieldRootProps,
  type FieldRootRenderProps,
} from "./field-root"

export type { FieldRootOptions, FieldRootCommonProps, FieldRootRenderProps, FieldRootProps }

export { Root }

export const Field = Root

// Re-export form control sub-components as Field parts
export {
  FormControlLabel as Label,
  type FormControlLabelProps as LabelProps,
  type FormControlLabelCommonProps as LabelCommonProps,
  type FormControlLabelOptions as LabelOptions,
  type FormControlLabelRenderProps as LabelRenderProps,
} from "../form-control"

export {
  FormControlDescription as Description,
  type FormControlDescriptionProps as DescriptionProps,
  type FormControlDescriptionCommonProps as DescriptionCommonProps,
  type FormControlDescriptionOptions as DescriptionOptions,
  type FormControlDescriptionRenderProps as DescriptionRenderProps,
} from "../form-control"

export {
  FormControlErrorMessage as Error,
  type FormControlErrorMessageProps as ErrorProps,
  type FormControlErrorMessageCommonProps as ErrorCommonProps,
  type FormControlErrorMessageOptions as ErrorOptions,
  type FormControlErrorMessageRenderProps as ErrorRenderProps,
} from "../form-control"
