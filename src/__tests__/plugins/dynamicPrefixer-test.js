import dynamicPrefixer from "../../plugins/dynamic-prefixer/index";

describe("Dynamic Prefixer plugin", () => {
	it("should prefix styles", () => {
		const style = {
			transition: "200ms all linear",
			userSelect: "none",
			boxSizing: "border-box",
			display: "flex",
			color: "blue"
		};

		expect(
			dynamicPrefixer({
				userAgent: "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/25.0.1216.0 Safari/537.2"
			})(style)
		).toEqual({
			transition: "200ms all linear",
			WebkitUserSelect: "none",
			boxSizing: "border-box",
			display: "-webkit-flex",
			color: "blue"
		});
	});
});
