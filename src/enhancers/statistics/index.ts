/* eslint-disable prefer-rest-params */
import gzipSize from "gzip-size";

import {RULE_TYPE} from "../../utils/styleType";
import {RendererConstructor} from "../../Renderer";
import {Rule} from "../../types/Rule";

function lengthInUtf8Bytes(str: string): number {
	const m = encodeURIComponent(str).match(/%[89ABab]/g);
	return str.length + (m ? m.length : 0);
}

export interface WithStatisticsInstance {
	getStatistics(): IStatistics;
}

export interface WithStatistics {
	new (...args: any[]): WithStatisticsInstance;
}

export interface IStatistics {
	count: {
		classes: number;
		pseudoClasses: number
	};
	usage: {};
	size: {
		bytes: number;
		bytesGzipped: number;
		kbytes: number;
		kbytesGzipped: number;
	};
	reuse: {
		percentage: string;
		number: number;
	};
	totalPseudoClasses: number;
	totalMediaQueryClasses: number;
	totalClasses: number;
	totalRenders: number;
	totalUsage: number;
};

export default function StatisticsEnhancer<T extends RendererConstructor>(Base: T): WithStatistics & T {
	return class extends Base {
		private statistics: IStatistics = {
			count: {
				classes: 0,
				pseudoClasses: 0
			},
			usage: {},
			size: null,
			reuse: null,
			totalPseudoClasses: 0,
			totalMediaQueryClasses: 0,
			totalClasses: 0,
			totalRenders: 0,
			totalUsage: 0
		};

		private _addClassNamesToUsage(classNames: string): void {
			classNames.split(" ").forEach(className => {
				if (!this.statistics.usage[className]) {
					this.statistics.usage[className] = 0;
				}
				this.statistics.usage[className]++;
				this.statistics.totalUsage++;
			});
		}

		private _calculateReuse(): number {
			const quotient =
				(this.statistics.totalUsage - this.statistics.totalClasses) /
				this.statistics.totalUsage;
			return Math.floor(quotient * 10000) / 10000;
		}

		public getStatistics(): IStatistics {
			const currentStats: IStatistics = {...this.statistics};

			const reuse = this._calculateReuse();
			currentStats.reuse = {
				percentage: `${reuse * 100}%`,
				number: reuse
			};

			const currentCSS = this.renderToString();
			const bytes = lengthInUtf8Bytes(currentCSS);

			currentStats.size = {
				bytes,
				bytesGzipped: gzipSize.sync(currentCSS),
				kbytes: Math.floor(bytes / 10) / 100,
				kbytesGzipped: Math.floor(gzipSize.sync(currentCSS) / 10) / 100
			};

			return currentStats;
		}

		public constructor(...args: any[]) {
			super(...args);

			this.subscribe(
				({type, selector, media, static: isStatic}: any) => {
					if (type === RULE_TYPE && !isStatic) {
						this.statistics.totalClasses++;
						const isPseudoSelector: boolean = selector.indexOf(":") > -1;
						if (media) {
							this.statistics.totalMediaQueryClasses++;

							if (!this.statistics.count[media]) {
								this.statistics.count[media] = {
									pseudoClasses: 0,
									classes: 0
								};
							}

							if (isPseudoSelector) {
								this.statistics.totalPseudoClasses++;
								this.statistics.count[media].pseudoClasses++;
							} else {
								this.statistics.count[media].classes++;
							}
						} else {
							this.statistics.totalClasses++;

							if (isPseudoSelector) {
								this.statistics.totalPseudoClasses++;
								this.statistics.count.pseudoClasses++;
							} else {
								this.statistics.count.classes++;
							}
						}
					}
				}
			);
		}


		public renderRule(rule: Rule, props: Object = {}): string {
			this.statistics.totalRenders++;
			const classNames: string = super.renderRule(rule, props);

			this._addClassNamesToUsage(classNames);
			return classNames;
		}
	}
}
