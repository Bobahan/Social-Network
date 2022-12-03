import { InferActionsType } from "./redux-store"

type DialogsType = {
    id: number,
    dialog: string
}

let initialState = {
    dialogs: [
        { id: 1, dialog: 'Vladimir' },
        { id: 2, dialog: 'Alex' },
        { id: 3, dialog: 'Andrey' },
    ] as Array<DialogsType>,
    messages: [
        { id: 1, message: 'I wanna be a best software engineer' },
        { id: 2, message: 'I think that is the good idea' },
    ] as Array<{ id: number, message: string }>,
}
type initialStateType = typeof initialState

export const actionsDialogs = {
    addMessage: (message: string) => ({ type: 'ADD_MESSAGE', message })
}
type ActionsType = InferActionsType<typeof actionsDialogs>

export const dialogsReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, { id: 3, message: action.message }],
            }
        default:
            return state
    }
}

