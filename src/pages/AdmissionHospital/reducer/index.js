const initalState = {
    index:{
        name: 'zhujiang'
    },
    message: '',
    enterHospital: false,
    leaveHospital: false,
    warningPlans: [],
    leave_people_info:[],
    dataTable: [],
    pagination:{
        current: 1,
        pageSize: 10,
        total: undefined
    },
    loading: false,
    sorter:{
        columnKey: 'hospitalStay',
        field: 'hospitalStay',
        order: 'descend'
    },
}
export const admissionHospital = (state = initalState, action) => {
    switch (action.type) {
        case 'modify_sort_table': 
            return{
                ...state,
                sorter: action.payload
            }
        case 'save_data_table_hospital_info': 
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
        case 'loading_data_table': 
            return{
                ...state,
                loading: action.payload
            }
        case 'leave_people_info_to_store': 
            return{
                ...state,
                leave_people_info: action.payload.info
            }
        case 'save_warning_plans_list': 
            return{
                ...state,
                warningPlans: action.payload.plans
            }
        case 'enter_hospital_modal': 
            return{
                ...state,
                ...action.payload.flag
            }
        case 'set_message': 
            return{
                ...state,
                message: action.payload.message
            }
        default:
            return state
    }
}