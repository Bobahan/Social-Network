import { chatReducer } from './chat-reducer';
import { Action, applyMiddleware, combineReducers, compose, createStore, Dispatch } from "redux";
import { authReducer } from "./auth-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { profileReducer } from "./profile-reducer";
import { usersReducer } from "./users-reducer";
import ThunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import { appReducer } from './app-reducer';

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type ThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A> // типизация санки, где она возвращает асинхронную функцию в виде Промиса

export type DispatchType = ThunkDispatch<AppStateType, any, Action> // dispatch(санк креэйторов)

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ThunkMiddleware)))

// @ts-ignore
window.store = store

export default store