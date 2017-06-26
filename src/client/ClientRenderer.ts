import Renderer, {IRendererConfig} from "../Renderer";
import reflushStyleNodes from "../utils/reflushStyleNodes";
import {FONT_TYPE, KEYFRAME_TYPE, RULE_TYPE, STATIC_TYPE, default as StyleType, CLEAR_TYPE} from "../utils/styleType";
import getStyleNode from "../utils/getStyleNode";

export type IStyleNodes = { [p: string]: HTMLStyleElement };

const sheetMap = {
	fontFaces: FONT_TYPE,
	statics: STATIC_TYPE,
	keyframes: KEYFRAME_TYPE,
	rules: RULE_TYPE
};

function initNode(
	styleNodes: IStyleNodes,
	baseNode: HTMLStyleElement,
	css: string,
	type: StyleType,
	media: string = ""
): void {
	const node = getStyleNode(styleNodes, baseNode, type, media);
	// in case that there is a node coming from server already
	// but rules are not matchnig
	if (node.textContent !== css) {
		node.textContent = css;
	}
}

export default class ClientRenderer extends Renderer {
	private styleNodes: IStyleNodes = reflushStyleNodes();
	private baseNode = this.styleNodes[RULE_TYPE];

	public constructor(config: IRendererConfig) {
		super(config);

		// initStyleNodes
		for (const style in sheetMap) {
			if (this[style].length > 0) { // TODO: ????
				initNode(
					this.styleNodes,
					this.baseNode,
					this[style],
					sheetMap[style]
				);
			}
		}

		for (const media in this.mediaRules) {
			const mediaCSS = this.mediaRules[media];

			if (mediaCSS.length > 0) {
				initNode(this.styleNodes, this.baseNode, mediaCSS, RULE_TYPE, media);
			}
		}

		// createDOMInterface
		this.subscribe((change) => {
			// CLEAR_TYPE handled the OOP way(tm)

			const styleNode = getStyleNode(
				this.styleNodes,
				this.baseNode,
				change.type,
				change.media
			);

			if (change.type === RULE_TYPE) {
				// only use insertRule in production as browser devtools might have
				// weird behavior if used together with insertRule at runtime
				if (process.env.NODE_ENV !== "production") {
					if (change.media) {
						styleNode.textContent = this.mediaRules[change.media];
					} else {
						styleNode.textContent = this.rules;
					}
				} else {
					try {
						(<CSSStyleSheet> styleNode.sheet).insertRule(
							`${change.selector}{${change.declaration}}`,
							(<CSSStyleSheet> styleNode.sheet).cssRules.length
						);
					} catch (error) {
						// TODO: maybe warn in dev?
					}
				}
			} else {
				styleNode.textContent = this[sheetMap[change.type]];
			}
		});
	}

	public clear(): void {
		super.clear();

		for (const node in this.styleNodes) {
			this.styleNodes[node].textContent = "";
		}

		return;
	}


}
