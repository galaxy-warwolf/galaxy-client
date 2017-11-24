import React, { Component } from "react";
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Icon, Layout, Menu } from 'antd';
import _ from "lodash";
import styles from './base.less';
import { logout } from "../../redux/actions/AuthActions";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

@connect(
	(state) => ({
		routing: state.routing
	}),
	{ push, logout }
)
export default class BaseLayout extends Component {

	state = {
		collapsed: false,
		selectedKeys: [],
		openKeys: []
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	componentWillReceiveProps(nextProps) {
		const { pathname } = this.props.routing.location;
		const nextLocation = nextProps.routing.location;
		if (nextLocation && pathname !== nextLocation.pathname) {
			this.openRelatedMenuByPathName(nextLocation.pathname)
		}
	}

	componentDidMount() {
		const { pathname } = this.props.routing.location;
		this.openRelatedMenuByPathName(pathname)
	}

	openRelatedMenuByPathName(_pathname) {
		if (!_pathname) {
			console.warn("无效的pathname, 不做处理", _pathname);
			return
		}
		const keyPath = _pathname.split("/");
		_.remove(keyPath, (value) => (!value));
		let selectKey;
		let openKey;
		if (keyPath.length === 0) {
			selectKey = '/dashboard'
		} else if (keyPath.length === 1) {
			selectKey = `/${keyPath[0]}`
		} else if (keyPath.length === 2) {
			openKey = `/${keyPath[0]}`
			selectKey = `/${keyPath[1]}`
		} else {
			console.warn("暂不支持三层结构.")
		}
		const state = { selectedKeys: [selectKey] }
		if (openKey) state['openKeys'] = [openKey]
		this.setState(state)
	}

	linkTo = (item) => {
		const { pathname } = this.props.routing.location
		const { keyPath } = item
		const path = _.join(_.reverse(keyPath), "")
		if (pathname !== path) {
			this.props.push(path)
		}
	}

	openSubMenu = (item) => {
		const { openKeys } = this.state;
		const { key } = item;
		if (openKeys.indexOf(key) > -1) {
			_.remove(openKeys, (value) => value === key)
		} else {
			openKeys.push(key)
		}
		this.setState({ openKeys })
	}

	handleClickMenu = (e) => {
		e.key === 'logout' && this.props.logout();
	};

	render() {
		const { selectedKeys, collapsed, openKeys } = this.state
		return (
			<Layout>
				<Sider
					trigger={null}
					collapsible
					collapsed={collapsed}
					style={{ height: '100vh' }}
				>
					<div className={styles.logo}/>
					<Menu theme="dark" mode="inline"
						  defaultSelectedKeys={['/dashboard']}
						  selectedKeys={selectedKeys}
						  openKeys={openKeys}
						  onClick={this.linkTo}>
						<Menu.Item key="/dashboard">
							<Icon type="appstore-o"/>
							<span className="nav-text">首页</span>
						</Menu.Item>

						<Menu.Item key="/chart">
							<Icon type="bar-chart"/>
							<span className="nav-text">图表</span>
						</Menu.Item>
						<SubMenu
							key="/more"
							title={<span><Icon type="user"/><span>More</span></span>}
							onTitleClick={this.openSubMenu}
						>
							<Menu.Item key="/9">Tom</Menu.Item>
							<Menu.Item key="/10">Bill</Menu.Item>
							<Menu.Item key="/11">Alex</Menu.Item>
						</SubMenu>
					</Menu>
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }}>
						<Icon
							className={styles.trigger}
							type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
							onClick={this.toggle}
						/>
						<div className={styles.header_func}>
							<Menu mode="horizontal" onClick={this.handleClickMenu}>
								<SubMenu
									className={styles.header_menu}
									title={<span><Icon type="user"/>{name}</span>}>
									<Menu.Item key="logout">
										登出
									</Menu.Item>
								</SubMenu>
							</Menu>
						</div>
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


