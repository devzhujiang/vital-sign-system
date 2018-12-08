import { commonApi } from '../utils/config.js'
import { request } from '../utils/request.js'

export default {
    async change({ headers, address, resource, desc, data, params, json }) {
        return request(address || `${commonApi}${resource}`, {
            method: 'PUT',
            data,
            params,
            json,
            description: desc,
            headers
        })
    },

    async fetch({ headers, address, resource, data, params, json, desc, then }) {
        const promise = request(address || `${commonApi}${resource}`, {
            method: 'GET',
            data,
            params,
            json,
            description: desc,
            headers
        })
        if (then)
            return promise.then(then)

        return promise
    },

    async delete({ headers, address, resource, desc, data, params, json }) {
        return request(address || `${commonApi}${resource}`, {
            method: 'DELETE',
            data,
            description: desc,
            headers
        })
    },

    async create({ headers, address, resource, desc, data, params, json }) {
        return request(address || `${commonApi}${resource}`, {
            method: 'POST',
            data,
            params,
            json,
            description: desc,
            headers
        })
    },
}
