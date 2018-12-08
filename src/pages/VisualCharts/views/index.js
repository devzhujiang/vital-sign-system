import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Row, Col, Tabs } from 'antd'
import TopView from './TopView'
import BasicLineCharts from "./BasicLineCharts"
import StepLineCharts from './StepLineCharts'
import ScatterSimpleCharts from './ScatterSimpleCharts'
const TabPane = Tabs.TabPane
class VisualCharts extends Component {
    render() {
        const {
            onTabshange
        } = this.props
        return (
            <React.Fragment>
                <TopView {...this.props} />
                <Tabs className="tabs_cont" defaultActiveKey="1" onChange={onTabshange.bind(this)}>
                    <TabPane tab="24小时" key="1">
                        <Row className="charts_content">
                            <Col style={{ paddingRight: 6 }} span={12}>
                                <BasicLineCharts { ...this.props } title={'呼吸'} />
                            </Col>
                            <Col span={12}>
                                <BasicLineCharts { ...this.props } title={'心率'} />
                            </Col>
                        </Row>
                        <Row className="charts_content">
                            <Col style={{ paddingRight: 6 }} span={12}>
                                <StepLineCharts { ...this.props } title={'在离床'} />
                            </Col>
                            <Col span={12}>
                                <BasicLineCharts { ...this.props } title={'体动'} />
                            </Col>
                        </Row>
                        <Row className="charts_content">
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
                        </Row>
                    </TabPane>
                    <TabPane tab="最近三天" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="按日期" key="3">Content of Tab Pane 3</TabPane>
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VisualCharts)

