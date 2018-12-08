
const initalState = {
    index:{
        name: 'zhujiang'
    },
    message: '',
    rooms: [],
    modalOptions:{
        addRooms: '',
        addDevices: []
    },
    roomVisible: false,
    bedVisible: false,
    deviceVisible: false,
    singleRooms: [],
    firstCascaderData: [],
    secondCascaderData: [],
    devicesAvaInfo: [],
    sickRoomForSelect: []
}
export const bedSet = (state = initalState, action) => {
    switch (action.type) {
        case 'save_sick_rooms_for_select':
            return{
                ...state,
                sickRoomForSelect: action.payload.data,
            }
        case 'devices_ava_info': 
            return{
                ...state,
                devicesAvaInfo: action.payload
            }
        case 'first_sick_room_data': 
            return{
                ...state,
                firstCascaderData: action.payload
            }
        case 'second_sick_room_data': 
            return{
                ...state,
                secondCascaderData: action.payload
            }
        case 'save_rooms_info_to_store': 
            return{
                ...state,
                singleRooms: action.payload.data
            }
        case 'show_hide_opt': 
            return{
                ...state,
                ...action.payload.data
            }
        case 'form_to_store': 
            return{
                ...state,
                modalOptions: {
                    ...state.modalOptions,
                    ...action.payload
                }
            }
        case 'save_sn_to_store': 
            return{
                ...state,
                rooms: action.payload.data
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