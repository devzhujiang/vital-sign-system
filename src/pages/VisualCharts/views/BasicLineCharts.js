import React, { Component } from 'react';
import './index.less'
import ReactEcharts from 'echarts-for-react'
export default class BasicLineCharts extends Component {
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
        return (
            <React.Fragment>
                <ReactEcharts
                    option={getOtion()}
                    className="charts-bg-style"
                />
            </React.Fragment>
        )
    }
}