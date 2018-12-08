const initalState = {
    index:{
        name: 'zhujiang'
    },
    message: '',
    visible: {},
    planDetails: {},
    tongjiInfo:{}
}
export const homePage = (state = initalState, action) => {
    switch (action.type) {
        case 'change_radio_input': 
            return{
                ...state,
            }
        case 'save_index_tongji_info': 
            return{
                ...state,
                tongjiInfo: action.payload.data
            }
        case 'save_modal_warning_details': 
            return{
                ...state,
                planDetails: action.payload.data
            }
        case 'open_warning_plan_modal': 
            return{
                ...state,
                visible: {
                    [action.payload.id]: true
                }
            }
        case 'close_warning_plan_modal': 
            return{
                ...state,
                visible: {
                    [action.payload.id]: false
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