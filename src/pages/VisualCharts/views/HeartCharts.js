import React, { Component } from 'react';
import './index.less'
import ReactEcharts from 'echarts-for-react'
import __ from 'lodash'
import moment from 'moment'
import { Spin } from 'antd'
export default class HeartCharts extends Component {
    render() {
        const getOtion = () => {
            const {
                heartData
            } = this.props.visualCharts
            __.map(heartData.datas, (item) => {
                item.time = moment(item.timeStamp).format('hh:mm:ss')
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
                    data: __.map(heartData.datas, (item) => item.timestamp),
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: __.map(heartData.datas, (item) => item.heart),
                    type: 'line'
                }]
            }
        }
        const {
            heartLoading
        } = this.props.visualCharts
        return (
            <React.Fragment>
                <Spin spinning={heartLoading}>
                    <ReactEcharts
                        option={getOtion()}
                        className="charts-bg-style"
                    />
                </Spin>
            </React.Fragment>
        )
    }
}