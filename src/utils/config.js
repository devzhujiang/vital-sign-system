function getApiAddr() {
    switch (process.env.REACT_APP_API_ENV) {
        case 'local:dev':
            return `https://tivalapi.24hfocus.com/tival-api`
        case 'local:prod':
            return `https://tivalapi.24hfocus.com/tival-api`
        default:
            return `https://tivalapi.24hfocus.com/tival-api`
    }
}
export const commonApi = getApiAddr();