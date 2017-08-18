import React, { Component } from "react";
import { DatePicker } from 'antd';

export default class BaseLayout extends Component {

	render() {
		return (
			<div>
				{/* Todo Header */}
				{/* Todo Sider Bar */}
				{/* Todo Body*/}
				<DatePicker/>
				{this.props.children}
				{/* Todo Footer*/}
			</div>
		);
	}
}
