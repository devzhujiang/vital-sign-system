import React, { Component } from 'react'
import { Badge } from 'antd'
import './index.less'
import moment from 'moment'
export default class Message extends Component {
    render() {
        const {
            main:{
                warningMqttMsg
            }
        } = this.props
        return (
            <React.Fragment>
                <ul className="messageList">
                {
                    warningMqttMsg.length === 0 ? '暂无预警数据' :
                    warningMqttMsg.slice(0, 10).map((item) =>{
                        return(
                            <li key={Math.random()}>
                                <div>
                                    <span className="bedName">{item.roomsn}—{item.bedsn}</span>
                                    <span className="time">{moment(item.time).format('HH:mm')}</span>
                                </div>
                                <div>
                                    <span>{item.name}</span>
                                    <span className="errorDetails"><Badge status={item.focus === 0 ? "warning" : "error"} />{item.content}</span>
                                </div>
                            </li>
                        )
                    })
                }
                </ul>
            </React.Fragment>
        )
    }
}