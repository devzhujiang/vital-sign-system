const initalState = {
    index:{
        name: 'zhujiang'
    },
    plans:[],
    dataTable: [],
    pagination:{
        current: 1,
        pageSize: 1,
        total: undefined
    },
    deptTongjiInfo:{},
    loading: false,
}
export const dataStatistics = (state = initalState, action) => {
    switch (action.type) {
        case 'loading_data_statics': 
            return{
                ...state,
                loading: action.payload
            }
        case 'tongji_to_store': 
            return{
                ...state,
                deptTongjiInfo: action.payload
            }
        case 'save_data_table_info': 
            return{
                ...state,
                dataTable: action.payload.data.records,
                pagination: {
                    ...state.pagination,
                    current: Number(action.payload.data.current),
                    total: action.payload.data.total,
                    pageSize: Number(action.payload.data.size)
                }
            }
        default:
            return state
    }
}