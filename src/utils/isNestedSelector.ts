export default function isNestedSelector(property: string): boolean {
	const firstChar = property.charAt(0);
	return firstChar === ":" || firstChar === "[" || firstChar === ">" || firstChar === "&";
}
