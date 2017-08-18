import React, { Component } from "react";
import { DatePicker } from 'antd';

export default class BaseLayout extends Component {

	render() {
		return (
			<div>
				<DatePicker/>
				{this.props.children}
			</div>
		);
	}
}
