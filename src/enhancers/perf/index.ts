/* eslint-disable no-console */
import {DOMRenderer} from "../../../types/DOMRenderer";

let counter = 0;

function addPerfTool(
	renderer: DOMRenderer
): DOMRenderer {
	const existingRenderRule = renderer.renderRule.bind(renderer);

	renderer.renderRule = (rule: Function, props: Object): string => {
		const timerCounter = `[${++counter}]`;

		console.time(timerCounter);
		// eslint-disable-line
		const className = existingRenderRule(rule, props);
		console.log(`${timerCounter} ${(<any>rule /* FIXME: TS Def */).name || "anonym"}`, props);
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
