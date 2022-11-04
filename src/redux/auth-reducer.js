const SET_USER_DATA = 'SET_USER_DATA'

let initialState = {
    login: null,
    id: null,
    email: null,
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