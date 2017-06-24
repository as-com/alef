import { arrayReduce } from "alef-utils";

function addIsolation(style: any, exclude: string[] = []): Object {
	if (style.isolation === false) {
		// remove the isolation prop to
		// prevent false CSS properties
		delete style.isolation;
		return style;
	}

	const excludedDeclarations = arrayReduce(
		exclude,
		(exclusion, property) => {
			exclusion[property] = "inherit";
			return exclusion;
		},
		{}
	);

	return {
		all: "initial",
		...excludedDeclarations,
		...style
	};
}

export default function isolation(options: any = {}) {
	return (style: Object) => addIsolation(style, options.exclude);
}