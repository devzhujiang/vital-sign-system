import { takeEvery, call, put, select } from 'redux-saga/effects';
import requestServices from '../../../services/index'
import { notification } from 'antd'
import moment from 'moment'
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
//顶部时间搜索
function * searchDataStaticServices(argus){
    console.log(argus)
    const { formSearch, tabsKey } = yield select((state) => state.dataStatistics)
    let startTime = ''
    let endTime = ''
    if(JSON.stringify(formSearch) === '{}'){
        startTime = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD 08:00:00')
        endTime = moment(new Date()).format('YYYY-MM-DD 08:00:00')
    }else{
        if(formSearch.username.length === 0){
            startTime = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD 08:00:00')
            endTime = moment(new Date()).format('YYYY-MM-DD 08:00:00')
        }else{
            startTime = moment(formSearch.username[0]).format('YYYY-MM-DD 00:00:00')
            endTime = moment(formSearch.username[1]).format('YYYY-MM-DD 00:00:00')
        }
    }
    const current = argus.payload ? argus.payload.current : 1
    if(tabsKey === '2'){
        const data = yield call(requestServices.create,{
            resource: '/api/vital/t-vital-warning-msg/msgs',
            json:{
                startTime,
                endTime,
                deptId: sessionStorage.getItem('deptId'),
                pageSize: 2,
                current: current,
            },
            headers:{
                authorization: sessionStorage.getItem('token')
            }
        })
        yield put({
            type: 'loading_data_statics',
            payload: false
        })
        if(data && data.code === '0'){
            yield put({
                type: 'setWaringTableData',
                payload: {
                    data: data.data.page
                }
            })
        }else{
            notification.error({
                message: '系统错误'
            })
        }
    }else{
        const data = yield call(requestServices.create,{
            resource: '/api/vital/t-vital-hospitalized/findByPage',
            json:{
                startTime,
                endTime,
                deptId: sessionStorage.getItem('deptId'),
                status: tabsKey,
                pageSize: 10,
                current: current,
                sortCloumn: 'hospital_stay'
            },
            headers:{
                authorization: sessionStorage.getItem('token')
            }
        })
        yield put({
            type: 'loading_data_statics',
            payload: false
        })
        if(data && data.code === '0'){
            if(tabsKey === '1'){
                yield put({
                    type: 'setNewTableData',
                    payload: {
                        data: data.data.page
                    }
                })
            }
            if(tabsKey === '0'){
                yield put({
                    type: 'setLeaveTableData',
                    payload: {
                        data: data.data.page
                    }
                })
            }
            
        }else{
            notification.error({
                message: '系统错误'
            })
        }
    }
    
}
//导出数据
function * exportDataServices(argus){
    const { formSearch, tabsKey } = yield select((state) => state.dataStatistics)
    let startTime = ''
    let endTime = ''
    if(JSON.stringify(formSearch) === '{}'){
        startTime = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD 08:00:00')
        endTime = moment(new Date()).format('YYYY-MM-DD 08:00:00')
    }else{
        if(formSearch.username.length === 0){
            startTime = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD 08:00:00')
            endTime = moment(new Date()).format('YYYY-MM-DD 08:00:00')
        }else{
            startTime = moment(formSearch.username[0]).format('YYYY-MM-DD 00:00:00')
            endTime = moment(formSearch.username[1]).format('YYYY-MM-DD 00:00:00')
        }
    }
    // const current = argus.payload ? argus.payload.current : 1
    if(tabsKey === '2'){
        const data = yield call(requestServices.fetch,{
            resource: '/api/vital/t-vital-warning-msg/exportMsg',
            params:{
                startTime,
                endTime,
                deptId: sessionStorage.getItem('deptId'),
                // pageSize: 2,
                // current: current,
            },
            headers:{
                authorization: sessionStorage.getItem('token')
            }
        })
        console.log(data)
        if(data && data.code === '0'){
            
        }else{
            notification.error({
                message: '系统错误'
            })
        }
    }else{
        const data = yield call(requestServices.fetch,{
            resource: '/api/vital/t-vital-hospitalized/hosExport',
            params:{
                startTime,
                endTime,
                deptId: sessionStorage.getItem('deptId'),
                status: tabsKey,
                // pageSize: 10,
                // current: current,
                sortCloumn: 'hospital_stay'
            },
            headers:{
                authorization: sessionStorage.getItem('token')
            }
        })
        if(data && data.code === '0'){
            console.log(data)
        }else{
            notification.error({
                message: '系统错误'
            })
        }
    }
    
}
export function* dataStatistics() {
    yield takeEvery('get_warning_message_data', GetWarningMessageData)
    yield takeEvery('get_data_statics_data', GetDataStaticsMessage)
    yield takeEvery('batch_process_message_services', BatchProcessMessageServices)
    yield takeEvery('search_data_statics_services', searchDataStaticServices)
    yield takeEvery('export_data_services', exportDataServices)
}
