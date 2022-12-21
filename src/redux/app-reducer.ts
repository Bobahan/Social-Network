import { InferActionsType } from './redux-store';
import { authentication } from "./auth-reducer";

let initialState = {
    initialized: false,
}

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
            dispatch(actionsApp.initializeApp())
        })
}

export const actionsApp = {
    initializeApp: () => ({ type: 'INITIALIZED_SUCCESS' } as const)
}

type InitialStateType = typeof initialState
type ActionTypes = InferActionsType<typeof actionsApp>
