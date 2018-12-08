let nextTodoId = 0
export const add = () => ({
    type: 'ADD_TODO',
    id: nextTodoId++
})