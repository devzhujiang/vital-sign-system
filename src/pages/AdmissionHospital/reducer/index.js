const initalState = {
    index:{
        name: 'zhujiang'
    },
    message: '',
    enterHospital: false,
    leaveHospital: false,
    warningPlans: [],
    leave_people_info:[]
}
export const admissionHospital = (state = initalState, action) => {
    switch (action.type) {
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