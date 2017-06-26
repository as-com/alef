import {IStyleNodes} from "../client/ClientRenderer";

export default function reflushStyleNodes(): IStyleNodes {
	const sheets = document.querySelectorAll("[data-alef-type]");

	let styleNodes: { [node: string]: HTMLStyleElement } = {};
	for (let i = 0, len = sheets.length; i < len; i++) {
		const element = sheets[i];

		const type = element.getAttribute("data-alef-type") || "";
		const media = element.getAttribute("media") || "";

		styleNodes[type + media] = <HTMLStyleElement>element;
	}

	return styleNodes;
}
