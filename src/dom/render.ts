import createDOMInterface from "./DOMInterface";
import initStyleNodes from "./initStyleNodes";

import { DOMRenderer } from "../types/DOMRenderer";

let warnDeprecated = false;

export default function render(
	renderer: DOMRenderer
): void {
	initStyleNodes(renderer);
	const updateInterface = createDOMInterface(renderer);
	renderer.subscribe(updateInterface);
}
