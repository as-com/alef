import cssbeautify from "cssbeautify";

import objectReduce from "../../utils/objectReduce";
import {RendererConstructor} from "../../Renderer";

const defaultOptions = {
	indent: "  ",
	openbrace: "end-of-line",
	autosemicolon: false
};

export type WithBeautifierInstance = {};

export interface WithBeautifier {
	new (...args: any[]): WithBeautifierInstance;
}

export default function BeautifierEnhancer<T extends RendererConstructor>(Base: T, options: object = {}): WithBeautifier & T {
	const opts = {
		...defaultOptions,
		...options
	};

	return class extends Base {
		public constructor(...args: any[]) {
			super(...args);

			this.subscribe(() => {
				this.fontFaces = cssbeautify(this.fontFaces, opts);
				this.keyframes = cssbeautify(this.keyframes, opts);
				this.statics = cssbeautify(this.statics, opts);
				this.rules = cssbeautify(this.rules, opts);

				this.mediaRules = objectReduce(
					this.mediaRules,
					(mediaRules, rules, query) => {
						mediaRules[query] = cssbeautify(rules, opts);
						return mediaRules;
					},
					{}
				);
			});
		}
	}
}
