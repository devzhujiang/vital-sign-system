import React, { Component } from 'react'
import { Modal, Form, Input, Button, Checkbox, Radio } from 'antd'
import './index.less'
import __ from 'lodash'
// import qs from 'qs'
const RadioGroup = Radio.Group
const FormItem = Form.Item
const mapPropsToFields = (props) =>{
    if(JSON.stringify(props.visualCharts.planDetails) === '{}'){
    }else{
        let obj = {}
        obj.name1_1 = props.visualCharts.planDetails.plan.name
        obj.name2_1 = props.visualCharts.planDetails.items[0].isFocus
        obj.name2_2 = props.visualCharts.planDetails.items[0].val
        obj.name3_1 = props.visualCharts.planDetails.items[1].isFocus
        obj.name3_2 = props.visualCharts.planDetails.items[1].val
        obj.name3_3 = props.visualCharts.planDetails.items[1].valEnd
        obj.name4_1 = props.visualCharts.planDetails.items[2].isFocus
        obj.name4_2 = props.visualCharts.planDetails.items[2].val
        obj.name5_1 = props.visualCharts.planDetails.items[3].isFocus
        obj.name5_2 = props.visualCharts.planDetails.items[3].val
        obj.name5_3 = props.visualCharts.planDetails.items[3].valEnd
        obj.name6_1 = props.visualCharts.planDetails.items[4].isFocus
        obj.name6_2 = props.visualCharts.planDetails.items[4].val
        obj.name7_1 = props.visualCharts.planDetails.items[5].isFocus
        obj.name7_2 = props.visualCharts.planDetails.items[5].val
        obj.name8_1 = props.visualCharts.planDetails.items[6].isFocus
        obj.name8_2 = props.visualCharts.planDetails.items[6].val
        obj.name9_1 = props.visualCharts.planDetails.items[7].isFocus
        obj.name9_2 = props.visualCharts.planDetails.items[7].status
        obj.name9_3 = props.visualCharts.planDetails.items[7].val
        return __.mapValues(obj, (item) =>{
            return Form.createFormField({
                value: item
            })
        })
    }
}
const onValuesChange = (props, values) => {
    console.log(values)
    if(Object.keys(values)[0] === 'name1_1'){
        props.visualCharts.planDetails.plan.name = values.name1_1
    }
    if(Object.keys(values)[0] === 'name2_1'){
        props.visualCharts.planDetails.items[0].isFocus = values.name2_1
    }
    if(Object.keys(values)[0] === 'name2_2'){
        props.visualCharts.planDetails.items[0].val = values.name2_2
    }
    if(Object.keys(values)[0] === 'name3_1'){
        props.visualCharts.planDetails.items[1].isFocus = values.name3_1
    }
    if(Object.keys(values)[0] === 'name3_2'){
        props.visualCharts.planDetails.items[1].val = values.name3_2
    }
    if(Object.keys(values)[0] === 'name3_3'){
        props.visualCharts.planDetails.items[1].valEnd = values.name3_3
    }
    if(Object.keys(values)[0] === 'name4_1'){
        props.visualCharts.planDetails.items[2].isFocus = true
    }
    if(Object.keys(values)[0] === 'name4_2'){
        props.visualCharts.planDetails.items[2].val = values.name4_2
    }
    if(Object.keys(values)[0] === 'name5_1'){
        props.visualCharts.planDetails.items[3].isFocus = values.name5_1
    }
    if(Object.keys(values)[0] === 'name5_2'){
        props.visualCharts.planDetails.items[3].val = values.name5_2
    }
    if(Object.keys(values)[0] === 'name5_3'){
        props.visualCharts.planDetails.items[3].valEnd = values.name5_3
    }
    if(Object.keys(values)[0] === 'name6_1'){
        props.visualCharts.planDetails.items[4].isFocus = true
    }
    if(Object.keys(values)[0] === 'name6_2'){
        props.visualCharts.planDetails.items[4].val = values.name6_2
    }
    if(Object.keys(values)[0] === 'name7_1'){
        props.visualCharts.planDetails.items[5].isFocus = values.name7_1
    }
    if(Object.keys(values)[0] === 'name7_2'){
        props.visualCharts.planDetails.items[5].val = values.name7_2
    }
    if(Object.keys(values)[0] === 'name8_1'){
        props.visualCharts.planDetails.items[6].isFocus = values.name8_1
    }
    if(Object.keys(values)[0] === 'name8_2'){
        props.visualCharts.planDetails.items[6].val = values.name8_2
    }
    if(Object.keys(values)[0] === 'name9_1'){
        props.visualCharts.planDetails.items[7].isFocus = values.name9_1
    }
    if(Object.keys(values)[0] === 'name9_2'){
        props.visualCharts.planDetails.items[7].status = values.name9_2
    }
    if(Object.keys(values)[0] === 'name9_3'){
        props.visualCharts.planDetails.items[7].val = values.name9_3
    }
}
export default Form.create({mapPropsToFields, onValuesChange}) (class ModalForm extends Component {
    state = {
        isShowRadioInput: false,
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
                    "name": values.name1_1,
                    "id": this.props.query.planId,
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
                        "val": values.name4_2,
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
                        "val": values.name6_2,
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
                this.props.modifyChartsPlanByModal(_val)
            }
        })
    }
    componentDidMount(){
        console.log(this.props.visualCharts.planDetails.items[7].status)
        if(this.props.visualCharts.planDetails.items[7].status === 1){
            this.setState({
                isShowRadioInput: true
            })
        }else{
            this.setState({
                isShowRadioInput: false
            })
        }
    }
    // componentWillReceiveProps(nextProps){
    //     setTimeout(() =>{
    //         if(this.state.radioChangeFlag === 0){
    //             if(JSON.stringify(nextProps.visualCharts.planDetails) !== '{}' && nextProps.visualCharts.planDetails.items[7].status === 1){
    //                 this.setState({
    //                     isShowRadioInput: true
    //                 })
    //             }else{
    //                 this.setState({
    //                     isShowRadioInput: false
    //                 })
    //             }
    //         }
    //     }, 1000)
    // }
    render() {
        const{
            onCloseModalForm,
            visualCharts:{
                visible,
            },
        } = this.props
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 5 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 24 },
            }
        }
        const { getFieldDecorator } = this.props.form
        return (
            <React.Fragment>
                <Modal
                    title="预警方案设置"
                    visible={visible}
                    onCancel={onCloseModalForm.bind(this)}
                    maskClosable={false}
                    className="modalForm"
                    footer={null}
                    >
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
                            <span className="firseItem">
                                <FormItem>
                                    {getFieldDecorator('name2_1',{
                                        // initialValue: this.props.warningSet.warningDetails.items[0].isFocus === 0 ? false : true,
                                        valuePropName: 'checked',
                                    })(
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
                                            <Input style={{ width: '100px'}} type="number" className="inputStyle" placeholder="离床时间" />
                                        )}
                                        <span className="ant-form-text"> 分钟（默认0分钟，立即报警）</span>
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
                                        {getFieldDecorator('name3_1',{
                                            // initialValue: this.props.warningSet.warningDetails.items[1].isFocus === 0 ? false : true,
                                            valuePropName: 'checked',
                                        })(
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
                                            <Input style={{ width: '100px'}} type="number" className="inputStyle" placeholder="呼吸次数" />
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
                                            <Input style={{ width: '100px'}} type="number" className="inputStyle" placeholder="呼吸次数" />
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
                                <span className="firseItem">&nbsp;</span>
                                <span className="secondItem">呼吸暂停</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name4_2', {
                                            rules: [{
                                                required: true,
                                                message: '请输入呼吸暂停时间',
                                            }],
                                        })(
                                            <Input className="inputStyle" placeholder="呼吸暂停时间" />
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
                                    {getFieldDecorator('name5_1',{
                                        // initialValue: this.props.warningSet.warningDetails.items[4].isFocus === 0 ? false : true,
                                        valuePropName: 'checked',
                                    })(
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
                                            <Input style={{ width: '100px'}} type="number" className="inputStyle" placeholder="心率" />
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
                                            <Input style={{ width: '100px'}} type="number" className="inputStyle" placeholder="心率" />
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
                                <span className="firseItem">&nbsp;</span>
                                <span className="secondItem">心率暂停</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name6_2', {
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
                                        {getFieldDecorator('name7_1',{
                                            // initialValue: this.props.warningSet.warningDetails.items[6].isFocus === 0 ? false : true,
                                            valuePropName: 'checked',
                                        })(
                                            <Checkbox></Checkbox>
                                        )}
                                    </FormItem>
                                </span>
                                <span className="secondItem">体动</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name7_2', {
                                            rules: [{
                                                required: true,
                                                message: '请输入体动时间',
                                            }],
                                        })(
                                            <Input className="inputStyle" placeholder="请输入体动时间" />
                                        )}
                                        <span className="ant-form-text"> 分钟</span>
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
                                        {getFieldDecorator('name8_1',{
                                            // initialValue: this.props.warningSet.warningDetails.items[5].isFocus === 0 ? false : true,
                                            valuePropName: 'checked',
                                        })(
                                            <Checkbox></Checkbox>
                                        )}
                                    </FormItem>
                                </span>
                                <span className="secondItem">睡眠时长</span>
                                <span className="thirdItem">
                                    <FormItem>
                                        {getFieldDecorator('name8_2', {
                                            rules: [{
                                                required: true,
                                                message: '请输入睡眠时长',
                                            }],
                                        })(
                                            <Input className="inputStyle" placeholder="请输入睡眠时长" />
                                        )}
                                        <span className="ant-form-text"> 分钟</span>
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
                                        {getFieldDecorator('name9_1',{
                                            // initialValue: this.props.warningSet.warningDetails.items[7].isFocus === 0 ? false : true,
                                            valuePropName: 'checked',
                                        })(
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
                                    <span>
                                        <FormItem>
                                            <span style={{ marginLeft: 100 }} className="ant-form-text"> 间隔时长</span>
                                            {getFieldDecorator('name9_3', {
                                                initialValue: this.props.visualCharts.planDetails.items[7].val,
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
                                type="primary"
                            >
                                确认修改
                            </Button>
                        </FormItem>
                    </Form>
                </Modal>
            </React.Fragment>
        )
    }
})