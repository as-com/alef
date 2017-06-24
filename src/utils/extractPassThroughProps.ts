import arrayReduce from "./arrayReduce";

export default function extractPassThroughProps(
	passThrough: string[],
	ruleProps: Object
): any {
	return arrayReduce(
		passThrough,
		(output, property) => {
			output[property] = ruleProps[property];
			return output;
		},
		{}
	);
}
