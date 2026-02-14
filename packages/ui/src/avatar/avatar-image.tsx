/*
 * Portions of this file are based on code from radix-ui-primitives.
 * MIT Licensed, Copyright (c) 2022 WorkOS.
 *
 * Credits to the Radix UI team:
 * https://github.com/radix-ui/primitives/blob/21a7c97dc8efa79fecca36428eec49f187294085/packages/react/avatar/src/Avatar.tsx
 */

import {
	Show,
	type ValidComponent,
	createEffect,
	createSignal,
	on,
	onCleanup,
} from "solid-js";
import {
	type ElementOf,
	Polymorphic,
	type PolymorphicProps,
} from "../polymorphic";

import { useAvatarContext } from "./avatar-context";
import type { AvatarLoadingStatus } from "./types";

export interface AvatarImageOptions {}

export interface AvatarImageCommonProps<T extends HTMLElement = HTMLElement> {
	src?: string;
}

export interface AvatarImageRenderProps extends AvatarImageCommonProps {}

export type AvatarImageProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = AvatarImageOptions & Partial<AvatarImageCommonProps<ElementOf<T>>>;

/**
 * The image to render. By default, it will only render when it has loaded.
 */
export function AvatarImage<T extends ValidComponent = "img">(
	props: PolymorphicProps<T, AvatarImageProps<T>>,
) {
	const context = useAvatarContext();

	const [loadingStatus, setLoadingStatus] =
		createSignal<AvatarLoadingStatus>("idle");

	createEffect(
		on(
			() => props.src,
			(src) => {
				if (!src) {
					setLoadingStatus("error");
					return;
				}

				let isMounted = true;
				const image = new window.Image();

				const updateStatus = (status: AvatarLoadingStatus) => () => {
					if (!isMounted) {
						return;
					}

					setLoadingStatus(status);
				};

				setLoadingStatus("loading");
				if (props.crossOrigin !== undefined) {
					image.crossOrigin = props.crossOrigin;
				}
				if (props.referrerPolicy !== undefined) {
					image.referrerPolicy = props.referrerPolicy;
				}
				image.onload = updateStatus("loaded");
				image.onerror = updateStatus("error");
				image.src = src;

				onCleanup(() => {
					isMounted = false;
				});
			},
		),
	);

	createEffect(() => {
		const imageLoadingStatus = loadingStatus();

		if (imageLoadingStatus !== "idle") {
			context.onImageLoadingStatusChange(imageLoadingStatus);
		}
	});

	return (
		<Show when={loadingStatus() === "loaded"}>
			<Polymorphic<AvatarImageRenderProps>
				as="img"
				{...(props as AvatarImageProps)}
			/>
		</Show>
	);
}
