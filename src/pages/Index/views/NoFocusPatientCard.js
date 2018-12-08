import React, { Component } from 'react'
import { Card, Avatar, Icon } from 'antd'
import './index.less'
import ModalForm from './ModalForm.js'
import { Link } from 'react-router-dom'
export default class NoFocusPatientCard extends Component {
    render() {
        const{
            main:{
                noFocusPaitents,
            },
            focusPaitentServices,
            openPaitentWarningPlan
        } = this.props
        return (
            <React.Fragment>
                {
                    noFocusPaitents.length === 0 ? (
                        <div style={{ padding: '20px 0', textAlign: 'center', fontSize: 14, width: '100%' }}>暂无床位和病人信息</div>
                    ) : (
                        <div>
                            {
                                noFocusPaitents.map((item) =>{
                                    return(
                                        <React.Fragment key={item.id}>
                                            <Card
                                                className="patient-card"
                                            >
                                                <Link  to={`/visualCharts?id=${item.id}&planId=${item.planId}`}>
                                                    <div className="cardTopSpe">
                                                        <div className="personInfo">
                                                            <div className="patientBeds">{item.sickbed.sn}</div>
                                                            <div>
                                                                <span className="patientName">{item.patient.name.replace(/^(.).*(.)$/,"$1***$2")}</span>
                                                                <span className="patienTAge">{item.patient.age}岁</span>
                                                            </div>
                                                        </div>
                                                        <div className="personBeds">
                                                            <Avatar src={require('../../../images/icon-is-bed.png')} />
                                                        </div>
                                                    </div>
                                                    <div className="cardCont">
                                                        <div className="cardContDetails">
                                                            <span className="count">{ item.device ? (item.device.heartbeat ? item.device.heartbeat : '无')  : '无'}</span>
                                                            <span className="name">心率</span>
                                                        </div>
                                                        <div className="cardContDetails">
                                                            <span className="count">{ item.device ? (item.device.breath ? item.device.breath : '无')  : '无'}</span>
                                                            <span className="name">呼吸</span>
                                                        </div>
                                                        <div className="cardContDetails">
                                                            <span className="count">{ item.device ? (item.device.body_movement ? item.device.body_movement : '无')  : '无'}</span>
                                                            <span className="name">体动</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="cardBottom">
                                                    <Icon onClick={focusPaitentServices.bind(this, item.id)} style={{ marginRight: 6}} className="icon-set"  type="heart" theme="outlined" /> 
                                                    <Icon onClick={openPaitentWarningPlan.bind(this, item.id, item.planId)} className="icon-set" type="setting" theme="outlined" /> 
                                                </div>
                                            </Card>
                                            {
                                                JSON.stringify(this.props.homePage.planDetails) === '{}' ? '' : (
                                                    <ModalForm {...this.props} itemId = {item.id} planId={item.planId} />
                                                )
                                            }
                                        </React.Fragment>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </React.Fragment>
        )
    }
}