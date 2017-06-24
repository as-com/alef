import { Component, Children } from "react";
import PropTypes from "prop-types";
import { render } from "alef-dom";

import { DOMRenderer } from "../../../src/types/DOMRenderer";

export interface IProviderProps {
	renderer: DOMRenderer;
}

export default class Provider extends Component<IProviderProps, {}> {
	static childContextTypes = { renderer: PropTypes.object };
	static propTypes = {
		renderer: PropTypes.object.isRequired
	};

	getChildContext() {
		return { renderer: this.props.renderer };
	}

	componentDidMount() {
		render(this.props.renderer);
	}

	render(): any { // TODO
		return Children.only(this.props.children);
	}
}
