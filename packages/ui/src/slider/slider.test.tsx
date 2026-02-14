import { render } from "@solidjs/testing-library";

import * as Slider from ".";

describe("Slider", () => {
	it("should render a basic slider", () => {
		const { getByRole, getAllByRole } = render(() => (
			<Slider.Root>
				<Slider.Track>
					<Slider.Fill />
					<Slider.Thumb>
						<Slider.Input />
					</Slider.Thumb>
				</Slider.Track>
			</Slider.Root>
		));

		const group = getByRole("group");
		expect(group).toBeInTheDocument();

		// Both thumb <span> and hidden <input type="range"> have role="slider"
		const sliders = getAllByRole("slider");
		expect(sliders.length).toBe(2);
	});

	it("should render with default value", () => {
		const { getAllByRole } = render(() => (
			<Slider.Root defaultValue={[50]}>
				<Slider.Track>
					<Slider.Fill />
					<Slider.Thumb>
						<Slider.Input />
					</Slider.Thumb>
				</Slider.Track>
			</Slider.Root>
		));

		// The thumb <span> has aria-valuenow, find it among the slider roles
		const sliders = getAllByRole("slider");
		const thumb = sliders.find((el) => el.hasAttribute("aria-valuenow"));
		expect(thumb).toHaveAttribute("aria-valuenow", "50");
	});

	it("should render with label", () => {
		const { getByText } = render(() => (
			<Slider.Root defaultValue={[50]}>
				<Slider.Label>Volume</Slider.Label>
				<Slider.Track>
					<Slider.Fill />
					<Slider.Thumb>
						<Slider.Input />
					</Slider.Thumb>
				</Slider.Track>
			</Slider.Root>
		));

		const label = getByText("Volume");
		expect(label).toHaveTextContent("Volume");
	});

	it("should render with value label", () => {
		const { getByTestId } = render(() => (
			<Slider.Root defaultValue={[50]}>
				<Slider.ValueLabel data-testid="value-label" />
				<Slider.Track>
					<Slider.Fill />
					<Slider.Thumb>
						<Slider.Input />
					</Slider.Thumb>
				</Slider.Track>
			</Slider.Root>
		));

		const valueLabel = getByTestId("value-label");
		expect(valueLabel).toHaveTextContent("50");
	});

	it("should render with multiple thumbs", () => {
		const { getAllByRole } = render(() => (
			<Slider.Root defaultValue={[20, 80]}>
				<Slider.Track>
					<Slider.Fill />
					<Slider.Thumb>
						<Slider.Input />
					</Slider.Thumb>
					<Slider.Thumb>
						<Slider.Input />
					</Slider.Thumb>
				</Slider.Track>
			</Slider.Root>
		));

		const sliders = getAllByRole("slider");
		// 2 thumbs + 2 hidden inputs = 4 elements with role="slider"
		const thumbs = sliders.filter((el) => el.hasAttribute("aria-valuenow"));
		expect(thumbs.length).toBe(2);
	});

	it("should be disabled when disabled", () => {
		const { getAllByRole } = render(() => (
			<Slider.Root disabled defaultValue={[50]}>
				<Slider.Track>
					<Slider.Fill />
					<Slider.Thumb>
						<Slider.Input />
					</Slider.Thumb>
				</Slider.Track>
			</Slider.Root>
		));

		// The hidden <input> has aria-disabled="true"
		const sliders = getAllByRole("slider");
		const input = sliders.find((el) => el.tagName === "INPUT");
		expect(input).toHaveAttribute("aria-disabled", "true");
	});
});
