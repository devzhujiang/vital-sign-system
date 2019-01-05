const initalState = {
    index:{
        name: 'zhujiang'
    },
    plans:[],
    options:{
        formListShow: false,
        addModal: false,
        modifyModal: false,
        isShowModifyForm: false,
        planId: ''
    },
    message: '',
    warningDetails: {},
    spinning: true
}
export const warningSet = (state = initalState, action) => {
    switch (action.type) {
        case 'hide_modify_form': 
            return{
                ...state,
                options: {
                    ...state.options,
                    isShowModifyForm: false
                }
            }
        case 'show_modify_form': 
            return{
                ...state,
                options: {
                    ...state.options,
                    isShowModifyForm: true
                }
            }
        case 'clean_loading_warning_true': 
            return{
                ...state,
                spinning: true
            }
        case 'clean_loading_warning': 
            return{
                ...state,
                spinning: false
            }
        case 'save_warning_details_by_id_services': 
            return{
                ...state,
                warningDetails: action.payload.data
            }
        case 'clean_warning_details_by_id_services': 
            return{
                ...state,
                warningDetails: {}
            }
        case 'hide_modify_form_effects': 
            return{
                ...state,
                options: {
                    ...state.options,
                    modifyModal: action.payload.flag,
                }
            }
        case 'open_modify_warning_modal': 
            return{
                ...state,
                options: {
                    ...state.options,
                    modifyModal: action.payload.flag,
                    planId: action.payload.id
                }
            }
        case 'open_add_warning_modal': 
            return{
                ...state,
                options: {
                    ...state.options,
                    addModal: action.payload.flag
                }
            }
        case 'save_warning_info': 
            return{
                ...state,
                plans: action.payload.plans
            }
        case 'set_form_list_show_hide': 
            return{
                ...state,
                options: {
                    ...state.options,
                    formListShow: action.payload.flag
                }
            }
        case 'reset_warning_state': 
            return{
                ...state,
                options: {
                    ...state.options,
                    formListShow: false
                }
            }
        default:
            return state
    }
}