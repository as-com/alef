export default function extractPassThroughProps(passThrough: string[],
                                                ruleProps: object): any {
	const output: object = {}; // TODO
	for (let i = 0, len = passThrough.length; i < len; i++) {
		const property = passThrough[i];

		output[property] = ruleProps[property];
	}
	return output;
}
