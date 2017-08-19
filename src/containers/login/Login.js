import React, { PureComponent } from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.css';

const FormItem = Form.Item;

class LoginForm extends PureComponent {

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="login-container">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<h2 className="login-header">Galaxy Admin System</h2>
					<FormItem>
						{getFieldDecorator('userName', {
							rules: [{ required: true, message: 'Please input your username!' }],
						})(
							<Input prefix={<Icon type="user" style={{ fontSize: 13 }}/>} placeholder="Username"/>
						)}
					</FormItem>
					<FormItem>
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
