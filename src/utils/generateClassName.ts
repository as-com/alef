import {encode} from "./base64";
import problematicClasses from "./problematicClasses";

import {DOMRenderer} from "../types/DOMRenderer";

const chars = "abcdefghijklmnopqrstuvwxyz";
const charLength = chars.length;

const adSearch = /ad/i;

export default function generateClassName(renderer: DOMRenderer): string {
	// TODO: Write tests for this fragile thing

	// skipping 0-9, borrowed from Styletron
	if (renderer.ruleCtr === renderer.msb + 1) {
		renderer.ruleCtr += (renderer.msb + 1) * 9;
		renderer.msb = Math.pow(64, ++renderer.power) - 1;
	}

	let gen = encode(renderer.ruleCtr);

	// make sure the class is not going to be blocked by adblock
	if (renderer.selectorPrefix && problematicClasses.has(gen)) {
		renderer.ruleCtr++;
		return generateClassName(renderer);
	}

	let adCheck = gen.search(adSearch);
	if (adCheck !== -1) {
		renderer.ruleCtr += Math.pow(64, gen.length - adCheck - 2);
		return generateClassName(renderer);
	}

	renderer.ruleCtr++;

	return gen;
}
