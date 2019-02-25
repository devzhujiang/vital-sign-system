import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.less'
import __ from 'lodash'
// import { Row, notification, Card, Button } from 'antd'
import { Row, Col, Button, Modal, Input, Select,notification, Card } from 'antd'
import SearchForm from './SearchForm'
import DeviceOperator from './DeviceOperator'
// import SearchFormDevices from './SearchFormDevices'
// import DoubleSelect from '../../../components/DoubleSelect'
const Option = Select.Option
class BedSet extends Component {
    componentDidMount() {
        this.props.getDepartmentBeds()
        this.props.getDepartmentInfo()
        // this.props.getBedsForExchange()
    }
    render() {
        
        return (
            <React.Fragment>
                <Row className="bedSet">
                    <Col span={10}>
                        <p className="column-title">病床一览</p>
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
                        {/* <Button onClick={() =>{this.props._showHideOpt({deviceVisible: true})}} className="btn_bed_set" type="primary">添加设备</Button>
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
                        </Modal> */}
                    </Col>
                </Row>
                <Row className="bedCard mt20">
                    {
                        this.props.bedSet.rooms.length === 0 ? '暂无床位信息' :
                        __.map(this.props.bedSet.rooms, (item, index) =>{
                            return(
                                <Card
                                    key={index}
                                    title={item.sn + '病房'}
                                    extra={(<Button onClick={this.props.onDeviceBtnClick.bind(this, item)}>设备处理</Button>)}
                                    style={{ minWidth: 300, margin: 3 }}
                                    headStyle={{fontWeight: 400, fontSize: 24, color: '#222'}}
                                >
                                    <React.Fragment>
                                        {
                                            item.beds.length === 0 ? (
                                                <div>该病房暂无病床</div>
                                            ) :
                                            __.map(item.beds, (list, idx) =>{
                                                return(
                                                    <Card 
                                                        key={idx}
                                                        className={list.status === 0 ? 'itemCardCommonStyle' : 'itemCardBlueStyle'}
                                                        title={list.sn  + '号床'}
                                                        bordered={false}
                                                        headStyle={{height: 38, minHeight: 38}}
                                                        bodyStyle={{marginTop: 36, padding: '24px 0', textAlign: 'center'}}
                                                    >
                                                        {
                                                            list.status === 0 ? (
                                                                <div>
                                                                    {
                                                                        list.hasDevice ? (
                                                                            <React.Fragment>
                                                                                <div style={{ fontSize: 12, color: '#222'}}>空床</div>
                                                                                <div style={{ fontSize: 12, color: '#222'}}>有设备</div>
                                                                            </React.Fragment>
                                                                        ): (
                                                                            <React.Fragment>
                                                                                <div style={{ fontSize: 12, color: '#222'}}>空床</div>
                                                                                <div style={{ fontSize: 12, color: '#222'}}>没有设备</div>
                                                                            </React.Fragment>
                                                                        )
                                                                    }
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    {
                                                                        list.hasDevice ? (
                                                                            <React.Fragment>
                                                                                <p style={{ fontSize: 12, color: '#fff'}}>设备使用中</p>
                                                                            </React.Fragment>
                                                                        ): (
                                                                            <React.Fragment>
                                                                                <p style={{ fontSize: 12, color: '#fff'}}>没有设备</p>
                                                                            </React.Fragment>
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                    </Card>
                                                )
                                            })
                                        }
                                    </React.Fragment>
                                </Card>
                            )
                        })
                    }
                    <DeviceOperator {...this.props} />
                </Row>
                <Row>
                    <React.Fragment>
                        <p className="column-title mt20">换床管理</p>
                        <Row className="mt20 exchangeBg">
                            <div className="paitentAreaTitle">病人换床</div>
                            <div className="paitentFormList">
                                <SearchForm {...this.props} />
                            </div>
                        </Row>
                    </React.Fragment>
                </Row>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        bedSet: state.bedSet,
        main: state.main
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onDeviceBtnClick(obj){
            console.log(obj)
            dispatch({
                type: 'set_sevice_modal_visible',
                payload:{
                    data: obj
                }
            })
        },
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

