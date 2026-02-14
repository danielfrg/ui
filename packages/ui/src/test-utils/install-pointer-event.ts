import { afterAll, beforeAll, vi } from "vitest";

export function installPointerEvent() {
	beforeAll(() => {
		// @ts-ignore
		vi.stubGlobal(
			"PointerEvent",
			class FakePointerEvent extends MouseEvent {
				_init: {
					pageX: number;
					pageY: number;
					pointerType: string;
					pointerId: number;
					width: number;
					height: number;
				};

				constructor(name: string, init: any) {
					super(name, init);
					this._init = init;
				}

				get pointerType() {
					return this._init.pointerType;
				}

				get pointerId() {
					return this._init.pointerId;
				}

				override get pageX() {
					return this._init.pageX;
				}

				override get pageY() {
					return this._init.pageY;
				}

				get width() {
					return this._init.width;
				}

				get height() {
					return this._init.height;
				}
			},
		);
	});

	afterAll(() => {
		// @ts-ignore
		global.PointerEvent = undefined;
	});
}
