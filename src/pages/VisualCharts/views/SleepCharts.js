import React, { Component } from 'react';
import './index.less'
import ReactEcharts from 'echarts-for-react'
import Echarts from 'echarts'
import { Spin } from 'antd'
import moment from 'moment'
var sleepData = 
    [
        {
            "start": 1555235488,
            "end": 1555237628,
            "status": 3
        },
        {
            "start": 1555237628,
            "end": 1555239868,
            "status": 2
        },
        {
            "start": 1555239868,
            "end": 1555240328,
            "status": 3
        },
        {
            "start": 1555240328,
            "end": 1555240508,
            "status": 4
        },
        {
            "start": 1555241288,
            "end": 1555248548,
            "status": 4
        },
        {
            "start": 1555248808,
            "end": 1555251868,
            "status": 2
        },
        {
            "start": 1555251868,
            "end": 1555252248,
            "status": 3
        },
        {
            "start": 1555252248,
            "end": 1555259268,
            "status": 2
        },
        {
            "start": 1555259268,
            "end": 1555259828,
            "status": 3
        },
        {
            "start": 1555259828,
            "end": 1555260788,
            "status": 2
        },
        {
            "start": 1555260788,
            "end": 1555261908,
            "status": 3
        },
        {
            "start": 1555261908,
            "end": 1555263928,
            "status": 2
        },
        {
            "start": 1555263928,
            "end": 1555264488,
            "status": 1
        },
        {
            "start": 1555264488,
            "end": 1555266668,
            "status": 2
        },
        {
            "start": 1555266668,
            "end": 1555267168,
            "status": 1
        },
        {
            "start": 1555267168,
            "end": 1555271068,
            "status": 2
        },
        {
            "start": 1555271068,
            "end": 1555272088,
            "status": 3
        },
        {
            "start": 1555272088,
            "end": 1555275108,
            "status": 2
        },
        {
            "start": 1555275108,
            "end": 1555275568,
            "status": 3
        },
        {
            "start": 1555275568,
            "end": 1555276288,
            "status": 2
        },
        {
            "start": 1555276288,
            "end": 1555277428,
            "status": 3
        },
        {
            "start": 1555277428,
            "end": 1555280368,
            "status": 2
        },
        {
            "start": 1555280368,
            "end": 1555280828,
            "status": 3
        },
        {
            "start": 1555280828,
            "end": 1555281328,
            "status": 2
        },
        {
            "start": 1555281328,
            "end": 1555281828,
            "status": 3
        },
        {
            "start": 1555281828,
            "end": 1555282468,
            "status": 2
        },
        {
            "start": 1555282468,
            "end": 1555283168,
            "status": 3
        },
        {
            "start": 1555283168,
            "end": 1555286208,
            "status": 2
        },
        {
            "start": 1555286208,
            "end": 1555286328,
            "status": 4
        }
    ]

var _arr = []
sleepData.forEach((item) =>{
    _arr.push([
        // moment.unix(item.start).format('hh:mm'),
        // moment.unix(item.end).format('hh:mm'),
        `${item.start}`,
        `${item.end}`,
        item.status,
        item.status === 1 ? '深睡' : item.status === 2 ? '浅睡' : item.status === 3 ? '醒着' : '其他',
    ])
})
var data = _arr
data = Echarts.util.map(data, function (item) {
    return {
        value: item,
        itemStyle: {
            normal: {
                color: item[2] === 1 ? '#29D999' : item[2] === 2 ? '#F8BF39' : item[2] === 3 ? '#A170FC' : '#4395FF'
            }
        }
    };
});
function renderItem(params, api) {
    var yValue = api.value(2);
    var start = api.coord([api.value(0), yValue]);
    var size = api.size([api.value(1) - api.value(0), yValue]);
    var style = api.style();
    return {
        type: 'rect',
        shape: {
            x: start[0],
            y: start[1],
            width: size[0],
            height: size[1]
        },
        style: style
    };
}
export default class SleepCharts extends Component {
    render() {
        const getOtion = () => {
            return {
                title: {
                    text: '睡眠监测',
                    left: 'left',
                    textStyle:{
                        fontWeight: 'normal',
                    }
                },
                tooltip: {
                    formatter: function (params) {
                        var res='<div>'+
                                    '<p>睡眠质量：'+params.name+'</p>' +
                                    '<p>起始时间：'+moment.unix(params.value[0]).format('MM-DD hh:mm:ss')+'</p>' +
                                    '<p>结束时间：'+moment.unix(params.value[1]).format('MM-DD hh:mm:ss')+'</p>' +
                                '</div>' 
                        return res;
                    }
                },
                xAxis: {
                    type: 'value',
                    scale: true,
                    axisLabel:{
                        formatter:function (value)
                        {
                            return Echarts.format.formatTime('dd hh:mm', new Date(value));
                        }
                    }
                },
                yAxis: {
                },
                series: [{
                    type: 'custom',
                    name: '睡眠质量监测',
                    renderItem: renderItem,
                    label: {
                        normal: {
                            show: false,
                            position: 'top'
                        }
                    },
                    dimensions: ['from', 'to'],
                    encode: {
                        x: [0, 1],
                        y: 2,
                        tooltip: [0, 1],
                        itemName: 3
                    },
                    data: data
                }]
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