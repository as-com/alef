import Component from "inferno-component";
import {render} from "alef-dom";

import {DOMRenderer} from "../../../types/DOMRenderer";

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
		return this.props.children;
	}
}
