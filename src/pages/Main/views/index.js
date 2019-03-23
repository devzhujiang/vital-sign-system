import React, { Component } from 'react'
import { Layout, Menu, Icon, notification, Input, Row, Col, Avatar } from 'antd'
import './index.less'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { navList as navOrigin } from '../const/index'
import _ from 'lodash'
import { hashPathname } from '../../../utils/index'
import createHistory from 'history/createHashHistory'
const history = createHistory()
const { Header, Content, Sider } = Layout
const SubMenu = Menu.SubMenu
const Item = Menu.Item
const Search = Input.Search

class Main extends Component {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    }
    componentDidMount(){
        if(!sessionStorage.getItem('token')){
            notification.error({
                message: '登录超时，请重新登录'
            })
            setTimeout(() =>{
                history.push('/login')
                window.location.reload()
            }, 300)
        }else{
            this.props.onSelectKeyChanges()
        }
        this.props.getDepartment()
        setTimeout(() =>{
            this.props.getDepartmentExceptInfo()
        }, 1000)
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.location.pathname !== nextProps.location.pathname){
            this.props.onSelectKeyChanges()
        }
    }
    
    render() {
        const IconFont = Icon.createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_922218_vzta6fssfh.js',
        })
        return (
            <div>
                {
                    this.props.location.pathname === '/login' ? '' :
                    <Layout id="self_theme">
                        <Sider 
                            style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, zIndex: 999 }}
                            trigger={null}
                            collapsible
                            collapsed={this.state.collapsed}
                        >
                            <div className="logo">
                                <span>
                                    <img alt="生命体征监测系统" src={require('../../../images/logo.png')} />   
                                </span>
                            </div>
                            <Menu 
                                theme="dark"
                                mode="inline" 
                                selectedKeys={[this.props.main.selectedKey]}
                                openKeys={['1', '2']}
                            >
                                {
                                    this.props.main.navList.map((item) => {
                                        if (!item.subs) {
                                            return (
                                                <Menu.Item key={item.key}>
                                                    <Link to={{
                                                        pathname: item.url
                                                    }}>{item.icon && <IconFont type={item.icon} style={{ fontSize: 20}} />}<span>{item.title}</span> <Icon className="selectIcon" type={item.selectIcon} theme="outlined" /></Link>
                                                </Menu.Item>
                                            )
                                        } else {
                                            return (
                                                <SubMenu
                                                    key={item.key}
                                                    title={<span><Icon type={item.icon} />{item.title}</span>}
                                                >
                                                    {item.subs && item.subs.map((option, index) => (
                                                        <Menu.Item key={option.key}>
                                                            {
                                                                <Link to={{
                                                                    pathname: option.url
                                                                }}>
                                                                    {option.icon && <Icon type={option.icon} />}
                                                                    <span>{option.title}</span>
                                                                    <span style={{ float: 'right', display: 'inline-block' }}></span>
                                                                </Link>
                                                            }

                                                        </Menu.Item>
                                                    ))}
                                                </SubMenu>
                                            )
                                        }
                                    })
                                }
                            </Menu>
                        </Sider>
                        <Layout className="margin_left200">
                            <Header 
                                id="components-layout-demo-custom-trigger" 
                            >
                                <Row>
                                    <Col span={12}>
                                        <Icon
                                            className="trigger"
                                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                            onClick={this.toggle}
                                            style={{ float: 'left', marginTop: 6}}
                                        />
                                        <Avatar src={sessionStorage.getItem('hospitalLogo')} />
                                        <span style={{ color: '#fff', marginLeft: 6}}>{sessionStorage.getItem('hospitalName')}</span>
                                    </Col>
                                    <Col span={8}>
                                        <Search 
                                            placeholder='请输入病人住院号/床号进行搜索' 
                                            style={{ float: "left", width: '100%', marginTop: 16 }} 
                                            onSearch={this.props.mainSearchPaitens.bind(this)}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <Menu
                                            mode='horizontal'
                                            className="rightMenu" >
                                            <SubMenu title={<span><Icon type='user' /><span>{this.props.main.departmentInfo.departmentName}</span></span>} >
                                                <Item>
                                                    <div onClick={() => {
                                                        this.props.loginOut()
                                                    }}>
                                                        <Icon type='poweroff' />
                                                        <span>退出</span>
                                                    </div>
                                                </Item>
                                            </SubMenu>
                                        </Menu>
                                    </Col>
                                </Row>
                            </Header>
                            <Content style={{ margin: '24px 16px 0', overflow: 'initial', paddingBottom: 50, paddingTop: 60 }}>
                                {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        main: state.main,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        mainSearchPaitens(value){
            dispatch({
                type: 'main_search_paitents',
                payload: {
                    value,
                    location: this.props.location
                }
            })
        },
        loginOut(){
            console.log('aaaaa')
            dispatch({
                type: 'login_out_services'
            })
        },
        getDepartment(){
            dispatch({
                type: 'get_department_services'
            })
        },
        getDepartmentExceptInfo(){
            dispatch({
                type: 'get_dept_except_info_serveces',
                payload: {
                    reOpenMqtt: true
                }
            })
        },
        onSelectKeyChanges(){
            _.forEach(navOrigin, ({ url, subs, key }) => {
                if (subs) {
                    _.forEach(subs, item => {
                        if (item.url === hashPathname(window.location.hash)){
                            dispatch({
                                type: 'set_nav_select_ley',
                                payload: {
                                    selectedKey: item.key
                                }
                            })
                        }
                    })
                }
                if (url === hashPathname(window.location.hash)){
                    dispatch({
                        type: 'set_nav_select_ley',
                        payload: {
                            selectedKey: key
                        }
                    })
                }
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Main)
