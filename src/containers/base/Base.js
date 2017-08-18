import React, { Component, PropTypes } from "react";
import { DatePicker } from 'antd';

export default class BaseLayout extends Component {

	render() {
		return (
			<div {...this.props}>
				<DatePicker/>
				{this.props.children}
			</div>
		);
	}
}
