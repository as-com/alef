/* eslint-disable no-console */
import DOMRenderer from "../../../types/DOMRenderer";
import NativeRenderer from "../../../types/NativeRenderer";

let counter = 0;

function addPerfTool(
	renderer: DOMRenderer | NativeRenderer
): DOMRenderer | NativeRenderer {
	const existingRenderRule = renderer.renderRule.bind(renderer);

	renderer.renderRule = (rule: Function, props: Object): string => {
		const timerCounter = `[${++counter}]`;

		console.time(timerCounter);
		// eslint-disable-line
		const className = existingRenderRule(rule, props);
		console.log(`${timerCounter} ${rule.name || "anonym"}`, props);
		// eslint-disable-line
		console.timeEnd(timerCounter);

		// eslint-disable-line
		return className;
	};

	return renderer;
}

export default function perf() {
	return addPerfTool;
}
