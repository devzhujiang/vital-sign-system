function getApiAddr() {
    switch (process.env.REACT_APP_API_ENV) {
        case 'local:dev':
            return `http://116.62.225.149:8090/tival-api`
        case 'local:prod':
            return `http://116.62.225.149:8090/tival-api`
        default:
            return `http://116.62.225.149:8090/tival-api`
    }
}
export const commonApi = getApiAddr();