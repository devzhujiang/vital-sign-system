import React, { Component } from 'react'
import { connect } from 'react-redux'
// import __ from 'lodash'
import { Form, Popconfirm, Select, Button} from 'antd'
import './index.less'
const FormItem = Form.Item
const Option = Select.Option
const mapDispatchToProps = (dispatch, props) => {
    return {
        onBindSubmitForm(e){
            e.preventDefault()
            this.props.form.validateFields((err, values) => {
                if (!err){
                    dispatch({
                        type: 'add_devices_to_beds',
                        payload: {
                            bedId: values.bedId,
                            deviceId: values.deviceId
                        }
                    })
                }
            })
        },
        
    }
}
export default connect(null, mapDispatchToProps) (Form.create() (class BindDevice extends Component{
    componentDidMount(){
        this.props.onRef(this)
    }
    onResetFeilds =() =>{
        this.props.form.resetFields()
    }
    render(){
        const {
            props:{
                form:{
                    getFieldDecorator
                },
                bedSet:{
                    bedsList,
                    devicesAvaInfo
                },
                onBindSubmitForm,
            }
        } = this
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
        };
        return(
            <div>
                <Form>
                    <FormItem label='病床号' {...formItemLayout}>
                        {getFieldDecorator('bedId', {
                                rules: [{
                                    required: true,
                                    message: '请选择'
                                }],
                            })(
                            <Select 
                                placeholder="请选择" 
                                style={{ width: 200 }}
                            >
                                {
                                    bedsList.map((item) =>{
                                        return(
                                            <Option key={item.id} value={item.id}>{item.sn}</Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label='设备号' {...formItemLayout}>
                        {getFieldDecorator('deviceId', {
                                rules: [{
                                    required: true,
                                    message: '请选择'
                                }],
                            })(
                            <Select 
                                placeholder="请选择" 
                                style={{ width: 200 }}
                            >
                                {
                                    devicesAvaInfo.map((item) =>{
                                        return(
                                            <Option key={item.id} value={item.id}>{item.deviceSn}</Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Popconfirm title="确认添加设备吗？" onConfirm={onBindSubmitForm.bind(this)} okText="确认" cancelText="取消">
                            <Button type="primary">添加设备</Button>
                        </Popconfirm>
                    </FormItem>
                </Form>
            </div>
        )
    }
}))