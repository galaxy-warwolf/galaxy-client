import React, { Component } from "react";
import { Icon, Layout, Menu } from 'antd';
import './base.scss';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class BaseLayout extends Component {

	state = {
		collapsed: false,
	};
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	render() {
		return (
			<Layout>
				<Sider
					trigger={null}
					collapsible
					collapsed={this.state.collapsed}
					style={{ height: '100vh' }}
				>
					<div className="logo"/>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
						<Menu.Item key="1">
							<Icon type="user"/>
							<span className="nav-text">nav 1</span>
						</Menu.Item>
						<Menu.Item key="2">
							<Icon type="video-camera"/>
							<span className="nav-text">nav 2</span>
						</Menu.Item>
						<Menu.Item key="3">
							<Icon type="upload"/>
							<span className="nav-text">nav 3</span>
						</Menu.Item>
						<Menu.Item key="4">
							<Icon type="bar-chart"/>
							<span className="nav-text">nav 4</span>
						</Menu.Item>
						<Menu.Item key="5">
							<Icon type="cloud-o"/>
							<span className="nav-text">nav 5</span>
						</Menu.Item>
						<Menu.Item key="6">
							<Icon type="appstore-o"/>
							<span className="nav-text">nav 6</span>
						</Menu.Item>
						<Menu.Item key="7">
							<Icon type="team"/>
							<span className="nav-text">nav 7</span>
						</Menu.Item>
						<Menu.Item key="8">
							<Icon type="shop"/>
							<span className="nav-text">nav 8</span>
						</Menu.Item>
						<SubMenu
							key="sub1"
							title={<span><Icon type="user"/><span>User</span></span>}
						>
							<Menu.Item key="9">Tom</Menu.Item>
							<Menu.Item key="10">Bill</Menu.Item>
							<Menu.Item key="11">Alex</Menu.Item>
						</SubMenu>
					</Menu>
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }}>
						<Icon
							className="trigger"
							type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
							onClick={this.toggle}
						/>
					</Header>
					<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
						<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
							{this.props.children}
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						Galaxy Admin Client ©2017 Created by Galaxy
					</Footer>
				</Layout>
			</Layout>
		);
	}
}


