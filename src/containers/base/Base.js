import React, {Component, PropTypes} from "react";

export default class BaseLayout extends Component {

	render() {
		return (
			<div {...this.props}>
					{this.props.children}
			</div>
		);
	}
}
