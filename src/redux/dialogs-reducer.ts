import { InferActionsType } from "./redux-store";

let initialState = {
    dialogs: [
        { id: 1, dialog: 'Vladimir' },
        { id: 2, dialog: 'Alex' },
        { id: 3, dialog: 'Andrey' },
    ] as Array<{ id: number, dialog: string }>,
    messages: [
        { id: 1, message: 'I wanna be a best software engineer' },
        { id: 2, message: 'I think that is the good idea' },
    ] as Array<{ id: number, message: string }>,
}

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

export const actionsDialogs = {
    sendMessage: (message: string) => ({ type: 'ADD_MESSAGE', message } as const)
}

export type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actionsDialogs>