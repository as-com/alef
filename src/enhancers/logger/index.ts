/* eslint-disable consistent-return, no-console */
import cssbeautify from "cssbeautify";

import {CLEAR_TYPE} from "../../utils/styleType";
import {RendererConstructor} from "../../Renderer";

export interface ILoggerOptions {
	logCSS?: boolean;
	formatCSS?: boolean;
}

export type WithLoggerInstance = {};

export interface WithLogger {
	new (...args: any[]): WithLoggerInstance;
}

export default function LoggerEnhancer<T extends RendererConstructor>(Base: T, options: ILoggerOptions): WithLogger & T {
	return class extends Base {
		public constructor(...args: any[]) {
			super(...args);

			this.subscribe(change => {
				if (change.type === CLEAR_TYPE) {
					console.log("Cleared renderer cache.");
					return true;
				}

				const selector = change.selector || change.fontFamily || change.name;
				const css =
					change.declaration ||
					change.keyframe ||
					change.fontFace ||
					change.css;
				const formattedCSS = options.formatCSS ? cssbeautify(css) : css;
				const isMedia = change.media && change.media.length > 0;

				// logs all information in a group
				console.group(selector);
				if (isMedia) {
					console.log(change.media);
				}
				if (options.logCSS) {
					console.log(formattedCSS);
				}
				console.groupEnd();
			});
		}
	}
}
