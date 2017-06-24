import StyleType from "./styleType";

export default function createStyleMarkup(
	css: string,
	type: StyleType,
	media: string = ""
): string {
	const mediaAttribute = media.length > 0 ? ` media="${media}"` : "";

	return `<style type="text/css" data-alef-type="${type}"${mediaAttribute}>${css}</style>`;
}
