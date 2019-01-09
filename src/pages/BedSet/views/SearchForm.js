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
                    console.log(values)
                    dispatch({
                        type: 'paitent_exchange_services',
                        payload:{
                            sourceId: values.paitent_second_option,
                            targetId: values.paitent_four_option,
                        }
                    })
                }
            })
        },
        paitentFirstSelectChange(value){
            dispatch({
                type: 'get_has_user_bed_services',
                payload:{
                    id: value
                }
            })
            this.props.form.setFieldsValue({
                "paitent_second_option": undefined
            });
        },
        paitentSecondSelectChange(value){
            dispatch({
                type: 'get_empty_bed_services',
                payload:{
                    id: value
                }
            })
            this.props.form.setFieldsValue({
                "paitent_four_option": undefined
            });
        },
        getDefaultSelectValues(){
            console.log('aaaaaa')
            dispatch({
                type: 'test_double_select'
            })
            dispatch({
                type: 'get_sick_room_info_servies'
            })
        }
    }
}
export default connect(null, mapDispatchToProps) (Form.create() (class SearchFrom extends Component{
    componentDidMount(){
        this.props.getDefaultSelectValues()
    }
    render(){
        const {
            props:{
                form:{
                    getFieldDecorator
                },
                onSubmitForm,
                paitentFirstSelectChange,
                paitentSecondSelectChange,
                bedSet:{
                    paitentsFirstData,
                    paitentsSecondData,
                    paitentsThirdData,
                    paitentsFourData
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
                        {getFieldDecorator('paitent_first_option', {
                                rules: [{
                                    required: true,
                                    message: '请选择'
                                }],
                            })(
                            <Select placeholder="请选择" style={{ width: 160 }} onChange={paitentFirstSelectChange.bind(this)}>
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
                    <FormItem label='' style={{marginRight: 6}}>
                        {getFieldDecorator('paitent_second_option', {
                                rules: [{
                                    required: true,
                                    message: '请选择'
                                }],
                            })(
                            <Select placeholder="请选择" style={{ width: 160 }}>
                                {
                                    paitentsSecondData.map((item) =>{
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
                        {getFieldDecorator('paitent_third_option', {
                                rules: [{
                                    required: true,
                                    message: '请选择'
                                }],
                            })(
                            <Select placeholder="请选择" style={{ width: 160 }} onChange={paitentSecondSelectChange.bind(this)}>
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
                    <FormItem label=''>
                        {getFieldDecorator('paitent_four_option', {
                                rules: [{
                                    required: true,
                                    message: '请选择'
                                }],
                            })(
                            <Select placeholder="请选择" style={{ width: 160 }}>
                                {
                                    paitentsFourData.map((item) =>{
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