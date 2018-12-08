import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import __ from 'lodash'
import { Row, Col, Button, Card, Modal, Input, Select,notification } from 'antd'
import ExchangeBeds from './ExchangeBeds.js'
import DoubleSelect from '../../../components/DoubleSelect'
const Option = Select.Option
class BedSet extends Component {
    componentDidMount() {
        this.props.getDepartmentBeds()
        // this.props.addDepartmentRooms()
        // this.props.addDepartmentBeds()
        this.props.getDepartmentInfo()
    }
    render() {
        return (
            <React.Fragment>
                <Row className="bedSet">
                    <Col span={10}>
                        <p className="column-title">病房床位初始化</p>
                    </Col>
                    <Col className="tr" span={14}>
                        <Button onClick={() =>{this.props._showHideOpt({roomVisible: true})}} className="btn_bed_set" type="primary">添加病房</Button>
                        <Modal
                            title="添加病房"
                            maskClosable={false}
                            visible={this.props.bedSet.roomVisible}
                            onOk={this.props.addDepartmentRooms.bind(this, 'oooo')}
                            onCancel={() =>{this.props._showHideOpt({roomVisible: false})}}
                        >
                            <p>
                                <span>请输入病房号：</span>
                                <Input onChange={this.props.saveFormToStore.bind(this)} className="newRoomInout" />
                            </p>
                        </Modal>
                        <Button onClick={() =>{this.props._showHideOpt({bedVisible: true})}} className="btn_bed_set" type="primary">添加病床</Button>
                        <Modal
                            title="添加病床"
                            maskClosable={false}
                            visible={this.props.bedSet.bedVisible}
                            onOk={this.props.addDepartmentBeds.bind(this)}
                            onCancel={() =>{this.props._showHideOpt({bedVisible: false})}}
                        >
                            <React.Fragment>
                                <div>
                                    <span>请选择病房号：</span>
                                    <Select ref={(element) => this.textSelect = element} placeholder="请选择病房号" className="newRoomInout">
                                        {
                                            this.props.bedSet.singleRooms.map((item) => (
                                                <Option key={item.id}>{item.sn}</Option>
                                            ))
                                        }
                                    </Select>
                                </div>
                                <div style={{ marginTop: 10 }}>
                                    <span>请输入病床号：</span>
                                    <input ref={(element) => this.textInput = element} placeholder="请输入病床号" className="inputSpe" />
                                </div>
                            </React.Fragment>
                        </Modal>
                        <Button onClick={() =>{this.props._showHideOpt({deviceVisible: true})}} className="btn_bed_set" type="primary">添加设备</Button>
                        <Modal
                            title="添加设备"
                            maskClosable={false}
                            visible={this.props.bedSet.deviceVisible}
                            onOk={this.props.addDepartmentDevice.bind(this)}
                            onCancel={() =>{this.props._showHideOpt({deviceVisible: false})}}
                        >
                            <React.Fragment>
                                <span>请选病房病床：</span>
                                <DoubleSelect
                                    onChange={this.props.onChangeDevicesSelect.bind(this)}
                                    size={'default'}
                                    className={'newRoomInout'}
                                />
                                <div style={{ marginTop: 10 }}>
                                    <span>请选择设备号：</span>
                                    <Select placeholder="请选择设备" ref={(element) => this.devicesSelect = element} className="newRoomInout">
                                        {
                                            this.props.bedSet.devicesAvaInfo.map((item) => (
                                                <Option key={item.id}>{item.deviceSn}</Option>
                                            ))
                                        }
                                    </Select>
                                </div>
                            </React.Fragment>
                        </Modal>
                    </Col>
                </Row>
                <Row className="bedCard mt20">
                    {
                        this.props.bedSet.rooms.length === 0 ? '暂无床位信息' :
                        __.map(this.props.bedSet.rooms, (item, index) =>{
                            return(
                                <Card
                                    title={item.sn}
                                    key={index}
                                    style={{ width: 200, margin: '5px' }}
                                >
                                    <div className="bedCardCont"><span className="bedName">床位数</span><span className="bedCount">{item.bedCount} <span className="ftSpe">张</span></span></div>
                                    <div className="bedCardCont"><span className="bedName">设备数</span><span className="bedCount">{item.deviceCount} <span className="ftSpe">张</span></span></div>
                                </Card>
                            )
                        })
                    }
                </Row>
                <Row>
                    <ExchangeBeds />
                </Row>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        bedSet: state.bedSet
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onChangeDevicesSelect(value){
            console.log(value)
            dispatch({
                type: 'form_to_store',
                payload:{
                    addDevices: value
                }
            })
        },
        _showHideOpt(flag){
            dispatch({
                type: 'show_hide_opt',
                payload: {
                    data: flag
                }
            })
        },
        saveFormToStore(e){
            dispatch({
                type: 'form_to_store',
                payload:{
                    addRooms: e.target.value
                }
            })
        },
        //获取科室床位信息
        getDepartmentBeds() {
            dispatch({
                type: 'get_department_beds_services'
            })
        },
        //添加病房
        addDepartmentRooms(argus) {
            const that = this
            if(__.isEmpty(that.props.bedSet.modalOptions.addRooms)){
                notification.warning({
                    message: '请先输入病房号'
                })
            }else{
                
                dispatch({
                    type: 'add_department_rooms_services',
                    payload:{
                        values: that.props.bedSet.modalOptions.addRooms
                    }
                })
            }
            
        },
        //添加病床
        addDepartmentBeds() {
            if(__.isEmpty(this.textInput.value) || __.isEmpty(this.textSelect.rcSelect.state.value[0])){
                notification.warning({
                    message: '请先输入病房和病床号'
                })
            }else{
                dispatch({
                    type: 'add_department_beds_services',
                    payload: {
                        sn: this.textInput.value,
                        sickroomId: this.textSelect.rcSelect.state.value[0],
                        deviceId: '',
                        sortNo: parseInt(Math.random()*(10000+1),10)
                    }
                })
            }
        },
        addDepartmentDevice(){
            const that = this
            const bedId = `${that.props.bedSet.modalOptions.addDevices[1]}`
            const deviceId = that.devicesSelect.rcSelect.state.value[0]
            if(__.isEmpty(bedId) || __.isEmpty(deviceId)){
                notification.warning({
                    message: '请先选择病床和设备号'
                })
            }else{
                dispatch({
                    type: 'add_devices_to_beds',
                    payload: {
                        bedId,
                        deviceId
                    }
                })
            }
        },
        //获取科室下面的所有有效病房信息
        getDepartmentInfo() {
            dispatch({
                type: 'get_department_info_services'
            })
            dispatch({
                type: 'get_depart_sick_room_for_select'
            })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BedSet)

