import { notification } from 'antd'
//MQTT消息服务
let client = null
export default function mqttServices() {
    client = new window.Paho.MQTT.Client('106.14.150.252', 8083, "mqttjs_088fa1e27d");
    client.onConnectionLost = (responseObject) =>{
        console.log(responseObject)
        notification.warning({
            message: '连接错误',
            description: responseObject.errorMessage
        })
    }
    client.onMessageArrived = (message) =>{
        console.log(message.payloadString)
        
        window.store.dispatch({
            type: 'set_message',
            payload:{
                message: Math.random()
            }
        })
    }
    client.connect({
        userName: 'receiver',
        password: 'recv4R&^#2',
        onSuccess: () =>{
            console.log("已建立连接");
            console.log(window.store.getState())
            client.subscribe("+/sign_data");
        },
        onFailure: (err) =>{
            notification.warning({
                message: '连接错误',
                description: err.errorMessage
            })
        }
    })
}