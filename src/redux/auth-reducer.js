import { authAPI } from "../API/API"

const SET_USER_DATA = 'SET_USER_DATA';
const LOGIN = 'LOGIN';

let initialState = {
    email: null,
    id: null,
    login: null,
    password: null,
    isAuth: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        case LOGIN:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}

export const setUserDataActionCreator = (email, id, login) => ({ type: SET_USER_DATA, data: { email, id, login } })
export const loginActionCreator = (email, password) => ({ type: LOGIN, data: { email, password } })

export const authThunkCreator = () => (dispatch) => {
    authAPI.authMe()
        .then(response => {
            if (response.resultCode === 0) {
                let { email, id, login } = response.data
                dispatch(setUserDataActionCreator(email, id, login))
            }
        })
}

export const loginThunkCreator = (email, password) => (dispatch) => {
    authAPI.loginMe(email, password)
        .then(response => {
            if (response.resultCode === 0) {
                let { email, password } = response.data.data
                dispatch(loginActionCreator(email, password))
            }
        })
}