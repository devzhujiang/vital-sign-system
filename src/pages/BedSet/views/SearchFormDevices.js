
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import __ from 'lodash'
import { Button, Form, Select, Row, Col } from 'antd'
import './index.less'
const FormItem = Form.Item
const Option = Select.Option
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmitForm(e){
            e.preventDefault()
            this.props.form.validateFields((err, values) =>{
                if(!err){
                    dispatch({
                        type: 'devices_exchange_bed_services',
                        payload:{
                            sourceId: values.devices_second_option,
                            targetId: values.devices_four_option,
                        }
                    })
                }
            })
        },
        devicesFirstSelectChange(value){
            dispatch({
                type: 'get_all_devices_bed_services',
                payload:{
                    id: value
                }
            })
            this.props.form.setFieldsValue({
                "paitent_second_option": undefined
            });
        },
        devicesSecondSelectChange(value){
            dispatch({
                type: 'get_all_bed_no_user_services',
                payload:{
                    id: value
                }
            })
            this.props.form.setFieldsValue({
                "paitent_four_option": undefined
            });
        },
    }
}
export default connect(null, mapDispatchToProps) (Form.create() (class SearchFormDevices extends Component{
    render(){
        const {
            props:{
                form:{
                    getFieldDecorator
                },
                onSubmitForm,
                devicesFirstSelectChange,
                devicesSecondSelectChange,
                bedSet:{
                    paitentsThirdData,
                    paitentsFirstData,
                    devicesSecondData,
                    devicesFourData
                }
            }
        } = this
        return(
            <div>
                <Row className="formIntro">
                    <Col className="introItem">病房号</Col>
                    <Col className="introItem speWidth">需要更换的床位号</Col>
                    <Col className="introItem">病房号</Col>
                    <Col className="introItem">新床位号</Col>
                </Row>
                <Form layout="inline" onSubmit={onSubmitForm.bind(this)}>
                    <FormItem label=''>
                        {getFieldDecorator('devices_first_option', {
                                rules: [{
                                    required: true,
                                    message: '请选择'
                                }],
                            })(
                            <Select placeholder="请选择" style={{ width: 160 }} onChange={devicesFirstSelectChange.bind(this)}>
                                {
                                    paitentsThirdData.map((item) =>{
                                        return(
                                            <Option key={item.id} value={item.id}>{item.sn}</Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label='' style={{marginRight: 6}}>
                        {getFieldDecorator('devices_second_option', {
                                rules: [{
                                    required: true,
                                    message: '请选择'
                                }],
                            })(
                            <Select placeholder="请选择" style={{ width: 160 }}>
                                {
                                    devicesSecondData.map((item) =>{
                                        return(
                                            <Option key={item.id} value={item.id}>{item.sn}</Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <span className="changeWrap"><img alt='更换' src={require('../assets/change.png')} /></span>
                    <FormItem label=''>
                        {getFieldDecorator('devices_third_option', {
                                rules: [{
                                    required: true,
                                    message: '请选择'
                                }],
                            })(
                            <Select placeholder="请选择" style={{ width: 160 }} onChange={devicesSecondSelectChange.bind(this)}>
                                {
                                    paitentsFirstData.map((item) =>{
                                        return(
                                            <Option key={item.id} value={item.id}>{item.sn}</Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label=''>
                        {getFieldDecorator('devices_four_option', {
                                rules: [{
                                    required: true,
                                    message: '请选择'
                                }],
                            })(
                            <Select placeholder="请选择" style={{ width: 160 }}>
                                {
                                    devicesFourData.map((item) =>{
                                        return(
                                            <Option key={item.id} value={item.id}>{item.sn}</Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">确认更换</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}))