import { takeEvery, call, put } from 'redux-saga/effects';
import requestServices from '../../../services/index'
import { notification } from 'antd'
function * GetWarningDetailsServices(argus){
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
            type: 'save_plan_details',
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
//修改预警方案
function * ModifyWaringPlanServices(argus){
    const data = yield call(requestServices.create,{
        resource: '/api/vital/t-vital-warning-plan/updatePlan',
        json: argus.payload.plan,
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    console.log(data)
    if(data && data.code === '0'){
        yield put({
            type: 'get_warning_details_services',
            payload:{
                itemId: argus.payload.plan.id
            }
        })
        yield put({
            type: 'set_show_hide_form_details',
            payload:{
                falg: false
            }
        })
    }else{
        notification.error({
            message: '系统错误'
        })
    }
}
export function* warningDetails() {
    yield takeEvery('get_warning_details_services', GetWarningDetailsServices)
    yield takeEvery('modify_waring_plan_services', ModifyWaringPlanServices)
}
