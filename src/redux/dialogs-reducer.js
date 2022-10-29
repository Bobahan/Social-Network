const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'

export const dialogsReducer = (state, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            state.messages.push({ id: 3, message: state.newMessageText })
            state.newMessageText = ''
            return state
        case UPDATE_MESSAGE:
            state.newMessageText = action.message
            return state
        default:
            return state
    }
}

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE })
export const updateMessageActionCreator = (text) => ({ type: UPDATE_MESSAGE, message: text })