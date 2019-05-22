import React, { Component } from 'react';
import './index.less'
import ReactEcharts from 'echarts-for-react'
import { Spin } from 'antd'
// import _ from 'lodash'

// var bedData = 
//     [
//         {
//             "start": 1555237628,
//             "end": 1555239868,
//             "status": 1
//         },
//         {
//             "start": 1555241288,
//             "end": 1555248548,
//             "status": 1
//         },
//         {
//             "start": 1555252248,
//             "end": 1555259268,
//             "status": 1
//         },
//         {
//             "start": 1555261908,
//             "end": 1555263928,
//             "status": 1
//         },
//         {
//             "start": 1555263928,
//             "end": 1555264488,
//             "status": 1
//         },
//     ]


// var data = [{
//         "start": 1,
//         "end": 3,
//         "status": 1
//     },{
//         "start": 5,
//         "end": 7,
//         "status": 1
//     },{
//         "start": 9,
//         "end": 15,
//         "status": 1
//     }]
export default class SleepCharts extends Component {
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
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['1', '2', '3', '4', '5', '6', '7']
                },
                yAxis: {
                    type: 'category'
                },
                series: [
                    {
                        name:'在离床',
                        type:'line',
                        step: 'middle',
                        data:['在床', '离床', '在床', '离床', '在床', '离床','在床']
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