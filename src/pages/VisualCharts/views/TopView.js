import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Row, Col, Avatar, Icon } from 'antd'
import qs from 'qs'
import ModalForm from './ModalForm'
class TopView extends Component {
    componentDidMount(){
        // const query = qs.parse(this.props.location.search,{ ignoreQueryPrefix: true })
        // console.log(query)
    }
    render() {
        let query = qs.parse(this.props.location.search,{ ignoreQueryPrefix: true })
        const{
            onOpenModalForm,
            isFocusPaitents
        } = this.props
        return (
            <React.Fragment>
                <Row className="charts_top">
                    <Col className="avatar" span={3}>
                        <Avatar style={{ backgroundColor: '#52c41a', fontSize: 28 }} icon="user" />
                    </Col>
                    <Col className="charts_info_center" span={17}>
                        <div className="sick_top">
                            <span className="name">王大锤</span>
                            <img className="img" src={require('../../../images/new-icon/in-bed-black.png')} alt="在离床信息"/>
                        </div>
                        <Row className="sick_bottom">
                            <Col span={6}>
                                <div className="item">
                                    <span>姓名：</span>
                                    <span>王大锤</span>
                                </div>
                                <div className="item">
                                    <span>年龄：</span>
                                    <span>22</span>
                                </div>
                            </Col>
                            <Col span={9}>
                                <div className="item">
                                    <span>住院号：</span>
                                    <span>122121212101</span>
                                </div>
                                <div className="item">
                                    <span>病房号：</span>
                                    <span>21212122</span>
                                </div>
                            </Col>
                            <Col span={9}>
                                <div className="item">
                                    <span>住院号：</span>
                                    <span>122121212101</span>
                                </div>
                                <div className="item">
                                    <span>病房号：</span>
                                    <span>21212122</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <div className="icon_wrap">
                            <Icon onClick={isFocusPaitents.bind(this, query)} className="icon_heart" type="heart" theme="outlined" />
                            <Icon onClick={onOpenModalForm.bind(this, query)} className="icon_set" type="setting" theme="outlined" />
                        </div>
                    </Col>
                </Row>
                {
                    JSON.stringify(this.props.visualCharts.planDetails) !== '{}' && (
                        <ModalForm {...this.props} query={query} />
                    )
                }
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        visualCharts: state.visualCharts
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        isFocusPaitents(query){
            dispatch({
                type: 'is_focus_paitents_services',
                payload:{
                    id: query.id
                }
            })
        },
        onOpenModalForm(query){
            dispatch({
                type: 'open_charts_form_modal',
                payload: true
            })
            // dispatch({
            //     type: 'get_charts_form_details',
            //     payload:{
            //         id: query.planId
            //     }
            // })
        },
        onCloseModalForm(){
            dispatch({
                type: 'open_charts_form_modal',
                payload: false
            })
        },
        modifyChartsPlanByModal(val){
            dispatch({
                type: 'modify_charts_plan_services',
                payload: val
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopView)

