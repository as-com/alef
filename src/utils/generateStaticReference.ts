import {StyleObject} from "../types/StyleObject";
export default function generateStaticReference(style: string | StyleObject,
                                                selector?: string): string {
	if (typeof style === "string") {
		return style;
	}

	if (selector) {
		return selector + JSON.stringify(style);
	}

	return "";
}
