import type { JSX } from "solid-js";
import * as ToggleButton from "@danielfrg/ui/toggle-button";
import styles from "./index.module.css";

export function DemoToggleButtonHero() {
	return (
		<div class={styles.panel}>
			<ToggleButton.Root aria-label="Favorite" class={styles.button}>
				{(state) =>
					state.pressed() ? (
						<HeartFilledIcon class={styles.icon} />
					) : (
						<HeartOutlineIcon class={styles.icon} />
					)
				}
			</ToggleButton.Root>
		</div>
	);
}

function HeartFilledIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="currentcolor"
			{...props}
		>
			<path d="M7.99961 13.8667C7.79961 13.8667 7.59961 13.8001 7.43294 13.6667C2.83294 9.80009 1.33294 8.00009 1.33294 5.73342C1.33294 3.73342 2.86628 2.13342 4.79961 2.13342C6.06628 2.13342 7.13294 2.80009 7.99961 4.06676C8.86628 2.80009 9.93294 2.13342 11.1996 2.13342C13.1329 2.13342 14.6663 3.73342 14.6663 5.73342C14.6663 8.00009 13.1663 9.80009 8.56628 13.6667C8.39961 13.8001 8.19961 13.8667 7.99961 13.8667Z" />
		</svg>
	);
}

function HeartOutlineIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="currentcolor"
			{...props}
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M7.99961 4.8232C7.09587 3.26498 5.9997 2.63342 4.79961 2.63342C3.14269 2.63342 1.83294 4.00498 1.83294 5.73342C1.83294 7.79233 3.24553 9.49498 7.59037 13.1084L7.99961 13.449L8.40885 13.1084C12.7537 9.49498 14.1663 7.79233 14.1663 5.73342C14.1663 4.00498 12.8565 2.63342 11.1996 2.63342C9.99953 2.63342 8.90335 3.26498 7.99961 4.8232ZM7.99961 12.281C3.96327 8.92498 2.83294 7.48062 2.83294 5.73342C2.83294 4.52498 3.72161 3.63342 4.79961 3.63342C5.7945 3.63342 6.68498 4.24282 7.43588 5.50889L7.99961 6.46008L8.56334 5.50889C9.31424 4.24282 10.2047 3.63342 11.1996 3.63342C12.2776 3.63342 13.1663 4.52498 13.1663 5.73342C13.1663 7.48062 12.0359 8.92498 7.99961 12.281Z"
			/>
		</svg>
	);
}
