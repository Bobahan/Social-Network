import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../API/API";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL';

let initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
    captcha: null // if null captcha is not required
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}

export const setUserDataActionCreator = (email, id, login, isAuth) => ({ type: SET_USER_DATA, data: { email, id, login, isAuth } })
export const getCapchaURLSuccess = (captcha) => ({ type: GET_CAPTCHA_URL, data: { captcha } })

export const authentication = () => async (dispatch) => {
    const response = await authAPI.authMe()
    if (response.data.resultCode === 0) {
        const { email, id, login } = response.data.data
        dispatch(setUserDataActionCreator(email, id, login, true))
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(authentication())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCapchaURL())
        }
        const errorResponse = response.data.messages.length > 0 ? response.data.messages[0] : ''
        dispatch(stopSubmit('login', { _error: errorResponse }))
    }
}

export const logout = () => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setUserDataActionCreator(null, null, null, false))
    }
}

export const getCapchaURL = () => async (dispatch) => {
    const response = await securityAPI.getCapcha()
    const captchaURL = response.data.url
    dispatch(getCapchaURLSuccess(captchaURL))
}