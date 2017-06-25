import {RendererConstructor} from "../../Renderer";

export interface ILayoutDebuggerOptions {
	mode?: "outline" | "backgroundColor";
	thickness?: number;
}

const defaultOptions: ILayoutDebuggerOptions = {
	mode: "outline",
	thickness: 1
};

export default function LayoutDebuggerEnhancer<T extends RendererConstructor>(Base: T, options: ILayoutDebuggerOptions = {}) {
	const opts = {
		...defaultOptions,
		...options
	};

	return class extends Base {
		public renderRule(rule: Function, props: any): string {
			const className = super.renderRule(rule, props);

			const ruleName = (<any>rule /* FIXME: Broken TypeScript definition */).name || "debug_layout";
			const color = (ruleName + ruleName).length * 17 * ruleName.length;

			const debugLayoutClassName = `alef-debug-layout_${ruleName}`;

			if (opts.mode === "backgroundColor") {
				this.renderStatic(
					{
						backgroundColor: `hsla(${color}, 100%, 25%, 0.1) !important`
					},
					`.${debugLayoutClassName}`
				);
			} else {
				this.renderStatic(
					{
						outline: `${options.thickness}px solid hsl(${color}, 100%, 50%) !important`
					},
					`.${debugLayoutClassName}`
				);
			}

			return `${debugLayoutClassName} ${className}`;
		}
	}
}
