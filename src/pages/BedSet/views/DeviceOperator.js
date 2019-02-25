import React, { Component } from 'react'
import { connect } from 'react-redux'
// import __ from 'lodash'
import { Form, Modal, Tabs, Popconfirm, Select, Button} from 'antd'
import './index.less'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
const Option = Select.Option
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmitForm(){

        }
    }
}
export default connect(null, mapDispatchToProps) (Form.create() (class DeviceOperator extends Component{
    render(){
        const {
            props:{
                form:{
                    getFieldDecorator
                },
                onSubmitForm,
                main:{
                    globalPaitentsLists
                }
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
                <Modal
                    title="设备管理"
                    visible={false}
                    // onCancel={closePaitentWarningPlan.bind(this, itemId)}
                    maskClosable={false}
                    className="modalForm"
                    footer={null}
                    >
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="绑定设备" key="1">
                            <Form onSubmit={onSubmitForm.bind(this)}>
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
                                                globalPaitentsLists.map((item) =>{
                                                    return(
                                                        <Option key={item.id} value={item.bedId}>{item.name}</Option>
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
                                                globalPaitentsLists.map((item) =>{
                                                    return(
                                                        <Option key={item.id} value={item.bedId}>{item.name}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    <Popconfirm title="确认添加设备吗？" onConfirm={onSubmitForm.bind(this)} okText="确认" cancelText="取消">
                                        <Button type="primary" htmlType="submit">添加设备</Button>
                                    </Popconfirm>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane tab="解除设备" key="2">解除设备</TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}))