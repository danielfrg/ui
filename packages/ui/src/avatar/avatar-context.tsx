import { type Accessor, createContext, useContext } from "solid-js";

import type { AvatarLoadingStatus } from "./types";

export interface AvatarContextValue {
	fallbackDelay: Accessor<number | undefined>;
	imageLoadingStatus: Accessor<AvatarLoadingStatus>;
	onImageLoadingStatusChange: (status: AvatarLoadingStatus) => void;
}

export const AvatarContext = createContext<AvatarContextValue>();

export function useAvatarContext() {
	const context = useContext(AvatarContext);

	if (context === undefined) {
		throw new Error(
			"[ui]: `useAvatarContext` must be used within an `Avatar.Root` component",
		);
	}

	return context;
}
