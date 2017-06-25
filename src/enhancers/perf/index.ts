/* eslint-disable no-console */
import {RendererConstructor} from "../../Renderer";

let counter = 0;

export default function PerfEnhancer<T extends RendererConstructor>(Base: T) {
	return class extends Base {
		public renderRule(rule: Function, props: Object = {}): string {
			const timerCounter = `[${++counter}]`;

			console.time(timerCounter);
			// eslint-disable-line
			const className = super.renderRule(rule, props);
			console.log(`${timerCounter} ${(<any>rule /* FIXME: TS Def */).name || "anonym"}`, props);
			// eslint-disable-line
			console.timeEnd(timerCounter);

			// eslint-disable-line
			return className;
		}
	}
}
