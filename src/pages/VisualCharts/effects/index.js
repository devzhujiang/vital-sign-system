import { takeEvery, call, put } from 'redux-saga/effects';
import requestServices from '../../../services/index'
import { notification } from 'antd'
//根据住院id获取住院详情
function * GetHospitalInfoServices(argus){
    const data = yield call(requestServices.fetch,{
        resource: '/api/vital/t-vital-hospitalized/getHosById',
        params:{
            id: argus.payload.hospitalId
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        console.log(data)
        yield put({
            type: 'save_hospital_info_to_store',
            payload:{
                data: data.data
            }
        })
    }
}
//根据id获取预警详情
function * GetChartsFormDetails(argus){
    const data = yield call(requestServices.fetch,{
        resource: '/api/vital/t-vital-warning-plan/findPlanById',
        params:{
            id: argus.payload.id
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        yield put({
            type: 'save_charts_modal_form_details',
            payload:{
                data: data.data
            }
        })
    }
}
//可视化详情弹窗修改预警方案
function * ModifyChartsPlanDetails(argus){
    const data = yield call(requestServices.create,{
        resource: '/api/vital/t-vital-warning-plan/updatePlan',
        json: argus.payload.plan,
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        notification.success({
            message: '修改成功'
        })
        yield put({
            type: 'open_charts_form_modal',
            payload: false
        })
    }
}
//关注以及取消关注病人
function * IsFocusPaitentServices(argus){
    const data = yield call(requestServices.fetch,{
        resource: '/api/vital/t-vital-hospitalized/attend',
        params:{
            id: argus.payload.id
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        notification.success({
            message: '操作成功'
        })
        yield put({
            type: 'get_dept_except_info_serveces',
            payload: {
                reOpenMqtt: false
            }
        })
    }
}
//呼吸
function * breathDataServices(argus){
    const data = yield call(requestServices.fetch,{
        resource: '/userreport/breath',
        params:{
            patientId: argus.payload.query.id,
            type: 0,
            // startTimeStr: argus.payload.id,
            // endTimeStr: argus.payload.id,
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        yield put({
            type: 'save_breath_data',
            payload:{
                data: data.data
            }
        })
    }
}
//心率
function * heartDataServices(argus){
    const data = yield call(requestServices.fetch,{
        resource: '/userreport/heart',
        params:{
            patientId: argus.payload.query.id,
            type: 0,
            // startTimeStr: argus.payload.id,
            // endTimeStr: argus.payload.id,
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        yield put({
            type: 'save_heart_data',
            payload:{
                data: data.data
            }
        })
    }
}
//在离床
function * leaveBedDataServices(argus){
    const data = yield call(requestServices.fetch,{
        resource: '/userreport/livebed',
        params:{
            patientId: argus.payload.query.id,
            type: 0,
            // startTimeStr: argus.payload.id,
            // endTimeStr: argus.payload.id,
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        // console.log(data)
    }
}
//体动
function * bodyMoveDataServices(argus){
    const data = yield call(requestServices.fetch,{
        resource: '/userreport/bodymotion',
        params:{
            patientId: argus.payload.query.id,
            type: 0,
            // startTimeStr: argus.payload.id,
            // endTimeStr: argus.payload.id,
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        yield put({
            type: 'save_body_move_data',
            payload:{
                data: data.data
            }
        })
    }
}
//护理巡查
function * inspectDataServices(argus){
    const data = yield call(requestServices.fetch,{
        resource: '/userreport/inspect',
        params:{
            patientId: argus.payload.query.id,
            type: 0,
            // startTimeStr: argus.payload.id,
            // endTimeStr: argus.payload.id,
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        yield put({
            type: 'save_inspect_data',
            payload:{
                data: data.data
            }
        })
    }
}
export function* visualCharts() {
    yield takeEvery('get_charts_form_details', GetChartsFormDetails)
    yield takeEvery('modify_charts_plan_services', ModifyChartsPlanDetails)
    yield takeEvery('is_focus_paitents_services', IsFocusPaitentServices)
    yield takeEvery('breath_data_services', breathDataServices)
    yield takeEvery('heart_data_services', heartDataServices)
    yield takeEvery('leave_bed_data_services', leaveBedDataServices)
    yield takeEvery('body_move_data_services', bodyMoveDataServices)
    yield takeEvery('inspect_data_services', inspectDataServices)
    yield takeEvery('get_hospital_info_services', GetHospitalInfoServices)
}
