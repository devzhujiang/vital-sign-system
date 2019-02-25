
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
    sickRoomForSelect: [],
    paitentsFirstData: [],
    paitentsSecondData: [],
    paitentsThirdData: [],
    paitentsFourData: [],
    devicesFirstData: [],
    devicesSecondData: [],
    devicesFourData: [],
    deviceModal: false,
    deviceItem: {},
    bedsList: []
}
export const bedSet = (state = initalState, action) => {
    switch (action.type) {
        case 'close_device_modal': 
            return{
                ...state,
                deviceModal: false
            }
        case 'set_sevice_modal_visible': 
            return{
                ...state,
                deviceModal: true,
                bedsList: action.payload.data.beds
            }
        case 'save_first_data_to_store': 
            return{
                ...state,
                paitentsFirstData: action.payload.data
            }
        case 'save_second_data_to_store': 
            return{
                ...state,
                paitentsSecondData: action.payload.data
            }
        case 'save_third_data_to_store': 
            return{
                ...state,
                paitentsThirdData: action.payload.data
            }
        case 'save_four_data_to_store': 
            return{
                ...state,
                paitentsFourData: action.payload.data
            }
        case 'save_devices_first_data_to_store': 
            return{
                ...state,
                devicesFirstData: action.payload.data
            }
        case 'save_devices_second_data_to_store': 
            return{
                ...state,
                devicesSecondData: action.payload.data
            }
        case 'save_devices_four_data_to_store': 
            return{
                ...state,
                devicesFourData: action.payload.data
            }
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