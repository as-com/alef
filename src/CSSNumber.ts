export type CSSUnit = "em" | "px" | "rem" | "%" | "vh" | "vw" | "vi" | "vb" | "vmin" | "vmax" | "mm" | "q" | "cm" |
	"in" | "pt" | "pc" | "ex" | "cap" | "ch" | "ic" | "lh" | "rlh" | "mozmm" | "deg" | "grad" | "rad" | "turn" | "fr" |
	"Hz" | "kHz" | "dpi" | "dpcm" | "dppx" | "s" | "ms" | string;

export default class CSSNumber {
	public readonly value: number;
	public readonly unit: CSSUnit;

	public constructor(value: number, unit: CSSUnit) {
		this.value = value;
		this.unit = unit;
	}

	public add(num: CSSNumber, unit: CSSUnit = this.unit) {
		return new CSSNumber(this.value + num.value, unit);
	}

	public addN(num: number, unit: CSSUnit = this.unit) {
		return new CSSNumber(this.value + num, unit);
	}


	public sub(num: CSSNumber, unit: CSSUnit = this.unit) {
		return new CSSNumber(this.value - num.value, unit);
	}

	public subN(num: number, unit: CSSUnit = this.unit) {
		return new CSSNumber(this.value - num, unit);
	}


	public mul(num: CSSNumber, unit: CSSUnit = this.unit) {
		return new CSSNumber(this.value * num.value, unit);
	}

	public mulN(num: number, unit: CSSUnit = this.unit) {
		return new CSSNumber(this.value * num, unit);
	}


	public div(num: CSSNumber, unit: CSSUnit = this.unit) {
		return new CSSNumber(this.value / num.value, unit);
	}

	public divN(num: number, unit: CSSUnit = this.unit) {
		return new CSSNumber(this.value / num, unit);
	}

	public toString() {
		if (this.value === 0) {
			return "0";
		}

		// round it to a few decimal places
		return Math.round(this.value * 100000) / 100000 + this.unit;
	}
}
