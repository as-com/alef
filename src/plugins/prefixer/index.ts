import prefix from "inline-style-prefixer/static";
import cssifyObject from "css-in-js-utils/lib/cssifyObject";

import fallbackValue from "../../plugins/fallback-value";
import objectReduce from "../../utils/objectReduce";
import isObject from "../../utils/isObject";
import {StyleObject} from "../../types/StyleObject";
import {Plugin} from "../../types/Plugin";

const resolveFallbackValues = fallbackValue();

function addVendorPrefixes(style: StyleObject): StyleObject {
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

export default function prefixer(): Plugin {
	return addVendorPrefixes;
}
