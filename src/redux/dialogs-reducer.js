const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'

let initialState = {
    dialogs: [
        { id: 1, dialog: 'Vladimir' },
        { id: 2, dialog: 'Alex' },
        { id: 3, dialog: 'Andrey' },
    ],
    messages: [
        { id: 1, message: 'I wanna be a best software engineer' },
        { id: 2, message: 'I think that is the good idea' },
    ],
    newMessageText: ''
}

export const dialogsReducer = (state = initialState, action) => {
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