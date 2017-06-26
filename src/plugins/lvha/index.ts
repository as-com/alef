const precedence = {
	":link": 0,
	":visited": 1,
	":hover": 2,
	":focus": 3,
	":active": 4
};

const pseudoClasses = Object.keys(precedence);

function orderLVHA(style: object): Object {
	const pseudoList = [];

	for (const property in style) {
		if (precedence.hasOwnProperty(property)) {
			pseudoList[precedence[property]] = style[property];
			delete style[property];
		}
	}

	for (let i = 0, len = pseudoList.length; i < len; i++) {
		const pseudoStyle = pseudoList[i];
		if (pseudoStyle) {
			style[pseudoClasses[i]] = pseudoStyle;
		}
	}

	return style;
}

export default function LVHA() {
	return orderLVHA;
}
