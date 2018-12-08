import { takeEvery, call, put } from 'redux-saga/effects';
import requestServices from '../../../services/index'
import { notification } from 'antd'
//关注以及取消关注病人
function * FocusPaitents(argus){
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
    }else{
        notification.error({
            message: '系统错误'
        })
    }
}
//根据id获取预警详情
function * getWarningDetailsById(argus){
    const data = yield call(requestServices.fetch,{
        resource: '/api/vital/t-vital-warning-plan/findPlanById',
        params:{
            id: argus.payload.planId
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        yield put({
            type: 'save_modal_warning_details',
            payload:{
                data: data.data
            }
        })
    }else{
        notification.error({
            message: '系统错误'
        })
    }
}
//首页弹窗修改预警方案
function * ModifyPlanByModalServices(argus){
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
            type: 'close_warning_plan_modal',
            payload:{
                id: argus.payload.plan.id
            }
        })
    }else{
        notification.error({
            message: '系统错误'
        })
    }
}
//首页右侧统计信息
function * GetIndexTongJiInfo(argus){
    const data = yield call(requestServices.fetch,{
        resource: '/api/vital/t-vital-department/tongji',
        params: {
            id: sessionStorage.getItem('deptId')
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        yield put({
            type: 'save_index_tongji_info',
            payload:{
                data: data.data
            }
        })
    }else{
        notification.error({
            message: '系统错误'
        })
    }
}
export function* index() {
    yield takeEvery('focus_paitents_services', FocusPaitents)
    yield takeEvery('get_warning_plan_details_by_id', getWarningDetailsById)
    yield takeEvery('modify_plan_by_modal_services', ModifyPlanByModalServices)
    yield takeEvery('get_index_tongji_info', GetIndexTongJiInfo)
}
