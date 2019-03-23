import React, { Component } from 'react';
import { Row, Spin, Button } from 'antd'
import './index.less'
class WarningDetail extends Component {
    render() {
        const {
            warningDetails,
            spinning
        } = this.props.warningSet
        console.log(warningDetails)
        return (
            <React.Fragment>
                <Spin spinning={spinning}>
                    <Row className="form_list_wrap">
                        {
                            JSON.stringify(warningDetails) === '{}' ? '' :
                                <div>
                                    <ul>
                                        <li>
                                            <span className="item_name">方案名称</span>
                                            <div className="item_cont">{warningDetails.plan.name}</div>
                                        </li>
                                        <li>
                                            <span className="item_name">呼吸暂停</span>
                                            <div className="item_cont">
                                                <p>{warningDetails.items[2].val}次/分钟</p>
                                                <p className="messType">呼吸暂停超出该区间时，立即报警</p>
                                            </div>
                                        </li>
                                        <li>
                                            <span className="item_name">心率暂停</span>
                                            <div className="item_cont">
                                                <p>{warningDetails.items[4].val}次/分钟</p>
                                                <p className="messType">心率暂停超出该区间时，立即报警</p>
                                            </div>
                                        </li>
                                        <div style={{ border: '1px dashed #D6D8DD', width: '100%', height: '1px', marginBottom: '10px'}}></div>
                                        <li>
                                            <span className="item_name">离床时间</span>
                                            <div className="item_cont">
                                                <p>{warningDetails.items[0].val} 分钟</p>
                                                <p className="messType">离床时间超出时长时，立即报警</p>
                                            </div>
                                        </li>
                                        <li>
                                            <span className="item_name">呼吸</span>
                                            <div className="item_cont">
                                                <p>{warningDetails.items[1].val}次/分钟 - {warningDetails.items[1].valEnd}次/分钟</p>
                                                <p className="messType">呼吸超出时长时，立即报警</p>
                                            </div>
                                        </li>
                                        
                                        <li>
                                            <span className="item_name">心率</span>
                                            <div className="item_cont">
                                                <p>{warningDetails.items[3].val}次/分钟 - {warningDetails.items[3].valEnd}次/分钟</p>
                                                <p className="messType">心率超出时长时，立即报警</p>
                                            </div>
                                        </li>
                                        
                                        <li>
                                            <span className="item_name">体动</span>
                                            <div className="item_cont">
                                                <p>{warningDetails.items[5].val}次/分钟</p>
                                                <p className="messType">体动超出次数时，立即报警</p>
                                            </div>
                                        </li>
                                        <li>
                                            <span className="item_name">睡眠时长</span>
                                            <div className="item_cont">
                                                <p>{warningDetails.items[6].val}分钟</p>
                                                <p className="messType">睡眠时长超出时长时，立即报警</p>
                                            </div>
                                            <div className="item_cont"></div>
                                        </li>
                                        <div style={{ border: '1px dashed #D6D8DD', width: '100%', height: '1px', marginBottom: '10px'}}></div>
                                        <li>
                                            <span className="item_name">巡检</span>
                                            <div className="item_cont">{warningDetails.items[7].val}分钟</div>
                                        </li>
                                    </ul>
                                    <div style={{ width: '100%', textAlign: 'center', marginTop: 30}}>
                                        <Button onClick={() =>{this.props.showModifyForm()}} className="modifyBtn">修改该方案</Button>
                                    </div>
                                </div>
                        }
                    </Row>
                </Spin>
            </React.Fragment>
        )
    }
}
export default WarningDetail

