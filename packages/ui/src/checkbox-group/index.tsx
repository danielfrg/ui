import {
  CheckboxGroupRoot as Root,
  type CheckboxGroupRootCommonProps,
  type CheckboxGroupRootOptions,
  type CheckboxGroupRootProps,
  type CheckboxGroupRootRenderProps,
} from "./checkbox-group-root"

export type {
  CheckboxGroupRootOptions,
  CheckboxGroupRootCommonProps,
  CheckboxGroupRootRenderProps,
  CheckboxGroupRootProps,
}

export { Root }

export const CheckboxGroup = Root

export { useCheckboxGroupContext, type CheckboxGroupContextValue } from "./checkbox-group-context"
