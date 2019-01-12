import React, { Component } from 'react';
import { Cascader } from 'antd'
import requestServices from '../services/index'
import __ from 'lodash'
import { connect } from 'react-redux'
const mapStateToProps = (state) => {
    return {
        bedSet: state.bedSet
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        chirdrenSelect(selectOption){
            dispatch({
                type: 'save_sick_rooms_for_select',
                payload:{
                    data: selectOption
                }
            })
        }
    }
}
class DoubleSelect extends Component {
    onChange = (value, selectedOptions) => {}
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true;
        setTimeout(() => {
            targetOption.loading = false;
            requestServices.fetch({
                resource: '/api/vital/t-vital-sickbed/noDeviceBeds',
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
                    this.props.chirdrenSelect(this.props.bedSet.sickRoomForSelect)
                }
            })
            .catch((err) =>{
                console.log(err)
            })
        }, 1000);
    }
    render() {
        const {
            bedSet:{
                sickRoomForSelect
            }
        } = this.props
        return (
            <React.Fragment>
                <Cascader
                    options={sickRoomForSelect}
                    loadData={this.loadData}
                    onChange={this.props.onChange}
                    size={this.props.size}
                    className={this.props.className}
                    placeholder="请选择"
                />
            </React.Fragment>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (DoubleSelect)
