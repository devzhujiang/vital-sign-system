import { takeEvery, call, put } from 'redux-saga/effects';
import requestServices from '../../../services/index'
import { notification } from 'antd'
//获取科室下所有可用的监测方案
function * GetWarningInfoServices(){
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
            type: 'save_warning_info',
            payload: {
                plans: data.data.plans
            }
        })
    }else{
        notification.warning({
            message: '系统错误'
        })
    }
}
function * AddWaringPlanServices(argus){
    const data = yield call(requestServices.create,{
        resource: '/api/vital/t-vital-warning-plan/addplan',
        json: argus.payload.plan,
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === "0"){
        notification.success({
            message: '添加方案成功'
        })
        yield put({
            type: 'reset_warning_state'
        })
        yield put({
            type: 'get_warning_info_services'
        })
    }else{
        notification.warning({
            message: '系统错误'
        })
    }
}
function * GetWarningDetailsByIdServices(argus){
    const data = yield call(requestServices.fetch,{
        resource: '/api/vital/t-vital-warning-plan/findPlanById',
        params:{
            id: argus.payload.itemId
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    console.log(data)
    if(data && data.code === '0'){
        yield put({
            type: 'save_warning_details_by_id_services',
            payload: {
                data: data.data
            }
        })
        yield put({
            type: 'clean_loading_warning'
        })
    }else{
        notification.error({
            message: '系统错误'
        })
    }
}
//修改预警方案
function * ModifyWaringPlanServices(argus){
    const data = yield call(requestServices.create,{
        resource: '/api/vital/t-vital-warning-plan/updatePlan',
        json: argus.payload.plan,
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        yield put({
            type: 'hide_modify_form_effects',
            payload:{
                flag: false
            }
        })
        yield put({
            type: 'get_warning_info_services'
        })
        yield put({
            type: 'clean_loading_warning_true'
        })
        yield put({
            type: 'hide_modify_form'
        })
    }else{
        notification.error({
            message: '系统错误'
        })
    }
}
export function* warningSet() {
    yield takeEvery('get_warning_info_services', GetWarningInfoServices)
    yield takeEvery('add_waring_plan_services', AddWaringPlanServices)
    yield takeEvery('get_warning_details_by_id_services', GetWarningDetailsByIdServices)
    yield takeEvery('modify_waring_plan_services', ModifyWaringPlanServices)
}
