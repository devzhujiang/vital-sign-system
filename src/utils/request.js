import 'whatwg-fetch'
import 'es6-promise/auto'
import qs from 'qs'
import { notification } from 'antd'
// import createHistory from 'history/createHashHistory'
// const history = createHistory()

function parse(response) {
    return response.json()
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300){
        return response
    }
    else{
        throw response
    }
}

function errHandle(response) {
    const {
        status,
    } = response
    switch (status) {
        case 401:
            notification.error({
                message: '登录超时，请重新登录',
                description: `服务器返回错误401`
            })
            // history.push('/login')
            // window.location.reload()
            break;
        case 500:
            notification.error({
                message: '网络异常',
                description: `服务器返回错误 500`
            })
            // history.push('/login')
            // window.location.reload()
            break;
        default:
            response.json ? response.json().then(({ message }) => {
                notification.error({
                    message: '服务器返回错误',
                    description: response.message
                })
            }) : (
                notification.error({
                    message: '未知错误',
                    description: response.toString()
                })
            )
            // history.push('/login')
            // window.location.reload()
            break;
    }
}

export { request }
export default function request(url, options = {}) {
    options.method = options.method || 'GET'
    if (options.params) {
        url = `${url}?${qs.stringify(options.params, { indices: false })}`
    }
    if (options.data) {
        options.body = qs.stringify(options.data)
        options['headers'] = Object.assign(options.headers || {}, {
            "Content-type": "application/x-www-form-urlencoded",
        })
    }
    if (options.json) {
        options.body = JSON.stringify(options.json)
        options['headers'] = Object.assign(options.headers || {}, {
            "Content-type": "application/json",
        })
    }
    // 所有请求带上身份标示
    if(sessionStorage.token){
        options.headers['authorization'] = sessionStorage.token
    }
    return fetch(url, options)
        .then(checkStatus)
        .then(parse)
        .then(pre => pre || {})
        .catch(errHandle)
}

