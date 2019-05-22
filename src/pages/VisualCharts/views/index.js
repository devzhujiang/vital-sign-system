import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Row, Col, Tabs } from 'antd'
import TopView from './TopView'
import BreathCharts from "./BreathCharts"
import HeartCharts from "./HeartCharts"
import BodyMoveCharts from "./BodyMoveCharts"
import StepLineCharts from './StepLineCharts'
import SleepCharts from './SleepCharts'
// import ScatterSimpleCharts from './ScatterSimpleCharts'
import qs from 'qs'
const TabPane = Tabs.TabPane
class VisualCharts extends Component {
    componentDidMount(){
        let query = qs.parse(this.props.location.search,{ ignoreQueryPrefix: true })
        this.props.getBreathData(query)
    }
    render() {
        const {
            onTabshange,
        } = this.props
        return (
            <React.Fragment>
                <TopView {...this.props} />
                <Tabs className="tabs_cont" defaultActiveKey="1" onChange={onTabshange.bind(this)}>
                    <TabPane tab="24小时" key="1">
                        <Row className="charts_content">
                            <Col style={{ paddingRight: 6 }} span={12}>
                                <BreathCharts { ...this.props } title={'呼吸'} />
                            </Col>
                            <Col span={12}>
                                <HeartCharts { ...this.props } title={'心率'} />
                            </Col>
                        </Row>
                        <Row className="charts_content">
                            <Col style={{ paddingRight: 6 }} span={12}>
                                <SleepCharts { ...this.props } title={'睡眠监测'} />
                            </Col>
                            <Col span={12}>
                                <BodyMoveCharts { ...this.props } title={'体动'} />
                            </Col>
                        </Row>
                        <Row className="charts_content">
                            <Col style={{ paddingRight: 6 }} span={12}>
                                <StepLineCharts { ...this.props } title={'在离床'} />
                            </Col>
                        </Row>
                        {/* <Row className="charts_content">
                            <Col style={{ paddingRight: 6 }} span={12}>
                                <StepLineCharts { ...this.props } title={'睡眠'} />
                            </Col>
                            <Col span={12}>
                                <ScatterSimpleCharts { ...this.props } title={'护理巡查'} />
                            </Col>
                        </Row>
                        <Row className="charts_content">
                            <Col style={{ paddingRight: 6 }} span={12}>
                                <ScatterSimpleCharts { ...this.props } title={'预警详情'} />
                            </Col>
                        </Row> */}
                    </TabPane>
                    {/* <TabPane tab="最近三天" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="按日期" key="3">Content of Tab Pane 3</TabPane> */}
                </Tabs>

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
        onTabshange(key) {
            console.log(key)
        },
        getBreathData(query){
            dispatch({
                type: 'get_charts_form_details',
                payload:{
                    id: query.planId
                }
            })
            dispatch({
                type: 'breath_data_services',
                payload:{
                    query
                }
            })
            dispatch({
                type: 'heart_data_services',
                payload:{
                    query
                }
            })
            dispatch({
                type: 'leave_bed_data_services',
                payload:{
                    query
                }
            })
            dispatch({
                type: 'body_move_data_services',
                payload:{
                    query
                }
            })
            // dispatch({
            //     type: 'inspect_data_services',
            //     payload:{
            //         query
            //     }
            // })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VisualCharts)

