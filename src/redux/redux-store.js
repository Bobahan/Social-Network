import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducer } from "./auth-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { profileReducer } from "./profile-reducer";
import { usersReducer } from "./users-reducer";
import ThunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import { appReducer } from './app-reducer'

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(ThunkMiddleware)));

window.store = store
export default store