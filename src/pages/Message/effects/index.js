import { takeEvery, call, put, select } from 'redux-saga/effects';
import requestServices from '../../../services/index'
import { notification } from 'antd'
//分页获取提醒消息
function * GetMessageTypeData(argus){
    yield put({
        type: 'loading_data_message',
        payload: true
    })
    const { pagination } = yield select((state) => state.dataStatistics)
    const post_data = {
        ...pagination,
        ...argus.payload,
    }
    const data = yield call(requestServices.create,{
        resource: '/api/vital/t-vital-warning-msg/msgs',
        json:{
            ...post_data,
            departmentId: sessionStorage.getItem('deptId')
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === "0"){
        yield put({
            type: 'save_message_table_info',
            payload: {
                data: data.data.page
            }
        })
    }else{
        notification.warning({
            message: '系统错误'
        })
    }
    yield put({
        type: 'loading_data_message',
        payload: false
    })
}
//处理消息
function * onBatchProcessMessageServices(argus){
    const data = yield call(requestServices.create,{
        resource: '/api/vital/t-vital-warning-msg/msgProcess',
        json:{
            ids: [argus.payload.id]
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        yield put({
            type: 'get_message_type_data',
            payload: argus.payload.query
        })
        notification.success({
            message: '处理成功'
        })
    }else{
        notification.error({
            message: '系统错误'
        })
    }
}
export function* message() {
    yield takeEvery('get_message_type_data', GetMessageTypeData)
    yield takeEvery('on_batch_process_message_services', onBatchProcessMessageServices)
}
