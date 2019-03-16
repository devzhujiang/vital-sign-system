import React, { Component } from 'react';
import './index.less'
import ReactEcharts from 'echarts-for-react'
import { Spin } from 'antd'
import __ from 'lodash'
import moment from 'moment'
export default class BreathCharts extends Component {
    render() {
        const getOtion = () => {
            const {
                breathData,
            } = this.props.visualCharts
            __.map(breathData.datas, (item) => {
                item.time = moment(item.timestamp).format('hh:mm:ss')
            })
            return {
                title: {
                    text: this.props.title,
                    textStyle:{
                        fontWeight: 'normal',
                    }
                },
                tooltip: {
                    trigger: 'axis',
                },
                dataZoom: [
                    {
                        show: true,
                        type: 'slider',
                        start: 0,
                        end: 100
                    },
                    {
                        show: true,
                        type: 'inside',
                        start: 0,
                        end: 100
                    },
                ],
                calculable : true,
                xAxis: {
                    type: 'category',
                    data: __.map(breathData.datas, (item) => item.time),
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: __.map(breathData.datas, (item) => item.breath),
                    type: 'line'
                }]
            }
        }
        const {
            breathLoading
        } = this.props.visualCharts
        return (
            <React.Fragment>
                <Spin spinning={breathLoading}>
                    <ReactEcharts
                        option={getOtion()}
                        className="charts-bg-style"
                    />
                </Spin>
            </React.Fragment>
        )
    }
}