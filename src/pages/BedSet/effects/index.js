import { takeEvery, call, put } from 'redux-saga/effects';
import requestServices from '../../../services/index'
import { notification } from 'antd'
import __ from 'lodash'
function * GetDepartmentSickRoomServices(){
    //获取科室病房信息
    const data = yield call(requestServices.fetch,{
        resource: '/api/vital/t-vital-sickroom/findByDeptId',
        params:{
            deptId: sessionStorage.getItem('deptId')
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        const firstOptions = __.map(data.data.rooms, (item, index) =>{
            return{
                value: item.id,
                label: item.sn,
                isLeaf: false
            }
        })
        yield put({
            type: 'save_sick_rooms_for_select',
            payload:{
                data: firstOptions,
            }
        })
        yield put({
            type: 'save_rooms_info_to_store',
            payload:{
                data: data.data.rooms,
            }
        })
    }else{
        notification.error({
            message: '系统错误'
        })
    }
}

function * GetDepartmentBedsServices(){
    //获取科室床位信息
    const data = yield call(requestServices.fetch,{
        resource: '/api/vital/t-vital-department/deptbeds',
        params:{
            id: sessionStorage.getItem('deptId')
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        yield put({
            type: 'save_sn_to_store',
            payload:{
                data: data.data.rooms
            }
        })
    }else{
        notification.error({
            message: '系统错误'
        })
    }
}

//添加病房
function * AddDepartmentRoomsServices(argus){
    const data = yield call(requestServices.create,{
        resource: '/api/vital/t-vital-sickroom/addroom',
        data:{
            deptId: sessionStorage.getItem('deptId'),
            roomsn: argus.payload.values,
            sortno: parseInt(Math.random()*(10000+1),10)
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        notification.success({
            message: '添加病房成功'
        })
        yield put({
            type: 'show_hide_opt',
            payload:{
                data:{
                    roomVisible: false
                }
            }
        })
        yield put({
            type: 'get_department_beds_services'
        })
        yield put({
            type: 'get_depart_sick_room_for_select'
        })
    }else{
        notification.error({
            message: '系统错误'
        })
    }
}

//添加病床
function * AddDepartmentBedssServices(argus){
    const data = yield call(requestServices.create,{
        resource: '/api/vital/t-vital-sickbed/addbed',
        data: {
            ...argus.payload
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    console.log(data)
    if(data && data.code === '0'){
        notification.success({
            message: '添加病床成功'
        })
        yield put({
            type: 'show_hide_opt',
            payload:{
                data:{
                    bedVisible: false
                }
            }
        })
        yield put({
            type: 'get_department_beds_services'
        })
        
    }else{
        notification.error({
            message: '系统错误'
        })
    }
}

//获取科室下面的所有有效病房信息
function * GetDepartmentInfosServices(){
    //获取可添加的设备
    const devicesData = yield call(requestServices.fetch,{
        resource: '/api/vital/t-vital-device/devices',
        params:{
            departmentId: sessionStorage.getItem('deptId'),
            sickbedId: 0
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(devicesData && devicesData.code === '0'){
        yield put({
            type: 'devices_ava_info',
            payload: devicesData.data.devices
        })
        
    }else{
        notification.error({
            message: '系统错误'
        })
    }
}
//换床
function * ExchangeDepartmentBedssServices(argus){
    const data = yield call(requestServices.create,{
        resource: '/api/vital/t-vital-sickbed/bedChange',
        data: {
            ...argus.payload
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        notification.success({
            message: '换床成功'
        })
        yield put({
            type: 'get_department_beds_services'
        })
    }else{
        notification.error({
            message: '系统错误'
        })
    }
}
//添加设备
function * AddDevicesToBeds(argus){
    const data = yield call(requestServices.create,{
        resource: '/api/vital/t-vital-sickbed/bindDevice',
        data: {
            ...argus.payload
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        notification.success({
            message: '设备添加成功'
        })
        yield put({
            type: 'get_dept_except_info_serveces',
            payload: {
                reOpenMqtt: true
            }
        })
        yield put({
            type: 'show_hide_opt',
            payload:{
                data:{
                    deviceVisible: false
                }
            }
        })
    }else{
        notification.warning({
            message: '系统异常'
        })
    }
}
export function* bedSet() {
    yield takeEvery('get_department_beds_services', GetDepartmentBedsServices)
    yield takeEvery('add_department_rooms_services', AddDepartmentRoomsServices)
    yield takeEvery('add_department_beds_services', AddDepartmentBedssServices)
    yield takeEvery('get_department_info_services', GetDepartmentInfosServices)
    yield takeEvery('exchange_sick_bed', ExchangeDepartmentBedssServices)
    yield takeEvery('add_devices_to_beds', AddDevicesToBeds)
    yield takeEvery('get_depart_sick_room_for_select', GetDepartmentSickRoomServices)
}
