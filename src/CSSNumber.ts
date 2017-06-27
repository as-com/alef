export type CSSUnit = "em" | "px" | "rem" | "%" | "vh" | "vw" | "vi" | "vb" | "vmin" | "vmax" | "mm" | "q" | "cm" |
	"in" | "pt" | "pc" | "ex" | "cap" | "ch" | "ic" | "lh" | "rlh" | "mozmm" | "deg" | "grad" | "rad" | "turn" | "fr" |
	"Hz" | "kHz" | "dpi" | "dpcm" | "dppx" | "s" | "ms" | string;

export default class CSSNumber {
	public value: number;
	public unit: CSSUnit;

	public constructor(value: number, unit: CSSUnit) {
		this.value = value;
		this.unit = unit;
	}

	public add(num: CSSNumber, unit: CSSUnit = this.unit) {
		return new CSSNumber(this.value + num.value, unit);
	}

	public sub(num: CSSNumber, unit: CSSUnit = this.unit) {
		return new CSSNumber(this.value - num.value, unit);
	}

	public mul(num: CSSNumber, unit: CSSUnit = this.unit) {
		return new CSSNumber(this.value * num.value, unit);
	}

	public div(num: CSSNumber, unit: CSSUnit = this.unit) {
		return new CSSNumber(this.value / num.value, unit);
	}

	public toString() {
		if (this.value === 0) {
			return "0";
		}

		// round it to a few decimal places
		return Math.round(this.value * 100000) / 100000 + this.unit;
	}
}
