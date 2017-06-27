export default class CSSNumber {
	public value: number;
	public unit: string;

	public constructor(value: number, unit: string) {
		this.value = value;
		this.unit = unit;
	}

	public add(num: CSSNumber, unit: string = this.unit) {
		return new CSSNumber(this.value + num.value, unit);
	}

	public sub(num: CSSNumber, unit: string = this.unit) {
		return new CSSNumber(this.value - num.value, unit);
	}

	public mul(num: CSSNumber, unit: string = this.unit) {
		return new CSSNumber(this.value * num.value, unit);
	}

	public div(num: CSSNumber, unit: string = this.unit) {
		return new CSSNumber(this.value / num.value, unit);
	}

	public toString() {
		// round it to a few decimal places
		return Math.round(this.value * 100000) / 100000 + this.unit;
	}
}
