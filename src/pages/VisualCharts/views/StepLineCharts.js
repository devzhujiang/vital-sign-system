import React, { Component } from 'react';
import './index.less'
import ReactEcharts from 'echarts-for-react'
import { Spin } from 'antd'
export default class StepLineCharts extends Component {
    render() {
        const getOtion = () => {
            return {
                title: {
                    text: this.props.title,
                    textStyle:{
                        fontWeight: 'normal',
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'在床',
                        type:'line',
                        step: 'start',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'离床',
                        type:'line',
                        step: 'middle',
                        data:[220, 282, 201, 234, 290, 430, 410]
                    }
                ]
            }
        }
        const {
            leaveBedLoading
        } = this.props.visualCharts
        return (
            <React.Fragment>
                <Spin spinning={leaveBedLoading}>
                    <ReactEcharts
                        option={getOtion()}
                        className="charts-bg-style"
                    />
                </Spin>
            </React.Fragment>
        )
    }
}