const initalState = {
    index:{
        name: 'zhujiang'
    },
    message: '',
    visible: false,
    planDetails: {}
}
export const visualCharts = (state = initalState, action) => {
    switch (action.type) {
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