import { Component } from "preact";

export interface IThemeProviderProps {
	overwrite?: boolean;
	theme?: any;
}

export default class ThemeProvider extends Component<IThemeProviderProps, {}> {
	static defaultProps = { overwrite: false };

	getChildContext() {
		const { overwrite, theme } = this.props;
		const previousTheme = this.context.theme;

		return {
			theme: {
				...!overwrite ? previousTheme || {} : {},
				...theme
			}
		};
	}

	render() {
		return this.props.children[0];
	}
}
