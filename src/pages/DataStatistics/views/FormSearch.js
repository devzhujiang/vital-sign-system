import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import { Form, Button, DatePicker } from 'antd'
const { RangePicker } = DatePicker
const dateFormat = 'YYYY/MM/DD'
class FormSearch extends Component {
    render() {
        const {
            form:{
                getFieldDecorator
            },
            onSubmitForm
        } = this.props
        return (
            <React.Fragment>
                <div className="formSearchData">
                    <Form layout="inline" style={{ marginBottom: 20}} onSubmit={onSubmitForm.bind(this)}>
                        <Form.Item>
                            {getFieldDecorator('username')(
                                <RangePicker
                                    format={dateFormat}
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                搜索
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dataStatistics: state.dataStatistics
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmitForm(e){
            e.preventDefault()
            this.props.form.validateFields((err, values) =>{
                if(!err){
                    dispatch({
                        type: 'loading_data_statics',
                        payload: true
                    })
                    dispatch({
                        type: 'search_data_statics_services'
                    })
                }
            })
        },
        setChangedValues(value){
            dispatch({
                type: 'set_changed_values',
                payload:{
                    data: value
                }
            })
        }
    }
}
const mapPropsToFields = (props) =>{
    return {
        username: Form.createFormField({
            value: props.dataStatistics.formSearch['username'],
        })
    }
}
const onValuesChange = (props, changedValues) =>{
    props.setChangedValues(changedValues)
    
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create({mapPropsToFields, onValuesChange})(FormSearch))

