const warnDeprecated = false;

export default function resolvePassThrough(passThrough: Function | string[],
                                           ruleProps: Object): string[] {
	if (typeof passThrough === "function") {
		const resolved = passThrough(ruleProps);

		if (!Array.isArray(resolved)) {
			if (process.env.NODE_ENV !== "production" && !warnDeprecated) {
				console.warn(
					"Using a function that returns an object of props as `createComponent` `passThroughProps`-parameter is deprecated. It will be removed soon. Instead return an array of prop names. e.g. `props => Object.keys(props)` See https://github.com/rofrischmann/alef/blob/master/packages/react-alef/docs/createComponent.md#functional-passthroughprops"
				);
			}

			return Object.keys(resolved);
		}

		return resolved;
	}

	return passThrough;
}
