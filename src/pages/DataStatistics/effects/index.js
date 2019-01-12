import { takeEvery, call, put, select } from 'redux-saga/effects';
import requestServices from '../../../services/index'
import { notification } from 'antd'
//分页获取提醒消息
function * GetWarningMessageData(argus){
    yield put({
        type: 'loading_data_statics',
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
            type: 'save_data_table_info',
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
        type: 'loading_data_statics',
        payload: false
    })
}
//统计数据
function * GetDataStaticsMessage(){
    const tongji = yield call(requestServices.fetch,{
        resource: '/api/vital/t-vital-department/tongji',
        params:{
            id: sessionStorage.getItem('deptId')
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(tongji && tongji.code === '0'){
        yield put({
            type: 'tongji_to_store',
            payload: tongji.data
        })
    }else{
        notification.error({
            message: '系统错误'
        })
    }
}
//处理消息
function * BatchProcessMessageServices(argus){
    const { selectedRowKeys } = yield select((state) => state.dataStatistics)
    let _ids = []
    if(argus.payload.id === 'batch'){
        _ids = selectedRowKeys
        
    }else{
        _ids = [argus.payload.id]
    }
    console.log(_ids)
    const data = yield call(requestServices.create,{
        resource: '/api/vital/t-vital-warning-msg/msgProcess',
        json:{
            ids: _ids
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        yield put({
            type: 'set_btn_usefull',
            payload: true
        })
        yield put({
            type: 'set_select_row_keys',
            payload:{
                selectRowKeys: []
            }
        })
        yield put({
            type: 'get_warning_message_data',
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
export function* dataStatistics() {
    yield takeEvery('get_warning_message_data', GetWarningMessageData)
    yield takeEvery('get_data_statics_data', GetDataStaticsMessage)
    yield takeEvery('batch_process_message_services', BatchProcessMessageServices)
}
