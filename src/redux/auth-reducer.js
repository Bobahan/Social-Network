import { authAPI } from "../API/API"

const SET_USER_DATA = 'SET_USER_DATA'

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
                isAuth: true
            }
        default:
            return state
    }
}

export const setUserDataActionCreator = (email, id, login) => ({ type: SET_USER_DATA, data: { email, id, login } })

export const authThunkCreator = () => (dispatch) => {
    authAPI.auth()
        .then(response => {
            if (response.resultCode === 0) {
                let { email, id, login } = response.data
                dispatch(setUserDataActionCreator(email, id, login))
            }
        })
}