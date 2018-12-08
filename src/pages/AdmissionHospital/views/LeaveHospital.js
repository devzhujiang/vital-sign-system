import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import {  Modal, Form, Input, Button, Card, Row, Col } from 'antd'
const FormItem = Form.Item
class LeaveHospital extends Component {
    render() {
        const {
            enterHospital,
            searchSickPeople,
            form: {
                getFieldDecorator
            },
            admissionHospital:{
                leave_people_info
            },
            sickPeopleLeave
        } = this.props
        return (
            <React.Fragment>
                <div className="admissionHospital">
                    <Modal
                        title="出院登记"
                        visible={this.props.admissionHospital.leaveHospital}
                        footer={null}
                        onCancel={enterHospital.bind(this, { leaveHospital: false })}
                    >
                        <div>
                            <div>输入需要办理出院的病人信息</div>
                            <Form layout="inline" onSubmit={searchSickPeople.bind(this)} style={{ marginTop: 10 }}>
                                <FormItem label="">
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true,
                                            message: '请输入病人病床号/住院号',
                                        }],
                                    })(
                                        <Input style={{ width: 300 }} placeholder="请输入病人病床号/住院号" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button htmlType="submit" type="primary">
                                        搜索
                                    </Button>
                                </FormItem>
                            </Form>
                            {
                                leave_people_info.length === 0 ? (
                                    <p style={{ width: '100%', textAlign: 'center', padding: '20px 0', fontSize: '18px', fontWeight: '500'}}>暂无此病人</p>
                                ):
                                    <Card
                                    title={`${leave_people_info.name} | ${leave_people_info.hospitalNumber}`}
                                    style={{ width: '100%', marginTop: 20 }}
                                    className="leavePatints"
                                >
                                    <Row>
                                        <Col span={12}>性别：{leave_people_info.gender === 1 ? '男' : '女'}</Col>
                                        <Col span={12}>住院号：1202</Col>
                                    </Row>
                                    <Row style={{ marginTop: 10}}>
                                        <Col span={12}>年龄：{leave_people_info.phone}</Col>
                                        <Col span={12}>病床号：{leave_people_info.bedSn}</Col>
                                    </Row>
                                    <Row style={{ marginTop: 10}}>
                                        <Col span={12}>电话：{leave_people_info.phone}</Col>
                                        <Col span={12}>入院时间：{leave_people_info.hospitalStay}</Col>
                                    </Row>
                                </Card>
                            }
                            {
                                leave_people_info.length === 0 ? '': 
                                    <div style={{ textAlign: "center", marginTop: 30 }}>
                                    <Button onClick={sickPeopleLeave.bind(this)} disabled={leave_people_info.length === 0 ? true : false} type="primary">确认出院</Button>
                                </div>
                            }
                        </div>
                    </Modal>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        admissionHospital: state.admissionHospital
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}
export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(LeaveHospital))

