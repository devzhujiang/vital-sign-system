import React, { Component } from 'react';
import './index.less'
import ReactEcharts from 'echarts-for-react'
export default class ScatterSimpleCharts extends Component {
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
                xAxis: {},
                yAxis: {},
                series: [{
                    symbolSize: 20,
                    data: [
                        [10.0, 8.04],
                        [8.0, 6.95],
                        [13.0, 7.58],
                        [9.0, 8.81],
                        [11.0, 8.33],
                        [14.0, 9.96],
                        [6.0, 7.24],
                        [4.0, 4.26],
                        [12.0, 10.84],
                        [7.0, 4.82],
                        [5.0, 5.68]
                    ],
                    type: 'scatter'
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