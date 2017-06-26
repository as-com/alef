import arrayReduce from "../../utils/arrayReduce";

function addIsolation(style: any, exclude: string[] = []): Object {
	if (style.isolation === false) {
		// remove the isolation prop to
		// prevent false CSS properties
		delete style.isolation;
		return style;
	}

	const excludedDeclarations: { [p: string]: string } = {};
	for (let i = 0, len = exclude.length; i < len; i++) {
		excludedDeclarations[exclude[i]] = "inherit";
	}

	return {
		all: "initial",
		...excludedDeclarations,
		...style
	};
}

export default function isolation(options: any = {}) {
	return (style: Object) => addIsolation(style, options.exclude);
}
