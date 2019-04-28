import { takeEvery, call, put } from 'redux-saga/effects';
import requestServices from '../../../services/index'
import createHistory from 'history/createHashHistory'
import { notification } from 'antd'
import { navList } from '../const/index'
import __ from 'lodash'
const history = createHistory()
//登录成功后全局获取科室信息
export function* getDepartmentServices() {
    const data = yield call(requestServices.fetch,{
        resource: '/api/vital/t-vital-department/depts',
        headers:{
            token: sessionStorage.token
        }
    })
    if(data && data.code === '0'){
        navList.unshift({
            key: '/index',
            // title: '导航1',
            title: data.data.depts[0].departmentName,
            url: '/index',
            icon: 'icon-keshix1',
            selectIcon: 'right',
        })
        yield put({
            type: 'save_department_info',
            payload: {
                departmentInfo: data.data.depts[0],
                navList: navList
            }
        })
        sessionStorage.setItem('deptId', data.data.depts[0].id)
        // sessionStorage.setItem('deptName', data.data.depts[0].departmentName)
    }else{
        notification.error({
            message: '系统错误'
        })
    }
    //获取所有的住院中的病人信息
    const paitentsData = yield call(requestServices.fetch,{
        resource: '/api/vital/t-vital-hospitalized/findAllHospitalInformation',
        params:{
            deptId: sessionStorage.getItem('deptId')
        },
        headers:{
            token: sessionStorage.token
        }
    })
    if(paitentsData && paitentsData.code === '0'){
        yield put({
            type: 'global_paitents_lists',
            payload:{
                data: paitentsData.data.list
            }
        })
    }else{
        notification.error({
            message: '系统错误'
        })
    }
}

export function* loginOutServices() {
    yield history.push('/login')
    const data = yield call(requestServices.fetch,{
        resource: '/api/vital/t-vital-user/signout',
        headers:{
            token: sessionStorage.token
        }
    })
    if(data && data.code === '0'){
        sessionStorage.removeItem('token')
        yield history.push('/login')
        window.location.reload()
    }else{
        window.location.reload()
        notification.warning({
            message: '退出登录失败'
        })
    }
}

//登录成功根据科室ID获取科室床位信息，建立MQTT连接
export function* getDeptExceptInfoServices(argus) {
    const data = yield call(requestServices.fetch,{
        resource: '/api/vital/t-vital-department/deptinfo',
        params:{
            id: sessionStorage.getItem('deptId')
        },
        headers:{
            token: sessionStorage.token
        }
    })
    if(data && data.code === '0'){
        // let _data = window.store.getState().main.indexCardInfo
        // console.log(_data)
        yield put({
            type: 'save_index_card_info',
            payload:{
                data: data.data.hoses
            }
        })
        if(argus.payload.reOpenMqtt){
            //拿到设备信息，建立MQTT连接
            let client = null
            client = new window.Paho.MQTT.Client('wss.24hfocus.com', 443, '/mqtt', `mqttjs_${__.random(99999999,1000000000)}`);
            // client = new window.Paho.MQTT.Client('106.14.150.252', 8083, '/mqtt', `mqttjs_${__.random(99999999,1000000000)}`);
            client.onConnectionLost = (responseObject) =>{
                console.log(responseObject)
                // notification.warning({
                //     message: '连接错误',
                //     description: responseObject.errorMessage
                // })
            }
            client.onMessageArrived = (message) =>{
                // console.log(message)
                let mqttMessageToJson = JSON.parse(message.payloadString)
                // console.log(mqttMessageToJson)
                if(mqttMessageToJson.type === 1){
                    //病人MQTT信息
                    let _data = window.store.getState().main.indexCardInfo
                    __.map(_data, (item) =>{
                        if(item.device && item.device.deviceSn === mqttMessageToJson.data.deviceID){
                            item.device = Object.assign({}, item.device, mqttMessageToJson.data)
                        }
                    })
                    window.store.dispatch({
                        type: 'save_index_card_info',
                        payload:{
                            data: _data
                        }
                    })
                }else if(mqttMessageToJson.type === 2){
                    //预警消息MQTT
                    let _warningMsgArr = window.store.getState().main.warningMqttMsg
                    _warningMsgArr.unshift(mqttMessageToJson.data)
                    window.store.dispatch({
                        type: 'save_warning_msg_mqtt_info',
                        payload:{
                            data: _warningMsgArr
                        }
                    })
                }else{
                    console.log('暂无此topic消息')
                }
            }
            
            client.connect({
                userName: 'receiver',
                password: 'recv4R&^#2',
                useSSL: true,
                onSuccess: () =>{
                    console.log("已建立连接");
                    client.subscribe("+/sign_data");
                    client.subscribe(`${sessionStorage.getItem('deptId')}/warning_msg`);
                    client.subscribe(`${sessionStorage.getItem('deptId')}/hint_msg`);
                },
                onFailure: (err) =>{
                    notification.warning({
                        message: '连接错误',
                        description: err.errorMessage
                    })
                }
            })
        }
    }
}
//全局搜索病人信息
function * SearchSickPeopleInfo(argus){
    const data = yield call(requestServices.create,{
        resource: '/api/vital/t-vital-hospitalized/searchhos',
        data: {
            deptId: sessionStorage.getItem('deptId'),
            key: argus.payload.value
        },
        headers:{
            authorization: sessionStorage.getItem('token')
        }
    })
    if(data && data.code === '0'){
        yield put({
            type: 'sick_people_info_main',
            payload:{
                data: data.data.results
            }
        })
        if(argus.payload.location.pathname !== '/searchPaitents'){
            yield history.push('/searchPaitents')
        }
    }else{
        notification.warning({
            message: '请重新搜索'
        })
    }
}
export function* main() {
    yield takeEvery('get_department_services', getDepartmentServices)
    yield takeEvery('login_out_services', loginOutServices)
    yield takeEvery('get_dept_except_info_serveces', getDeptExceptInfoServices)
    yield takeEvery('main_search_paitents', SearchSickPeopleInfo)
}
