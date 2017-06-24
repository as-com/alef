// https://stackoverflow.com/a/27696695/1591742
const digitsStr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-";
const digits = digitsStr.split('');
const digitsMap = {};
for (let i = 0; i < digits.length; i++) {
	digitsMap[digits[i]] = i;
}

export function encode(int32: number) {
	let result = '';
	while (true) {
		result = digits[int32 & 0x3f] + result;
		int32 >>>= 6;
		if (int32 === 0)
			break;
	}
	return result;
}

// todo: decode
