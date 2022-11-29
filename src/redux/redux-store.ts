import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducer } from "./auth-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { profileReducer } from "./profile-reducer";
import { usersReducer } from "./users-reducer";
import ThunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import { appReducer } from './app-reducer';

// в rootReducer сидит большой state со своими подчастями
// ключи - это ветки большого state'а

let rootReducer = combineReducers({
    profilePage: profileReducer, 
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ThunkMiddleware)))

export default store