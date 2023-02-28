import { chatReducer } from './chat-reducer';
import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { authReducer } from './auth-reducer';
import { profileReducer } from './profile-reducer';
import { usersReducer } from './users-reducer';
import ThunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { appReducer } from './app-reducer';

let rootReducer = combineReducers({
  profilePage: profileReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  chat: chatReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U }
  ? U
  : never;

export type ThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;

export type DispatchType = ThunkDispatch<AppStateType, any, Action>; // dispatch(thunk creators)

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ThunkMiddleware)));

// @ts-ignore
window.store = store;

export default store;
