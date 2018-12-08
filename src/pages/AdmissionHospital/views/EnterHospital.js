import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Button, Modal, Form, Input, Select } from 'antd'
import __ from 'lodash'
import DoubleSelectForm from "../../../components/DoubleSelectForm";
const FormItem = Form.Item
const Option = Select.Option;
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};
const formTailLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16, offset: 8 },
}
// const options = []
class EnterHospital extends Component {
    render() {
        const {
            enterHospital,
            onSubmitForm,
            form: {
                getFieldDecorator
            }
        } = this.props
        return (
            <React.Fragment>
                <div className="admissionHospital">
                    <Modal
                        title="入院登记"
                        visible={this.props.admissionHospital.enterHospital}
                        footer={null}
                        onCancel={enterHospital.bind(this, { enterHospital: false })}
                        className="modifyModal"
                    >
                        <div>
                            <Form onSubmit={onSubmitForm.bind(this)} style={{ paddingLeft: '10%'}}>
                                <FormItem {...formItemLayout} label="姓名">
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true,
                                            message: '请输入病人姓名',
                                        }],
                                    })(
                                        <Input placeholder="请输入病人姓名" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="住院号">
                                    {getFieldDecorator('hospitalNumber', {
                                        rules: [{
                                            required: true,
                                            message: '请输入病人住院号',
                                        }],
                                    })(
                                        <Input placeholder="请输入病人住院号" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="身份证号">
                                    {getFieldDecorator('idNumber', {
                                        rules: [{
                                            required: true,
                                            message: '请输入病人身份证号',
                                        }],
                                    })(
                                        <Input placeholder="请输入病人身份证号" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="手机号">
                                    {getFieldDecorator('phone', {
                                        rules: [{
                                            required: true,
                                            message: '请选择病人手机号',
                                        }],
                                    })(
                                        <Input placeholder="请选择病人手机号" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="性别">
                                    {getFieldDecorator('gender', {
                                        rules: [{
                                            required: true,
                                            message: '请选择病人性别',
                                        }],
                                    })(
                                        <Select placeholder="请选择病人性别">
                                            <Option value="1">男</Option>
                                            <Option value="0">女</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <DoubleSelectForm 
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    label="房号床号"
                                    itemId="room_bed_id"
                                />
                                <FormItem {...formItemLayout} label="预警方案">
                                    {getFieldDecorator('planId', {
                                        rules: [{
                                            required: true,
                                            message: '请选择预警方案',
                                        }],
                                    })(
                                        <Select placeholder="请选择预警方案">
                                            {
                                                __.map(this.props.admissionHospital.warningPlans,(item, index) =>(
                                                    <Option value={item.id} key={index}>{item.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem {...formTailLayout}>
                                    <Button style={{ background: '#128875', border: 'none'}} htmlType="submit" type="primary">
                                        确认入院
                                    </Button>
                                </FormItem>
                            </Form>
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
export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(EnterHospital))

