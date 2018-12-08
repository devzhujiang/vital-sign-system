const initalState = {
    age: 26
}
export const login = (state = initalState, action) => {
    switch (action.type) {
        case 'IS_LOGIN':
            return {
                ...state,
                age: state.age + 1
            }
        default:
            return state
    }
}