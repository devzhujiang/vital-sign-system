import React, { Component } from 'react';
import { Row, Spin, Button } from 'antd'
import './index.less'
class WarningDetail extends Component {
    render() {
        const {
            warningDetails,
            spinning
        } = this.props.warningSet
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
                                            <span className="item_cont">{warningDetails.plan.name}</span>
                                        </li>
                                        <li>
                                            <span className="item_name">离床时间</span>
                                            <span className="item_cont">{warningDetails.items[0].val}</span>
                                        </li>
                                        <li>
                                            <span className="item_name">呼吸</span>
                                            <span className="item_cont">{warningDetails.items[1].val}</span>
                                        </li>
                                        <li>
                                            <span className="item_name">呼吸暂停</span>
                                            <span className="item_cont">{warningDetails.items[2].val}</span>
                                        </li>
                                        <li>
                                            <span className="item_name">心率</span>
                                            <span className="item_cont">{warningDetails.items[3].val}</span>
                                        </li>
                                        <li>
                                            <span className="item_name">心率暂停</span>
                                            <span className="item_cont">{warningDetails.items[4].val}</span>
                                        </li>
                                        <li>
                                            <span className="item_name">体动</span>
                                            <span className="item_cont">{warningDetails.items[5].val}</span>
                                        </li>
                                        <li>
                                            <span className="item_name">睡眠时长</span>
                                            <span className="item_cont">{warningDetails.items[6].val}</span>
                                        </li>
                                        <li>
                                            <span className="item_name">巡检</span>
                                            <span className="item_cont">{warningDetails.items[7].val}</span>
                                        </li>
                                    </ul>
                                    <div style={{ width: '100%', textAlign: 'center', marginTop: 50}}>
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

