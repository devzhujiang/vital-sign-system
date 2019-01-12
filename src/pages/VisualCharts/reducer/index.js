const initalState = {
    index:{
        name: 'zhujiang'
    },
    message: '',
    visible: false,
    planDetails: {},
    breathData: {},
    heartData: {},
    bodyMoveData: {},
    inspectData: {},
    hospitalInfo: {}
}
export const visualCharts = (state = initalState, action) => {
    switch (action.type) {
        case 'save_hospital_info_to_store': 
            return{
                ...state,
                hospitalInfo: action.payload.data
            }
        case 'save_breath_data': 
            return{
                ...state,
                breathData: action.payload.data
            }
        case 'save_heart_data': 
            return{
                ...state,
                heartData: action.payload.data
            }
        case 'save_body_move_data': 
            return{
                ...state,
                bodyMoveData: action.payload.data
            }
        case 'save_inspect_data': 
            return{
                ...state,
                inspectData: action.payload.data
            }
        case 'save_charts_modal_form_details': 
            return{
                ...state,
                planDetails: action.payload.data
            }
        case 'open_charts_form_modal': 
            return{
                ...state,
                visible: action.payload
            }
        case 'close_charts_form_modal': 
            return{
                ...state,
                visible: action.payload
            }
        default:
            return state
    }
}