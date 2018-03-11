import React, { PureComponent } from "react";
import { connect } from 'react-redux';

@connect(
	(state) => ({
		authData: state.auth
	}),
	{}
)
export default class Home extends PureComponent {

	render() {
		return (
			<div>
				{JSON.stringify(this.props.authData)}
			</div>

		);
	}
}
