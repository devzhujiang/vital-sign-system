import React, { Component } from 'react'
import { connect } from 'react-redux'
// import __ from 'lodash'
import { Button, Form, Select, Row, Col, Popconfirm } from 'antd'
import './index.less'
const FormItem = Form.Item
const Option = Select.Option
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmitForm(e){
            e.preventDefault()
            this.props.form.validateFields((err, values) =>{
                if(!err){
                    console.log(values.paitent_first_option.split('$')[0])
                    console.log(values.paitent_four_option)
                    dispatch({
                        type: 'paitent_exchange_services',
                        payload:{
                            sourceId: values.paitent_first_option.split('$')[0],
                            targetId: values.paitent_four_option,
                        }
                    })
                }
            })
        },
        paitentSecondSelectChange(value){
            dispatch({
                type: 'get_empty_bed_services',
                payload:{
                    id: value.split('-')[0]
                }
            })
            this.props.form.setFieldsValue({
                "paitent_four_option": undefined
            });
        },
        getDefaultSelectValues(){
            dispatch({
                type: 'test_double_select'
            })
            dispatch({
                type: 'get_sick_room_info_servies'
            })
        },
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
                paitentSecondSelectChange,
                bedSet:{
                    paitentsThirdData,
                    paitentsFourData
                },
                main:{
                    globalPaitentsLists
                }
            }
        } = this
        return(
            <div style={{ marginBottom: '150px'}}>
                <Row className="formIntro">
                    <Col className="introItem">病人姓名</Col>
                    <Col className="introItem speWidth"></Col>
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
                            <Select 
                                placeholder="请选择" 
                                showSearch
                                style={{ width: 200 }}
                            >
                                {
                                    globalPaitentsLists.map((item) =>{
                                        return(
                                            <Option key={item.id} value={item.bedId + '$' + item.name}>{item.name + '(' + item.bedSn + ')'}</Option>
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
                            <Select showSearch placeholder="请选择" style={{ width: 200 }} onChange={paitentSecondSelectChange.bind(this)}>
                                {
                                    paitentsThirdData.map((item) =>{
                                        return(
                                            <Option key={item.id} value={item.id + '-' + item.sn}>{item.sn}</Option>
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
                            <Select placeholder="请选择" style={{ width: 200 }}>
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
                        <Popconfirm title="确认更换病床吗？" onConfirm={onSubmitForm.bind(this)} okText="确认" cancelText="取消">
                            <Button type="primary" htmlType="submit">确认更换</Button>
                        </Popconfirm>
                    </FormItem>
                </Form>
            </div>
        )
    }
}))