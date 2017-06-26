export default function extractPassThroughProps(passThrough: string[],
                                                ruleProps: any): any {
	const output: { [p: string]: any } = {}; // TODO
	for (let i = 0, len = passThrough.length; i < len; i++) {
		const property = passThrough[i];

		output[property] = ruleProps[property];
	}
	return output;
}
