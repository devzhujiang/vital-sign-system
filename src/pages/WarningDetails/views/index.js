import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Row, Col, Button } from 'antd'
import './index.less'
import FormList from './FormList';
import qs from 'qs'
class WarningDetails extends Component {
    componentDidMount(){
        let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id
        this.props.getWarningDetailsServices(id)
    }
    render() {
        const {
            planDetails
        } = this.props.warningDetails
        return (
            <React.Fragment>
                <Row className="container_wrap">
                    <Col span={18}>
                        <p className="column-title">预警方案修改</p>
                    </Col>
                    <Col span={6}>
                        {
                            this.props.warningDetails.options.isShowFormSearch ? (<Button onClick={() =>{this.props.setShowHideFormList({flag: false})}} className="ml10" type="danger">取消修改</Button>):
                            (<Button onClick={() =>{ this.props.setShowHideFormList({flag: true})}} type="primary">修改</Button>)
                        }
                    </Col>
                </Row>
                {
                    this.props.warningDetails.options.isShowFormSearch ? (<FormList { ...this.props } />) : 
                    <Row className="form_list_wrap">
                        {
                            JSON.stringify(planDetails) === '{}' ? 
                            '' : (<ul>
                                    <li>
                                        <span className="item_name">方案名称</span>
                                        <span className="item_cont">{planDetails.plan.name}</span>
                                    </li>
                                    <li>
                                        <span className="item_name">离床时间</span>
                                        <span className="item_cont">{planDetails.items[0].val}</span>
                                    </li>
                                    <li>
                                        <span className="item_name">呼吸</span>
                                        <span className="item_cont">{planDetails.items[1].val}</span>
                                    </li>
                                    <li>
                                        <span className="item_name">呼吸暂停</span>
                                        <span className="item_cont">{planDetails.items[2].val}</span>
                                    </li>
                                    <li>
                                        <span className="item_name">心率</span>
                                        <span className="item_cont">{planDetails.items[3].val}</span>
                                    </li>
                                    <li>
                                        <span className="item_name">心率暂停</span>
                                        <span className="item_cont">{planDetails.items[4].val}</span>
                                    </li>
                                    <li>
                                        <span className="item_name">体动</span>
                                        <span className="item_cont">{planDetails.items[5].val}</span>
                                    </li>
                                    <li>
                                        <span className="item_name">睡眠时长</span>
                                        <span className="item_cont">{planDetails.items[6].val}</span>
                                    </li>
                                    <li>
                                        <span className="item_name">巡检</span>
                                        <span className="item_cont">{planDetails.items[7].val}</span>
                                    </li>
                                </ul>)
                        }
                    </Row>
                }
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        warningDetails: state.warningDetails
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        getWarningDetailsServices(id){
            dispatch({
                type: 'get_warning_details_services',
                payload:{
                    itemId: id
                }
            })
        },
        setShowHideFormList(flag){
            dispatch({
                type: 'set_show_hide_form_details',
                payload: flag
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WarningDetails)

