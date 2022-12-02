import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducer } from "./auth-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { profileReducer } from "./profile-reducer";
import { usersReducer } from "./users-reducer";
import ThunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import { appReducer } from './app-reducer';

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

type ACTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsType<T extends { [key: string]: (...arg: any[]) => any }> = ReturnType<ACTypes<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ThunkMiddleware)))

export default store