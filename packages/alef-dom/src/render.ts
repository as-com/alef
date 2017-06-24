import { renderToElement } from "alef-tools";

import createDOMInterface from "./DOMInterface";
import initStyleNodes from "./initStyleNodes";

import DOMRenderer from "../../../types/DOMRenderer";
import DOMNode from "../../../types/DOMNode";

let warnDeprecated = false;

export default function render(
	renderer: DOMRenderer,
	mountNode: DOMNode
): void {
	// legacy support for single stylesheets
	// will be removed soon
	if (mountNode) {
		if (!warnDeprecated) {
			// TODO: warn
			warnDeprecated = true;
		}

		renderToElement(renderer, mountNode);
	} else {
		initStyleNodes(renderer);
		const updateInterface = createDOMInterface(renderer);
		renderer.subscribe(updateInterface);
	}
}
