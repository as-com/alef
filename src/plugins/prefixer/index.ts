import prefix from "inline-style-prefixer/static";
import cssifyObject from "css-in-js-utils/lib/cssifyObject";

import fallbackValue from "alef-plugin-fallback-value";
import { isObject, objectReduce } from "alef-utils";

const resolveFallbackValues = fallbackValue();

function addVendorPrefixes(style: Object): Object {
	return objectReduce(
		style,
		(prefixedStyle, value, property) => {
			if (isObject(value)) {
				prefixedStyle[property] = addVendorPrefixes(value);
			} else {
				const prefixedDeclaration = prefix({
					[property]: style[property]
				});
				const styleKeys = Object.keys(prefixedDeclaration);

				const referenceProperty = styleKeys[0];
				const referenceValue = prefixedDeclaration[referenceProperty];

				if (styleKeys.length === 1) {
					prefixedStyle[referenceProperty] = referenceValue;
				} else {
					delete prefixedDeclaration[referenceProperty];
					const inlinedProperties = cssifyObject(
						resolveFallbackValues(prefixedDeclaration)
					);

					prefixedStyle[
						referenceProperty
					] = `${referenceValue};${inlinedProperties}`;
				}
			}

			return prefixedStyle;
		},
		{}
	);
}

export default function prefixer() {
	return addVendorPrefixes;
}
