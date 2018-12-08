const initalState = {
    index:{
        name: 'zhujiang'
    },
    sickPeopleInfo:[]
}
export const searchPaitents = (state = initalState, action) => {
    switch (action.type) {
        case 'sick_people_info': 
            return{
                ...state,
                sickPeopleInfo: action.payload.data
            }
        default:
            return state
    }
}