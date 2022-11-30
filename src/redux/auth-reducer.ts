import { AppStateType } from './redux-store';
import { Action, Dispatch } from 'redux';
import { stopSubmit } from 'redux-form';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { authAPI, ResultCodesEnum, ResultCodesForCaptchaEnum, securityAPI } from "../API/API";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL';

let initialState = {
    email: null as string | null,
    id: null as number | null,
    login: null as string | null,
    isAuth: false,
    captcha: null as string | null
}

export type InitialStateType = typeof initialState

type ActionTypes = SetUserDataActionCreatorType | GetCapchaURLSuccessType

export const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
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

type SetUserPayloadDataType = { email: string | null, id: number | null, login: string | null, isAuth: boolean }

type SetUserDataActionCreatorType = { type: typeof SET_USER_DATA, payload: SetUserPayloadDataType }
type GetCapchaURLSuccessType = { type: typeof GET_CAPTCHA_URL, payload: { captcha: string } }

export const setUserDataActionCreator = (email: string | null, id: number | null, login: string | null, isAuth: boolean): SetUserDataActionCreatorType => ({ type: SET_USER_DATA, payload: { email, id, login, isAuth } })
export const getCapchaURLSuccess = (captcha: string): GetCapchaURLSuccessType => ({ type: GET_CAPTCHA_URL, payload: { captcha } })

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
type DispatchActionType = Dispatch<ActionTypes>

// нужно задиспачить thunk
// dispatch: ThunkDispatch<AppStateType, E, ActionTypes>

export const authentication = (): ThunkType => async (dispatch: DispatchActionType) => {
    const response = await authAPI.authMe()
    if (response.resultCode === ResultCodesEnum.Success) {
        const { email, id, login } = response.data
        dispatch(setUserDataActionCreator(email, id, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(authentication())
    } else {
        if (response.resultCode === ResultCodesForCaptchaEnum.CaptchaIsRequied) {
            dispatch(getCapchaURL())
        }
        const errorResponse = response.messages.length > 0 ? response.messages[0] : ''
        // dispatch(stopSubmit('login', { _error: errorResponse }))
    }
}

export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(setUserDataActionCreator(null, null, null, false))
    }
}

export const getCapchaURL = () => async (dispatch: any) => {
    const response = await securityAPI.getCapcha()
    const captchaURL = response.url
    dispatch(getCapchaURLSuccess(captchaURL))
}