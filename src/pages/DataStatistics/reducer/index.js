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
    isUsefull: true,
    formSearch: {},
    tabsKey: '1',
    newEnterHosTable:{
        data: [],
        current: 1,
        pageSize: 2,
        total: undefined,
        loading: true
    },
    leaveHosTable:{
        data: [],
        current: 1,
        pageSize: 2,
        total: undefined,
        loading: true
    },
    warningTable:{
        data: [],
        current: 1,
        pageSize: 10,
        total: undefined,
        loading: true
    },
}
export const dataStatistics = (state = initalState, action) => {
    switch (action.type) {
        case 'hideTableLoading': 
            return{
                ...state,
                leaveHosTable: {
                    ...state.leaveHosTable,
                    data: action.payload.data.records,
                    current: action.payload.data.current,
                    pageSize: action.payload.data.size,
                    total: action.payload.data.total,
                }
            }
        case 'setLeaveTableData': 
            return{
                ...state,
                leaveHosTable: {
                    ...state.leaveHosTable,
                    data: action.payload.data.records,
                    current: action.payload.data.current,
                    pageSize: action.payload.data.size,
                    total: action.payload.data.total,
                }
            }
        case 'setNewTableData': 
            return{
                ...state,
                newEnterHosTable: {
                    ...state.newEnterHosTable,
                    data: action.payload.data.records,
                    current: action.payload.data.current,
                    pageSize: action.payload.data.size,
                    total: action.payload.data.total,
                }
            }
        case 'set_tabs_key': 
            return{
                ...state,
                tabsKey: action.payload
            }
        case 'set_changed_values': 
            return{
                ...state,
                formSearch: action.payload.data
            }
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