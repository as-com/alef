import cssifyObject from "css-in-js-utils/lib/cssifyObject";

import objectReduce from "./objectReduce";

export default function cssifyKeyframe(frames: Object,
                                       animationName: string,
                                       prefixes: string[] = [""]): string {
	const keyframe = objectReduce(
		frames,
		(css, frame, percentage) =>
			`${css}${percentage}{${cssifyObject(frame)}}`,
		""
	);

	let cssKeyframe = "";
	for (let i = 0, len = prefixes.length; i < len; i++) {
		cssKeyframe += `@${prefixes[i]}keyframes ${animationName}{${keyframe}}`;
	}

	return cssKeyframe;
}
