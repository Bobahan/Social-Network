import { InferActionsType } from './redux-store';
import { authentication } from "./auth-reducer";

let initialState = {
    initialized: false,
}
type InitialStateType = typeof initialState

export const actionsApp = {
    initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' } as const)
}
type ActionTypes = InferActionsType<typeof actionsApp>

export const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(authentication())
    Promise.all([promise])
        .then(() => {
            dispatch(actionsApp.initializedSuccess())
        })
}