import StyleType from "./styleType";

function getDocumentHead(): any { // TODO
	return document.head ? document.head : {};
}

export default function createStyleNode(type: StyleType,
                                        media: string = "",
                                        anchorNode: Object): HTMLStyleElement {
	const head = getDocumentHead();
	const node = document.createElement("style");
	node.setAttribute("data-alef-type", "" + type);
	node.type = "text/css";

	if (media.length > 0) {
		node.media = media;
		head.appendChild(node);
	} else {
		head.insertBefore(node, anchorNode);
	}

	return node;
}
