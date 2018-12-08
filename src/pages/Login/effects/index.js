import { takeEvery, call } from 'redux-saga/effects';
import requestServices from '../../../services/index'
import createHistory from 'history/createHashHistory'
import { notification } from 'antd'
const history = createHistory()

export function* loginServices(argus) {
    const data = yield call(requestServices.create,{
        resource: '/api/vital/t-vital-user/login',
        data:{
            username: argus.payload.username,
            password: argus.payload.password
        }
    })
    if(data && data.code === '0'){
        sessionStorage.setItem('token', data.data.token)
        sessionStorage.setItem('hospitalName', data.data.institution.institutionName)
        sessionStorage.setItem('hospitalLogo', data.data.institution.logo)
        yield history.push('/index')
    }else{
        notification.warning({
            message: '用户名或密码错误'
        })
    }
}

export function* login() {
    yield takeEvery('LOGIN_SERVICES', loginServices)
}
