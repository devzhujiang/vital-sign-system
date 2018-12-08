import _ from 'lodash'
// import MqttServices from './mqttServices'
//连接mqtt服务
// MqttServices()

//修改对象键名
export const modifyObjKey = (obj, namesMap) => {
    return _.transform(obj, function (result, value, key) {
        result[namesMap[key] || key] = value;
    })
}
//获取location对象的hash路径
export function hashPathname(hash) {
    return hash ? hash.split('?')[0].slice(1) : window.location.hash.split('?')[0].slice(1)
}

// 发布订阅模式
export const eventProxy = {
    onObj: {},
    oneObj: {},
    on: function (key, fn) {
        if (this.onObj[key] === undefined) {
            this.onObj[key] = [];
        }
        this.onObj[key].push(fn);
    },
    one: function (key, fn) {
        if (this.oneObj[key] === undefined) {
            this.oneObj[key] = [];
        }
        this.oneObj[key].push(fn);
    },
    off: function (key) {
        this.onObj[key] = [];
        this.oneObj[key] = [];
    },
    trigger: function () {
        var key, args;
        if (arguments.length === 0) {
            return false;
        }
        key = arguments[0];
        args = [].concat(Array.prototype.slice.call(arguments, 1));
        if (this.onObj[key] !== undefined
            && this.onObj[key].length > 0) {
            for (var i in this.onObj[key]) {
                this.onObj[key][i].apply(null, args);
            }
        }
        if (this.oneObj[key] !== undefined
            && this.oneObj[key].length > 0) {
            for (let i in this.oneObj[key]) {
                this.oneObj[key][i].apply(null, args);
                this.oneObj[key][i] = undefined;
            }
            this.oneObj[key] = [];
        }
    }
}

