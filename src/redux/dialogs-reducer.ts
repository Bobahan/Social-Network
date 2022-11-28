const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';

let initialState = {
    dialogs: [
        { id: 1, dialog: 'Vladimir' },
        { id: 2, dialog: 'Alex' },
        { id: 3, dialog: 'Andrey' },
    ] as { id: number, dialog: string }[],
    messages: [
        { id: 1, message: 'I wanna be a best software engineer' },
        { id: 2, message: 'I think that is the good idea' },
    ] as { id: number, message: string }[],
}

export type initialStateType = typeof initialState

export const dialogsReducer = (state = initialState, action: any): initialStateType => {
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

type addMessageType = {
    type: typeof ADD_MESSAGE
    message: string
}

export const addMessage = (message: string): addMessageType => ({ type: ADD_MESSAGE, message })