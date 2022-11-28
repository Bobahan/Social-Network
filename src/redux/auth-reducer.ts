import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from "../API/API";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL';

type InitialStateType = {
    email: string | null
    id: number | null
    login: string | null
    isAuth: boolean
    captcha: string | null
}

let initialState: InitialStateType = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
    captcha: null
}

export const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

type SetUserPayloadDataType = {
    email: string | null
    id: number | null
    login: string | null
    isAuth: boolean
}

type SetUserDataActionCreatorType = {
    type: typeof SET_USER_DATA,
    payload: SetUserPayloadDataType
}

export const setUserDataActionCreator = (email: string | null, id: number | null, login: string | null, isAuth: boolean): SetUserDataActionCreatorType => ({ type: SET_USER_DATA, payload: { email, id, login, isAuth } })

type GetCapchaURLSuccessType = {
    type: typeof GET_CAPTCHA_URL,
    payload: { captcha: string }
}

export const getCapchaURLSuccess = (captcha: string): GetCapchaURLSuccessType => ({ type: GET_CAPTCHA_URL, payload: { captcha } })

export const authentication = () => async (dispatch: any) => {
    const response = await authAPI.authMe()
    if (response.data.resultCode === 0) {
        const { email, id, login } = response.data.data
        dispatch(setUserDataActionCreator(email, id, login, true))
    }
}

export const login = (email: string, password: number, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
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

export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setUserDataActionCreator(null, null, null, false))
    }
}

export const getCapchaURL = () => async (dispatch: any) => {
    const response = await securityAPI.getCapcha()
    const captchaURL = response.data.url
    dispatch(getCapchaURLSuccess(captchaURL))
}