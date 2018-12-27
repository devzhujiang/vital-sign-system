import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Row, Form, Input, Button, Checkbox, Radio } from 'antd'
import './index.less'
import __ from 'lodash'
import qs from 'qs'
const RadioGroup = Radio.Group
const FormItem = Form.Item
const mapPropsToFields = (props) =>{
    if(JSON.stringify(props.warningSet.warningDetails) === '{}'){

    }else{
        let obj = {}
        obj.name = props.warningSet.warningDetails.plan.name
        obj.name2 = props.warningSet.warningDetails.items[0].val
        obj.name3 = props.warningSet.warningDetails.items[1].isFocus === 0 ? false : true
        obj.name4 = props.warningSet.warningDetails.items[1].val
        obj.name5 = props.warningSet.warningDetails.items[2].isFocus === 0 ? false : true
        obj.name6 = props.warningSet.warningDetails.items[2].val
        obj.name7 = props.warningSet.warningDetails.items[3].val
        obj.name8 = props.warningSet.warningDetails.items[4].isFocus === 0 ? false : true
        obj.name9 = props.warningSet.warningDetails.items[4].val
        obj.name10 = props.warningSet.warningDetails.items[5].isFocus === 0 ? false : true
        obj.name11 = props.warningSet.warningDetails.items[5].val
        obj.name12 = props.warningSet.warningDetails.items[6].isFocus === 0 ? false : true
        obj.name13 = props.warningSet.warningDetails.items[6].val
        obj.name14 = props.warningSet.warningDetails.items[7].isFocus === 0 ? false : true
        obj.name15 = props.warningSet.warningDetails.items[7].status
        obj.name16 = props.warningSet.warningDetails.items[7].val
        return __.mapValues(obj, (item) =>{
            return Form.createFormField({
                value: item
            })
        })
    }
}
class FormListCommon extends Component {
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
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let _val = {}
                _val.plan = {
                    "name": values.name,
                    "id": qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id,
                    "deptId" : sessionStorage.getItem('deptId'),
                    "items": [{
                        "isFocus": 0,
                        "val": values.name2,
                        "sn": "K01",
                        "status": 1
                    },{
                        "isFocus": values.name3 ? 1 : 0,
                        "val": values.name4,
                        "sn": "K02",
                        "status": 1
                    },{
                        "isFocus": values.name5 ? 1 : 0,
                        "val": values.name6,
                        "sn": "K03",
                        "status": 1
                    },{
                        "isFocus":0,
                        "val": values.name7,
                        "sn": "K04",
                        "status": 1
                    },{
                        "isFocus": values.name8 ? 1 : 0,
                        "val": values.name9,
                        "sn": "K05",
                        "status": 1
                    },{
                        "isFocus": values.name10 ? 1 : 0,
                        "val": values.name11,
                        "sn": "K06",
                        "status": 1
                    },{
                        "isFocus": values.name12 ? 1 : 0,
                        "val": values.name13,
                        "sn": "K07",
                        "status": 1
                    },{
                        "isFocus": values.name14 ? 1 : 0,
                        "val": values.name16 ? values.name16 : '',
                        "sn": "K08",
                        "status": values.name15 ? 1 : 0,
                    }]
                }
                console.log(_val)
                this.props.modifyPlans(_val)
            }
        })
    }
    componentDidMount(){
        // console.log(this.props.warningDetails)
        if(this.props.warningSet.warningDetails.items[7].status === 1){
            this.setState({
                isShowRadioInput: true
            })
        }else{
            this.setState({
                isShowRadioInput: false
            })
        }
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
                    <Form>
                        <FormItem
                        {...formItemLayout}
                            label=""
                        >
                            <div>
                                <span className="firseItem">&nbsp;</span>
                                <span className="secondItem">方案名称</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name', {
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
                                <span className="secondItem">离床时间</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name2', {
                                            rules: [{
                                                required: true,
                                                message: '请输入离床时间',
                                            }],
                                        })(
                                            <Input type="number" className="inputStyle" placeholder="离床时间" />
                                        )}
                                        {/* <span className="ant-form-text"> 分钟（默认0分钟，立即报警）</span> */}
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
                                        {getFieldDecorator('name3',{
                                            initialValue: this.props.warningSet.warningDetails.items[1].isFocus === 0 ? false : true,
                                            valuePropName: 'checked',
                                        })(
                                            <Checkbox></Checkbox>
                                        )}
                                    </FormItem></span>
                                <span className="secondItem">呼吸</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name4', {
                                            rules: [{
                                                required: true,
                                                message: '请输入呼吸次数',
                                            }],
                                        })(
                                            <Input className="inputStyle" placeholder="请输入呼吸次数" />
                                        )}
                                        <span className="ant-form-text"> 次 / 分钟</span>
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
                                        {getFieldDecorator('name5',{
                                            initialValue: this.props.warningSet.warningDetails.items[2].isFocus === 0 ? false : true,
                                            valuePropName: 'checked',
                                        })(
                                            <Checkbox></Checkbox>
                                        )}
                                    </FormItem></span>
                                <span className="secondItem">呼吸暂停</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name6', {
                                            rules: [{
                                                required: true,
                                                message: '请输入呼吸暂停时间',
                                            }],
                                        })(
                                            <Input className="inputStyle" placeholder="请输入呼吸暂停时间" />
                                        )}
                                        <span className="ant-form-text"> 秒</span>
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
                                <span className="secondItem">心率</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name7', {
                                            rules: [{
                                                required: true,
                                                message: '请输入心率',
                                            }],
                                        })(
                                            <Input type="number" className="inputStyle" placeholder="请输入心率" />
                                        )}
                                        <span className="ant-form-text"> 次 / 分钟</span>
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
                                        {getFieldDecorator('name8',{
                                            initialValue: this.props.warningSet.warningDetails.items[4].isFocus === 0 ? false : true,
                                            valuePropName: 'checked',
                                        })(
                                            <Checkbox></Checkbox>
                                        )}
                                    </FormItem></span>
                                <span className="secondItem">心率暂停</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name9', {
                                            rules: [{
                                                required: true,
                                                message: '请输入心率暂停时间',
                                            }],
                                        })(
                                            <Input className="inputStyle" placeholder="请输入心率暂停时间" />
                                        )}
                                        <span className="ant-form-text"> 秒</span>
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
                                        {getFieldDecorator('name10',{
                                            initialValue: this.props.warningSet.warningDetails.items[5].isFocus === 0 ? false : true,
                                            valuePropName: 'checked',
                                        })(
                                            <Checkbox></Checkbox>
                                        )}
                                    </FormItem></span>
                                <span className="secondItem">体动</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name11', {
                                            rules: [{
                                                required: true,
                                                message: '请输入体动时间',
                                            }],
                                        })(
                                            <Input className="inputStyle" placeholder="请输入体动时间" />
                                        )}
                                        <span className="ant-form-text"> 小时</span>
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
                                        {getFieldDecorator('name12',{
                                            initialValue: this.props.warningSet.warningDetails.items[6].isFocus === 0 ? false : true,
                                            valuePropName: 'checked',
                                        })(
                                            <Checkbox></Checkbox>
                                        )}
                                    </FormItem></span>
                                <span className="secondItem">睡眠时长</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name13', {
                                            rules: [{
                                                required: true,
                                                message: '请输入睡眠时长',
                                            }],
                                        })(
                                            <Input className="inputStyle" placeholder="请输入睡眠时长" />
                                        )}
                                        <span className="ant-form-text"> 小时</span>
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
                                        {getFieldDecorator('name14',{
                                            initialValue: this.props.warningSet.warningDetails.items[7].isFocus === 0 ? false : true,
                                            valuePropName: 'checked',
                                        })(
                                            <Checkbox></Checkbox>
                                        )}
                                    </FormItem></span>
                                <span className="secondItem">巡查</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name15', {
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
                                    <span>
                                        <FormItem>
                                            <span style={{ marginLeft: 100 }} className="ant-form-text"> 间隔时长</span>
                                            {getFieldDecorator('name16', {
                                                initialValue: this.props.warningSet.warningDetails.items[7].val,
                                                rules: [{
                                                    required: true,
                                                    message: '请输入间隔时长',
                                                }],
                                            })(
                                                <Input style={{ width: 100}} /> 
                                            )}
                                        </FormItem>
                                    </span>
                                    ) : ''
                                }
                            </div>
                        </FormItem>
                        <FormItem style={{ textAlign: 'center', marginTop: 20}}>
                            <Button
                                htmlType="submit"
                                className="modifyBtn"
                            >
                                确认修改
                            </Button>
                        </FormItem>
                    </Form>
                </Row>
            </React.Fragment>
        )
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        modifyPlans(val){
            dispatch({
                type: 'modify_waring_plan_services',
                payload: val
            })
        }
    }
}
export default Form.create({mapPropsToFields})(connect(null, mapDispatchToProps)(FormListCommon))

