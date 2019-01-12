const initalState = {
    index:{
        name: 'zhujiang'
    },
    plans:[],
    dataTable: [],
    pagination:{
        current: 1,
        pageSize: 10,
        total: undefined
    },
    deptTongjiInfo:{},
    loading: false,
    selectedRowKeys: [],
    isUsefull: true
}
export const dataStatistics = (state = initalState, action) => {
    switch (action.type) {
        case 'set_btn_usefull': 
            return{
                ...state,
                isUsefull: action.payload
            }
        case 'set_select_row_keys': 
            return{
                ...state,
                selectedRowKeys: action.payload.selectRowKeys
            }
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