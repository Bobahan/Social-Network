const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const CHANGE_PAGE = 'CHANGE_PAGE'

let initialState = {
    users: [],
    totalUsersCount: undefined,
    pageSize: 5,
    currentPage: 1
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (action.userID === u.id) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (action.userID === u.id) {
                        return { ...u, followed: false }
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case CHANGE_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        default:
            return state
    }
}

export const followActionCreator = (userID) => ({ type: FOLLOW, userID })
export const unfollowActionCreator = (userID) => ({ type: UNFOLLOW, userID })
export const setUsersActionCreator = (users) => ({ type: SET_USERS, users })
export const changePageActionCreator = (page) => ({ type: CHANGE_PAGE, currentPage: page })