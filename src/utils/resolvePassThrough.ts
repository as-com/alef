export default function resolvePassThrough(passThrough: ((props: object) => string[]) | string[],
                                           ruleProps: object): string[] {
	if (typeof passThrough === "function") {
		return passThrough(ruleProps);
	}

	return passThrough;
}
