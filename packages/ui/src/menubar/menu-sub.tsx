import type { ParentProps } from "solid-js";

import { useLocale } from "../i18n";
import { InternalMenu, type InternalMenuOptions } from "./menu";

export interface MenuSubOptions
	extends Omit<InternalMenuOptions, "placement" | "flip" | "sameWidth"> {}

export interface MenuSubProps extends ParentProps<MenuSubOptions> {}

export function MenuSub(props: MenuSubProps) {
	const { direction } = useLocale();

	return (
		<InternalMenu
			placement={direction() === "rtl" ? "left-start" : "right-start"}
			flip
			{...props}
		/>
	);
}
