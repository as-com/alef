import {Style} from "../types/Style";
export default function generateStaticReference(style: string | Style,
                                                selector?: string): string {
	if (typeof style === "string") {
		return style;
	}

	if (selector) {
		return selector + JSON.stringify(style);
	}

	return "";
}
