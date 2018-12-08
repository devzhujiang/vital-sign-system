const initalState = {
    index:{
        name: 'zhujiang'
    },
    plans:[],
    options:{
        formListShow: false
    },
    message: '',
}
export const warningSet = (state = initalState, action) => {
    switch (action.type) {
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