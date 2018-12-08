import React, { Component } from 'react';
import { Cascader, Form } from 'antd'
import requestServices from '../services/index'
import __ from 'lodash'
const FormItem = Form.Item
class DoubleSelectForm extends Component {
    state = {
        firstOptions: [],
    };
    componentDidMount(){
        requestServices.fetch({
            resource: '/api/vital/t-vital-sickroom/findByDeptId',
            params:{
                deptId: sessionStorage.getItem('deptId')
            },
            headers:{
                authorization: sessionStorage.getItem('token')
            }
        })
        .then((response) =>{
            if(response && response.code === '0'){
                const _firstOptions = __.map(response.data.rooms, (item, index) =>{
                    return{
                        value: item.id,
                        label: item.sn,
                        isLeaf: false
                    }
                })
                this.setState({
                    firstOptions: _firstOptions
                })
            }
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    onChange = (value, selectedOptions) => {}
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true;
        setTimeout(() => {
            targetOption.loading = false;
            requestServices.fetch({
                resource: '/api/vital/t-vital-sickbed/beds',
                params:{
                    roomId: selectedOptions[0].value
                },
                headers:{
                    authorization: sessionStorage.getItem('token')
                }
            })
            .then((response) =>{
                if(response && response.code === '0'){
                    targetOption.children = __.map(response.data.beds, (item, index) =>{
                        return{
                            value: item.id,
                            label: item.sn,
                        }
                    })
                    this.setState({
                        firstOptions: [...this.state.firstOptions]
                    })
                }
            })
            .catch((err) =>{
                console.log(err)
            })
        }, 1000);
    }
    
    render() {
        const { 
            getFieldDecorator
        } = this.props
        return (
            <React.Fragment>
                <FormItem {...this.props.formItemLayout}label={this.props.label}>
                    {getFieldDecorator(this.props.itemId)(
                        <Cascader
                            options={this.state.firstOptions}
                            loadData={this.loadData}
                            onChange={this.onChange}
                        />
                    )}
                </FormItem>
                
            </React.Fragment>
        )
    }
}
export default DoubleSelectForm
