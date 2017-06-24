import { Component } from "preact";
import { render } from "alef-dom";

import { DOMRenderer } from "../../../src/types/DOMRenderer";

export interface IProviderProps {
	renderer: DOMRenderer;
}

export default class Provider extends Component<IProviderProps, {}> {
	getChildContext() {
		return { renderer: this.props.renderer };
	}

	componentDidMount() {
		render(this.props.renderer);
	}

	render() {
		return this.props.children[0];
	}
}
