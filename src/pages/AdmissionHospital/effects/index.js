import { takeEvery, call, put, select } from 'redux-saga/effects';
import requestServices from '../../../services/index'
import { notification } from 'antd'
//获取预警方案
function * GetWaringPlansLists(){
    const data = yield call(requestServices.fetch,{
        resource: '/api/vital/t-vital-warning-plan/plans',
        params:{
            deptId: sessionStorage.getItem('deptId')
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === "0"){
        yield put({
            type: 'save_warning_plans_list',
            payload: {
                plans: data.data.plans
            }
        })
    }else{
        notification.warning({
            message: data.msg
        })
    }
}
function * EnterHospitalServices(argus){
    const data = yield call(requestServices.create,{
        resource: '/api/vital/t-vital-hospitalized/checkin',
        json: {
            bedId: argus.payload.room_bed_id[1],
            gender: argus.payload.gender,
            hospitalNumber: argus.payload.hospitalNumber,
            idNumber: argus.payload.idNumber,
            name: argus.payload.name,
            phone: argus.payload.phone,
            planId: argus.payload.planId,
            roomId: argus.payload.room_bed_id[0],
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    console.log(data)
    if(data && data.code === '0'){
        notification.success({
            message: '病人入院成功！'
        })
        yield put({
            type: 'enter_hospital_modal',
            payload:{
                flag:{
                    enterHospital: false
                }
            }
        })
    }else{
        notification.warning({
            message: data.msg
        })
    }
}

function * LeaveHospitalServices(argus){
    console.log(argus)
    const data = yield call(requestServices.create,{
        resource: '/api/vital/t-vital-hospitalized/searchhos',
        data: {
            deptId: sessionStorage.getItem('deptId'),
            key: argus.payload.sick.name
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        yield put({
            type: 'leave_people_info_to_store',
            payload:{
                info: data.data.results.length > 0 ? data.data.results[0] : []
            }
        })
    }else{
        notification.warning({
            message: data.msg
        })
    }
}
function * LeaveSickServices(){
    const leave_people_info = yield select((state) => state.admissionHospital.leave_people_info)
    const data = yield call(requestServices.fetch,{
        resource: '/api/vital/t-vital-hospitalized/checkout',
        params: {
            hosId: leave_people_info.id
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        notification.success({
            message: '病人出院成功！'
        })
        yield put({
            type: 'leave_people_info_to_store',
            payload:{
                info: []
            }
        })
        yield put({
            type: 'enter_hospital_modal',
            payload:{
                flag:{
                    leaveHospital: false
                }
            }
        })
    }else{
        notification.warning({
            message: data.msg
        })
    }
}

export function* admissionHospital() {
    yield takeEvery('get_waring_plans_list', GetWaringPlansLists)
    yield takeEvery('enter_hospital_services', EnterHospitalServices)
    yield takeEvery('sick_people_leave_hospital', LeaveHospitalServices)
    yield takeEvery('sick_people_leave_services', LeaveSickServices)
}
