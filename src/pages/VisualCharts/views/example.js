import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Row, Col, Card, Tabs } from 'antd'
import ReactEcharts from 'echarts-for-react'
// import TopView from './TopView'
const TabPane = Tabs.TabPane
class VisualCharts extends Component {
    render() {
        const getOtion = () => {
            return {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                }]
            }
        }
        const getOption2 = () => {
            return {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '邮件营销',
                        type: 'line',
                        stack: '总量',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '联盟广告',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '视频广告',
                        type: 'line',
                        stack: '总量',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '直接访问',
                        type: 'line',
                        stack: '总量',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '搜索引擎',
                        type: 'line',
                        stack: '总量',
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            }
        }
        const {
            onTabshange
        } = this.props
        return (
            <React.Fragment>
                {/* <TopView {...this.props} /> */}
                <Tabs className="tabs_cont" defaultActiveKey="1" onChange={onTabshange.bind(this)}>
                    <TabPane tab="24小时" key="1">
                        <Row className="charts_content">
                            <Col style={{ paddingRight: 6 }} span={12}>
                                <Card
                                    title="Card title"
                                    style={{ width: '100%' }}
                                >
                                    <ReactEcharts
                                        option={getOtion()}
                                        style={{ height: '300px', width: '100%' }}
                                        className='react_for_echarts'
                                    />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card
                                    title="Card title"
                                    style={{ width: '100%' }}
                                >
                                    <ReactEcharts
                                        option={getOption2()}
                                        style={{ height: '300px', width: '100%' }}
                                        className='react_for_echarts'
                                    />
                                </Card>
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

