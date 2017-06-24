import arrayReduce from "./arrayReduce";

export default function reflushStyleNodes(): Object {
	return arrayReduce(
		document.querySelectorAll("[data-alef-type]"),
		(styleNodes, element) => {
			const type = element.getAttribute("data-alef-type") || "";
			const media = element.getAttribute("media") || "";

			styleNodes[type + media] = element;
			return styleNodes;
		},
		{}
	);
}
