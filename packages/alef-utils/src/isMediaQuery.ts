export default function isMediaQuery(property: string): boolean {
	return property.charAt(0) === "@"
		&& property.charAt(1) === "m"
		&& property.charAt(2) === "e"
		&& property.charAt(3) === "d"
		&& property.charAt(4) === "i"
		&& property.charAt(5) === "a";
}
