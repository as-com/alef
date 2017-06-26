export type MediaRules = { [mediaQuery: string]: string };

export default function applyMediaRulesInOrder(order: string[]): MediaRules {
	let mediaRules: MediaRules = {};
	for (let i = 0, len = order.length; i < len; i++) {
		mediaRules[order[i]] = "";
	}

	return mediaRules;
}
