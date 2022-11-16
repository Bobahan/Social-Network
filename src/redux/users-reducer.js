import { usersAPI } from "../API/API";
import { updateObjectInArray } from "../utilities/object-helper";


const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS;'
const CHANGE_PAGE = 'users/CHANGE_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const IS_FETCHING = 'IS_FETCHING';
const IS_FOLLOWING = 'IS_FOLLOWING';

let initialState = {
    users: [],
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', { followed: true },)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', { followed: false },)
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

export const follow = (userID) => ({ type: FOLLOW, userID })
export const unfollow = (userID) => ({ type: UNFOLLOW, userID })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const changePage = (currentPage) => ({ type: CHANGE_PAGE, currentPage })
export const setTotalUsersCount = (page) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount: page })
export const toogleIsFetching = (isFetching) => ({ type: IS_FETCHING, isFetching })
export const isFollowingProgress = (isDisabling, userID) => ({ type: IS_FOLLOWING, isDisabling, userID })


export const getUsersTC = (page, pageSize) => async (dispatch) => {
    dispatch(toogleIsFetching(true))
    let response = await usersAPI.getUsers(page, pageSize)
    dispatch(toogleIsFetching(false))
    dispatch(setUsers(response.items))
    dispatch(setTotalUsersCount(response.totalCount))
}

const followUnfollowFlow = async (dispatch, userID, apiMethod, actionCreator) => {
    dispatch(isFollowingProgress(true, userID))
    let response = await apiMethod(userID)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(isFollowingProgress(false, userID))
}

export const followAccept = (userID) => async (dispatch) => {
    followUnfollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), follow)
}

export const unfollowAccept = (userID) => async (dispatch) => {
    followUnfollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), unfollow)
}