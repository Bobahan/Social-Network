const ADD_MESSAGE = 'ADD_MESSAGE';

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
}

export const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { id: 3, message: action.message }],
            }
        default:
            return state
    }
}

export const addMessageActionCreator = (message) => ({ type: ADD_MESSAGE, message })