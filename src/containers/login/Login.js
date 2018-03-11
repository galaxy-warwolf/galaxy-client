import React, { PureComponent } from "react";
import { Button, Checkbox, Form, Icon, Input, } from 'antd';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import UtilsMixin from '../../mixins/UtilsMixin';
import { decorate } from 'react-mixin';
import './login.less'
import {auth} from '../../redux/actions/AuthActions';
const FormItem = Form.Item;

@connect(
	(state) => ({}),
	{ push, auth }
)
@decorate(UtilsMixin)
class LoginForm extends PureComponent {

	handleSubmit = async (e) => {
		e.preventDefault();
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				await this.props.auth(values);
				this.props.push("/");
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="login-container">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<h2 className="login-header">Galaxy Admin System</h2>
					<FormItem hasFeedback>
						{getFieldDecorator('username', {
							rules: [{ required: true, message: 'Please input your username!' }],
						})(
							<Input prefix={<Icon type="user" style={{ fontSize: 13 }}/>} placeholder="Username"/>
						)}
					</FormItem>
					<FormItem hasFeedback>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please input your Password!' }],
						})(
							<Input prefix={<Icon type="lock" style={{ fontSize: 13 }}/>} type="password"
								   placeholder="Password"/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
							<Checkbox>Remember me</Checkbox>
						)}
						<a className="login-form-forgot" href="">Forgot password</a>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Log in
						</Button>
					</FormItem>
				</Form>
			</div>
		);
	}
}

const WrappedNormalLoginForm = Form.create()(LoginForm);

export default WrappedNormalLoginForm;
