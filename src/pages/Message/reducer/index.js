const initalState = {
    dataTable: [],
    pagination:{
        current: 1,
        pageSize: 10,
        total: undefined
    },
    loading: false,
}
export const message = (state = initalState, action) => {
    switch (action.type) {
        case 'loading_data_message': 
            return{
                ...state,
                loading: action.payload
            }
        case 'save_message_table_info': 
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