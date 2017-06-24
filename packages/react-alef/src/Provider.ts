import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { render } from 'alef-dom'

export default class Provider extends Component {
  static childContextTypes = { renderer: PropTypes.object }
  static propTypes = {
    renderer: PropTypes.object.isRequired
  }

  getChildContext() {
    return { renderer: this.props.renderer }
  }

  componentDidMount() {
    if (!this.props.renderer.isNativeRenderer) {
      render(this.props.renderer, this.props.mountNode)
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}
