import placeholderPrefixer from "../../plugins/placeholder-prefixer/index";

describe("Placeholder prefixer plugin", () => {
	it("should add placeholder prefixes", () => {
		const style = {
			width: 20,
			"::placeholder": { color: "red" }
		};

		expect(placeholderPrefixer()(style)).toEqual({
			width: 20,
			"::-webkit-input-placeholder": { color: "red" },
			"::-moz-placeholder": { color: "red" },
			":-ms-input-placeholder": { color: "red" },
			":-moz-placeholder": { color: "red" },
			"::placeholder": { color: "red" }
		});
	});
});
