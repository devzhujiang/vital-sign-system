import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import TopLeftBanner from './TopLeftBanner'
import TopRightBanner from './TopRightBanner'
import NoFocusPatientCard from './NoFocusPatientCard'
import FocusPatientCard from './FocusPatientCard'
import Message from './Message'
class Index extends Component {
    componentDidMount(){
        setTimeout(() =>{
            this.props.getIndexTjInfo()
        }, 500)
    }
    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col span={18}>
                        <TopLeftBanner {...this.props} />
                    </Col>
                    <Col span={6}>
                        <TopRightBanner {...this.props} />
                    </Col>
                </Row>
                <Row style={{ marginTop: 20}}>
                    <Col span={18}>
                        <Row>
                            <p className="column-title">特别关注的病人</p>
                            <div className="bedIndex">
                                <FocusPatientCard { ...this.props } />
                            </div>
                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <p className="column-title">床位和病人</p>
                            <div className="bedIndex">
                                <NoFocusPatientCard { ...this.props } />
                            </div>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <p className="column-title">消息</p>
                        <Message {...this.props} />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        homePage: state.homePage,
        main: state.main
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        changeRadioInput(value){
            dispatch({
                type: 'save_modal_warning_details',
                payload:{
                    data: value
                }
            })
        },
        getIndexTjInfo(){
            dispatch({
                type: 'get_index_tongji_info'
            })
        },
        focusPaitentServices(id){
            dispatch({
                type: 'focus_paitents_services',
                payload:{
                    id
                }
            })
        },
        openPaitentWarningPlan(id, planId){
            dispatch({
                type: 'open_warning_plan_modal',
                payload:{
                    id
                }
            })
            dispatch({
                type: 'get_warning_plan_details_by_id',
                payload:{
                    planId
                }
            })
        },
        closePaitentWarningPlan(id){
            dispatch({
                type: 'close_warning_plan_modal',
                payload:{
                    id
                }
            })
        },
        modifyPlanByModal(val){
            dispatch({
                type: 'modify_plan_by_modal_services',
                payload: val
            })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)

