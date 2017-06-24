export default function isValidHTMLElement(mountNode: any): boolean {
	return mountNode && mountNode.nodeType === 1;
}
