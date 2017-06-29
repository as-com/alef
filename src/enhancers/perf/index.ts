/* eslint-disable no-console */
import {RendererConstructor} from "../../Renderer";
import {Rule} from "../../types/Rule";

let counter = 0;

export type WithPerfInstance = {}

export interface WithPerf {
	new (...args: any[]): WithPerfInstance;
}

export default function PerfEnhancer<T extends RendererConstructor>(Base: T): WithPerf & T {
	return class extends Base {
		public renderRule(rule: Rule, props: Object = {}): string {
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
