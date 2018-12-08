import __ from 'lodash'
const initalState = {
    selectedKey: '/index',
    subjectInfo:[],
    departmentInfo: {},
    indexCardInfo: [],
    focusPaitents: [],
    noFocusPaitents: [],
    mqttMessage: {},
    navList: [],
    warningMqttMsg:[],
    sickPeopleInfoMain: []
}
export const main = (state = initalState, action) => {
    switch (action.type) {
        case 'sick_people_info_main':
            return {
                ...state,
                sickPeopleInfoMain: action.payload.data
            }
        case 'save_warning_msg_mqtt_info':
            return {
                ...state,
                warningMqttMsg: action.payload.data
            }
        case 'save_index_card_info':
            return {
                ...state,
                indexCardInfo: action.payload.data,
                focusPaitents: __.filter(action.payload.data, ['isAttention', 1]),
                noFocusPaitents: __.filter(action.payload.data, ['isAttention', 0]),
            }
        case 'set_nav_select_ley':
            return {
                ...state,
                selectedKey: action.payload.selectedKey
            }
        case 'set_subject_id_main':
            return {
                ...state,
                subjectInfo: action.payload.subjectInfo
            }
        case 'save_department_info':
            return {
                ...state,
                departmentInfo: action.payload.departmentInfo,
                navList: action.payload.navList,
            }
        default:
            return state
    }
}