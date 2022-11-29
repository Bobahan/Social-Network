import { PhotosType } from './../types/types';

import { usersAPI } from "../API/API";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS;'
const CHANGE_PAGE = 'users/CHANGE_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const IS_FETCHING = 'IS_FETCHING';
const IS_FOLLOWING = 'IS_FOLLOWING';

type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

let initialState = {
    users: [] as Array<UsersType>,
    totalUsersCount: 0 as number,
    pageSize: 5 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number> // array of users ids
}

type InitialStateType = typeof initialState

export const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => { 
                    if (u.id === action.userID) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return { ...u, followed: false }
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case CHANGE_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case IS_FOLLOWING:
            return {
                ...state,
                followingInProgress: action.isDisabling
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }
        default:
            return state
    }
}

type followSuccessType = {
    type: typeof FOLLOW
    userID: number
}
export const followSuccess = (userID: number): followSuccessType => ({ type: FOLLOW, userID })
type unfollowSuccessType = {
    type: typeof UNFOLLOW
    userID: number
}
export const unfollowSuccess = (userID: number): unfollowSuccessType => ({ type: UNFOLLOW, userID })
type setUsersType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>): setUsersType => ({ type: SET_USERS, users })
type changePageType = {
    type: typeof CHANGE_PAGE
    currentPage: number
}
export const changePage = (currentPage: number): changePageType => ({ type: CHANGE_PAGE, currentPage })
type setTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount })
type toogleIsFetchingType = {
    type: typeof IS_FETCHING
    isFetching: boolean
}
export const toogleIsFetching = (isFetching: boolean): toogleIsFetchingType => ({ type: IS_FETCHING, isFetching })
type isFollowingProgressType = {
    type: typeof IS_FOLLOWING
    isDisabling: boolean
    userID: number
}
export const isFollowingProgress = (isDisabling: boolean, userID: number): isFollowingProgressType => ({ type: IS_FOLLOWING, isDisabling, userID })

export const getUsersTC = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toogleIsFetching(true))
    let response = await usersAPI.getUsers(page, pageSize)
    dispatch(toogleIsFetching(false))
    dispatch(setUsers(response.items))
    dispatch(setTotalUsersCount(response.totalCount))
}

const followUnfollowFlow = async (dispatch: any, userID: number, apiMethod: any, actionCreator: any) => {
    dispatch(isFollowingProgress(true, userID))
    let response = await apiMethod(userID)

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }

    dispatch(isFollowingProgress(false, userID))
}

export const follow = (userID: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userID: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}