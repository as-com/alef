import createDOMInterface from "./DOMInterface";
import initStyleNodes from "./initStyleNodes";
import Renderer from "../Renderer";

export default function render(
	renderer: Renderer
): void {
	initStyleNodes(renderer);
	const updateInterface = createDOMInterface(renderer);
	renderer.subscribe(updateInterface);
}
