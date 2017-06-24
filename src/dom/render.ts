import { renderToElement } from "alef-tools";

import createDOMInterface from "./DOMInterface";
import initStyleNodes from "./initStyleNodes";

import { DOMRenderer } from "../../types/DOMRenderer";
import { DOMNode } from "../../types/DOMNode";

let warnDeprecated = false;

export default function render(
	renderer: DOMRenderer
): void {
	initStyleNodes(renderer);
	const updateInterface = createDOMInterface(renderer);
	renderer.subscribe(updateInterface);
}
