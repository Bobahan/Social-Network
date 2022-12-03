import { AppStateType, DispatchActionType, InferActionsType, ThunkType } from './redux-store';
import { stopSubmit } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';
import { securityAPI } from '../API/security-api';
import { authAPI } from '../API/auth-api';
import { ResultCodesEnum, ResultCodesForCaptchaEnum } from '../API/API';

let initialState = {
    email: null as string | null,
    id: null as number | null,
    login: null as string | null,
    isAuth: false,
    captcha: null as string | null
}
type InitialStateType = typeof initialState

export const actionsAuth = {
    setUserDataActionCreator: (email: string | null, id: number | null, login: string | null, isAuth: boolean) => ({ type: 'SET_USER_DATA', payload: { email, id, login, isAuth } } as const),
    getCapchaURLSuccess: (captcha: string) => ({ type: 'GET_CAPTCHA_URL', payload: { captcha } } as const)
}
type ActionTypes = InferActionsType<typeof actionsAuth>

export const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }
        case 'GET_CAPTCHA_URL':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const authentication = (): ThunkType<ActionTypes> => async (dispatch: DispatchActionType<ActionTypes>) => {
    const response = await authAPI.authMe()
    if (response.resultCode === ResultCodesEnum.Success) {
        const { email, id, login } = response.data
        dispatch(actionsAuth.setUserDataActionCreator(email, id, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType<ActionTypes | ReturnType<typeof stopSubmit>> => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(authentication())
    } else {
        if (response.resultCode === ResultCodesForCaptchaEnum.CaptchaIsRequied) {
            dispatch(getCapchaURL())
        }
        const errorResponse = response.messages.length > 0 ? response.messages[0] : ''
        dispatch(stopSubmit('login', { _error: errorResponse }))
    }
}

export const logout = (): ThunkType<ActionTypes> => async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actionsAuth.setUserDataActionCreator(null, null, null, false))
    }
}

export const getCapchaURL = () => async (dispatch: any) => {
    const response = await securityAPI.getCapcha()
    const captchaURL = response.url
    dispatch(actionsAuth.getCapchaURLSuccess(captchaURL))
}