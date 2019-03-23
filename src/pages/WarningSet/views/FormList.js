import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Row, Form, Input, Button, Checkbox, Radio, Icon, Tooltip } from 'antd'
import './index.less'
const FormItem = Form.Item
const RadioGroup = Radio.Group
class FormSearch extends Component {
    state = {
        isShowRadioInput: false
    }
    onRadioChange = (e) =>{
        if(e.target.value === 0){
            this.setState({
                isShowRadioInput: false
            })
        }else{
            this.setState({
                isShowRadioInput: true
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let _val = {}
                _val.plan = {
                    "name": values.name1_1,
                    "deptId" : sessionStorage.getItem('deptId'),
                    "items": [{
                        "isFocus": values.name2_1 ? 1 : 0,
                        "val": values.name2_2,
                        "sn": "K01",
                        "status": 1,
                        "valType": 1
                    },{
                        "isFocus": values.name3_1 ? 1 : 0,
                        "val": values.name3_2,
                        "sn": "K02",
                        "status": 1,
                        "valType": 2, //区间值
                        "valEnd": values.name3_3
                    },{
                        "isFocus": 1,
                        "val": values.name4_1,
                        "sn": "K03",
                        "status": 1,
                        "valType": 1
                    },{
                        "isFocus": values.name5_1 ? 1 : 0,
                        "val": values.name5_2,
                        "sn": "K02",
                        "status": 1,
                        "valType": 2, //区间值
                        "valEnd": values.name5_3
                    },{
                        "isFocus": 1,
                        "val": values.name6_1,
                        "sn": "K05",
                        "status": 1,
                        "valType": 1
                    },{
                        "isFocus": values.name7_1 ? 1 : 0,
                        "val": values.name7_2,
                        "sn": "K06",
                        "status": 1,
                        "valType": 1
                    },{
                        "isFocus": values.name8_1 ? 1 : 0,
                        "val": values.name8_2,
                        "sn": "K07",
                        "status": 1,
                        "valType": 1
                    },{
                        "isFocus": values.name9_1 ? 1 : 0,
                        "val": values.name9_3 ? values.name9_3 : '',
                        "sn": "K08",
                        "status": values.name9_2 ? 1 : 0,
                        "valType": 1
                    }]
                }
                console.log(_val)
                this.props.addPlans(_val)
            }
        })
    }
    render() {
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 5 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 24 },
            },
        };
        const { getFieldDecorator } = this.props.form
        return (
            <React.Fragment>
                <Row className="form_wrap">
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                        {...formItemLayout}
                            label=""
                        >
                            <div>
                                <span className="firseItem">&nbsp;</span>
                                <span className="secondItem">方案名称</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name1_1', {
                                            rules: [{
                                                required: true,
                                                message: '请输入方案名称',
                                            }],
                                        })(
                                            <Input className="inputStyle" placeholder="请输入方案名称" />
                                        )}
                                    </FormItem>
                                </span>
                            </div>
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                            label=""
                        >
                            <div>
                                <span className="firseItem">&nbsp;</span>
                                <span className="secondItem">呼吸暂停</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name4_1', {
                                            rules: [{
                                                required: true,
                                                message: '请输入呼吸暂停时间',
                                            }],
                                        })(
                                            <Input style={{ width: '100px'}} placeholder="时间" />
                                        )}
                                        <span className="ant-form-text"> 秒(超过该呼吸暂停时长时，立即报警)</span>
                                    </FormItem>
                                </span>
                            </div>
                        </FormItem>
                            
                        <FormItem
                        {...formItemLayout}
                            label=""
                        >
                            <div>
                                <span className="firseItem">&nbsp;</span>
                                <span className="secondItem">心率暂停</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name6_1', {
                                            rules: [{
                                                required: true,
                                                message: '请输入心率暂停时间',
                                            }],
                                        })(
                                            <Input style={{ width: '100px'}} placeholder="时间" />
                                        )}
                                        <span className="ant-form-text"> 秒(超过该心率暂停时长时，立即报警)</span>
                                    </FormItem>
                                </span>
                            </div>
                        </FormItem>

                        <div style={{ border: '1px dashed #D6D8DD', width: '100%', height: '1px', marginBottom: '10px'}}></div>

                        <FormItem
                        {...formItemLayout}
                            label=""
                        >
                            <div>
                            <span className="firseItem">
                                <FormItem>
                                    {getFieldDecorator('name2_1')(
                                        <Checkbox></Checkbox>
                                    )}
                                </FormItem>
                            </span>
                                <span className="secondItem">离床时间</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name2_2', {
                                            rules: [{
                                                required: true,
                                                message: '请输入离床时间',
                                            }],
                                        })(
                                            <Input style={{ width: '66px'}} type="number" placeholder="时间" />
                                        )}
                                        <span className="ant-form-text"> 分钟(勾选并超过该离床时间时，立即提示)</span>
                                    </FormItem>
                                </span>
                            </div>
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                            label=""
                        >
                            <div>
                                <span className="firseItem">
                                    <FormItem>
                                        {getFieldDecorator('name3_1')(
                                            <Checkbox></Checkbox>
                                        )}
                                    </FormItem>
                                </span>
                                <span className="secondItem">呼吸</span>
                                <span className="specialItem">
                                    <FormItem>
                                        {getFieldDecorator('name3_2', {
                                            rules: [{
                                                required: true,
                                                message: '请输入呼吸次数',
                                            }],
                                        })(
                                            <Input style={{ width: '66px'}} type="number" placeholder="呼吸次数" />
                                        )}
                                        <span className="ant-form-text"> - </span>
                                    </FormItem>
                                </span>
                                <span className="specialItem2">
                                    <FormItem>
                                        {getFieldDecorator('name3_3', {
                                            rules: [{
                                                required: true,
                                                message: '请输入呼吸次数',
                                            }],
                                        })(
                                            <Input style={{ width: '66px'}} type="number" placeholder="呼吸次数" />
                                        )}
                                        <React.Fragment>
                                            <span className="ant-form-text"> 次 / 分钟</span>
                                            <Tooltip placement="top" title='勾选并超出该区间时，立即提示'>
                                                <Icon style={{color: '#128875'}} type="info-circle" />
                                            </Tooltip>
                                        </React.Fragment>
                                    </FormItem>
                                </span>
                            </div>
                        </FormItem>
                        
                        <FormItem
                        {...formItemLayout}
                            label=""
                        >
                            <div>
                            <span className="firseItem">
                                <FormItem>
                                    {getFieldDecorator('name5_1')(
                                        <Checkbox></Checkbox>
                                    )}
                                </FormItem>
                            </span>
                                <span className="secondItem">心率</span>
                                <span className="specialItem">
                                    <FormItem>
                                        {getFieldDecorator('name5_2', {
                                            rules: [{
                                                required: true,
                                                message: '请输入心率',
                                            }],
                                        })(
                                            <Input style={{ width: '66px'}} type="number" placeholder="心率" />
                                        )}
                                        <span className="ant-form-text"> - </span>
                                    </FormItem>
                                </span>
                                <span className="specialItem2">
                                    <FormItem>
                                        {getFieldDecorator('name5_3', {
                                            rules: [{
                                                required: true,
                                                message: '请输入心率',
                                            }],
                                        })(
                                            <Input style={{ width: '66px'}} type="number" placeholder="心率" />
                                        )}
                                        <React.Fragment>
                                            <span className="ant-form-text"> 次 / 分钟</span>
                                            <Tooltip placement="top" title='勾选并超出该区间时，立即提示'>
                                                <Icon style={{color: '#128875'}} type="info-circle" />
                                            </Tooltip>
                                        </React.Fragment>
                                    </FormItem>
                                </span>
                            </div>
                        </FormItem>
                        
                        <FormItem
                        {...formItemLayout}
                            label=""
                        >
                            <div>
                                <span className="firseItem">
                                    <FormItem>
                                        {getFieldDecorator('name7_1')(
                                            <Checkbox></Checkbox>
                                        )}
                                    </FormItem></span>
                                <span className="secondItem">体动</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name7_2', {
                                            rules: [{
                                                required: true,
                                                message: '请输入体动时间',
                                            }],
                                        })(
                                            <Input style={{ width: '156px'}} placeholder="请输入体动时间" />
                                        )}
                                        <React.Fragment>
                                            <span className="ant-form-text"> 小时</span>
                                            <Tooltip placement="top" title='身体未动超出该值时，立即提示'>
                                                <Icon style={{color: '#128875'}} type="info-circle" />
                                            </Tooltip>
                                        </React.Fragment>
                                    </FormItem>
                                </span>
                            </div>
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                            label=""
                        >
                            <div>
                                <span className="firseItem">
                                    <FormItem>
                                        {getFieldDecorator('name8_1')(
                                            <Checkbox></Checkbox>
                                        )}
                                    </FormItem></span>
                                <span className="secondItem">睡眠时长</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name8_2', {
                                            rules: [{
                                                required: true,
                                                message: '请输入睡眠时长',
                                            }],
                                        })(
                                            <Input style={{ width: '156px'}} placeholder="请输入睡眠时长" />
                                        )}
                                        <React.Fragment>
                                            <span className="ant-form-text"> 小时</span>
                                            <Tooltip placement="top" title='睡眠时长超出该值时，立即提示'>
                                                <Icon style={{color: '#128875'}} type="info-circle" />
                                            </Tooltip>
                                        </React.Fragment>
                                    </FormItem>
                                </span>
                            </div>
                        </FormItem>
                        <div style={{ border: '1px dashed #D6D8DD', width: '100%', height: '1px', marginBottom: '10px'}}></div>
                        <FormItem
                        {...formItemLayout}
                            label=""
                        >
                            <div>
                                <span className="firseItem">
                                    <FormItem>
                                        {getFieldDecorator('name9_1')(
                                            <Checkbox></Checkbox>
                                        )}
                                    </FormItem></span>
                                <span className="secondItem">巡查</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name9_2', {
                                            initialValue: 0,
                                            rules: [{
                                                required: true,
                                                message: '请输入睡眠时长',
                                            }],
                                        })(
                                            <RadioGroup onChange={this.onRadioChange}>
                                                <Radio value={1}>有效</Radio>
                                                <Radio value={0}>无效</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </span>
                                {
                                    this.state.isShowRadioInput ? (
                                        <span className="fourItem">
                                            <FormItem>
                                                {getFieldDecorator('name9_3', {
                                                    rules: [{
                                                        required: true,
                                                        message: '请输入间隔时长',
                                                    }],
                                                })(
                                                    <span className="ant-form-text"> 间隔时长 <Input style={{ width: 100}} /> 小时</span>
                                                )}
                                            </FormItem>
                                        </span>
                                    ) : ''
                                }
                            </div>
                        </FormItem>
                        <FormItem style={{ textAlign: 'center'}}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ background: '#128875', border: 'none'}}
                            >
                                添加该方案
                            </Button>
                        </FormItem>
                    </Form>
                </Row>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        warningSet: state.warningSet
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        addPlans(val){
            dispatch({
                type: 'add_waring_plan_services',
                payload: val
            })
        }
    }
}
export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(FormSearch))



