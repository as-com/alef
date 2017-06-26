import customProperty from "../custom-property/index";

const placeholderPrefixes = [
	"::-webkit-input-placeholder",
	"::-moz-placeholder",
	":-ms-input-placeholder",
	":-moz-placeholder",
	"::placeholder"
];
const ppl = placeholderPrefixes.length;

export default function placeholderPrefixer() {
	return customProperty({
		"::placeholder": (value: any) => { // TODO
			const style: any = {};
			for (let i = 0; i < ppl; i++) {
				style[placeholderPrefixes[i]] = value;
			}
			return style;
		}
	});
}
