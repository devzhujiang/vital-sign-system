const initalState = {
    index:{
        name: 'zhujiang'
    },
    message: '',
    planDetails: {},
    options:{
        isShowFormSearch: false
    }
}
export const warningDetails = (state = initalState, action) => {
    switch (action.type) {
        case 'save_plan_details': 
            return{
                ...state,
                planDetails: action.payload.data
            }
        case 'set_show_hide_form_details': 
            return{
                ...state,
                options: {
                    ...state.options,
                    isShowFormSearch: action.payload.flag
                }
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