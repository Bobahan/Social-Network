import { stopSubmit } from "redux-form";
import { authAPI } from "../API/API"

const SET_USER_DATA = 'SET_USER_DATA';
let initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}

export const setUserDataActionCreator = (email, id, login, isAuth) => ({ type: SET_USER_DATA, data: { email, id, login, isAuth } })

export const authThunkCreator = () => (dispatch) => {
    authAPI.authMe()
        .then(response => {
            if (response.data.resultCode === 0) {
                let { email, id, login } = response.data.data
                dispatch(setUserDataActionCreator(email, id, login, true))
            }
        })
}

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(authThunkCreator())
            } else {
                let errorResponse = response.data.messages.length > 0 ? response.data.messages[0] : ''
                dispatch(stopSubmit('login', { _error: errorResponse }))
            }
        })
}

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserDataActionCreator(null, null, null, false))
            }
        })
}