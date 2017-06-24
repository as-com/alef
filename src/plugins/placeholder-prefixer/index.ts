import customProperty from "alef-plugin-custom-property";
import { arrayReduce } from "alef-utils";

const placeholderPrefixes = [
	"::-webkit-input-placeholder",
	"::-moz-placeholder",
	":-ms-input-placeholder",
	":-moz-placeholder",
	"::placeholder"
];

export default function placeholderPrefixer() {
	return customProperty({
		"::placeholder": value =>
			arrayReduce(
				placeholderPrefixes,
				(style, prefix) => {
					style[prefix] = value;
					return style;
				},
				{}
			)
	});
}
