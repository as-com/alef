import generateCSSRule from "../../utils/generateCSSRule";

describe("Generating css rules", () => {
	it("should return a valid css rule", () => {
		expect(generateCSSRule(".foo", "color:red")).toEqual(".foo{color:red}");
	});
});
