import {
	FormControlDescription as Description,
	FormControlErrorMessage as ErrorMessage,
	FormControlLabel as Label,
	type FormControlDescriptionCommonProps as InputDescriptionCommonProps,
	type FormControlDescriptionOptions as InputDescriptionOptions,
	type FormControlDescriptionProps as InputDescriptionProps,
	type FormControlDescriptionRenderProps as InputDescriptionRenderProps,
	type FormControlErrorMessageCommonProps as InputErrorMessageCommonProps,
	type FormControlErrorMessageOptions as InputErrorMessageOptions,
	type FormControlErrorMessageProps as InputErrorMessageProps,
	type FormControlErrorMessageRenderProps as InputErrorMessageRenderProps,
	type FormControlLabelCommonProps as InputLabelCommonProps,
	type FormControlLabelOptions as InputLabelOptions,
	type FormControlLabelProps as InputLabelProps,
	type FormControlLabelRenderProps as InputLabelRenderProps,
} from "../form-control";
import {
	InputField as Field,
	type InputFieldCommonProps,
	type InputFieldOptions,
	type InputFieldProps,
	type InputFieldRenderProps,
} from "./input-field";
import {
	InputRoot as Root,
	type InputRootCommonProps,
	type InputRootOptions,
	type InputRootProps,
	type InputRootRenderProps,
} from "./input-root";
import {
	InputTextArea as TextArea,
	type InputTextAreaCommonProps,
	type InputTextAreaOptions,
	type InputTextAreaProps,
	type InputTextAreaRenderProps,
} from "./input-text-area";

export type {
	InputDescriptionOptions,
	InputDescriptionCommonProps,
	InputDescriptionRenderProps,
	InputDescriptionProps,
	InputErrorMessageOptions,
	InputErrorMessageCommonProps,
	InputErrorMessageRenderProps,
	InputErrorMessageProps,
	InputFieldOptions,
	InputFieldCommonProps,
	InputFieldRenderProps,
	InputFieldProps,
	InputLabelOptions,
	InputLabelCommonProps,
	InputLabelRenderProps,
	InputLabelProps,
	InputRootOptions,
	InputRootCommonProps,
	InputRootRenderProps,
	InputRootProps,
	InputTextAreaOptions,
	InputTextAreaCommonProps,
	InputTextAreaRenderProps,
	InputTextAreaProps,
};
export { Description, ErrorMessage, Field, Label, Root, TextArea };

export const Input = Object.assign(Root, {
	Description,
	ErrorMessage,
	Field,
	Label,
	TextArea,
});

export {
	useInputContext,
	type InputContextValue,
} from "./input-context";
