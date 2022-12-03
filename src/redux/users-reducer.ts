import { UsersType } from './../types/types';
import { Dispatch } from 'redux';
import { AppStateType, InferActionsType, ThunkType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../API/users-api';

let initialState = {
    users: [] as Array<UsersType>,
    totalUsersCount: 0 as number,
    pageSize: 5 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number> // array of users ids
}

type InitialStateType = typeof initialState

export const actionsUsers = {
    followSuccess: (userID: number) => ({ type: 'FOLLOW', userID } as const),
    unfollowSuccess: (userID: number) => ({ type: 'UNFOLLOW', userID } as const),
    setUsers: (users: Array<UsersType>) => ({ type: 'SET_USERS', users } as const),
    changePage: (currentPage: number) => ({ type: 'CHANGE_PAGE', currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalUsersCount } as const),
    toogleIsFetching: (isFetching: boolean) => ({ type: 'IS_FETCHING', isFetching } as const),
    isFollowingProgress: (isDisabling: boolean, userID: number) => ({ type: 'IS_FOLLOWING', isDisabling, userID } as const)
}
type ActionTypes = InferActionsType<typeof actionsUsers>

export const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return { ...u, followed: false }
                    }
                    return u
                })
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'CHANGE_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case 'IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'IS_FOLLOWING':
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

export const getUsersTC = (page: number, pageSize: number): ThunkType<ActionTypes> => async (dispatch) => {
    dispatch(actionsUsers.toogleIsFetching(true))
    let response = await usersAPI.getUsers(page, pageSize)
    dispatch(actionsUsers.toogleIsFetching(false))
    dispatch(actionsUsers.setUsers(response.items))
    dispatch(actionsUsers.setTotalUsersCount(response.totalCount))
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>, userID: number, apiMethod: any, actionCreator: (userID: number) => ActionTypes) => {
    dispatch(actionsUsers.isFollowingProgress(true, userID))
    let response = await apiMethod(userID)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(actionsUsers.isFollowingProgress(false, userID))
}

export const follow = (userID: number): ThunkType<ActionTypes> => {
    return async (dispatch: Dispatch<ActionTypes>) => {
        _followUnfollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), actionsUsers.followSuccess)
    }
}

export const unfollow = (userID: number): ThunkType<ActionTypes> => {
    return async (dispatch: Dispatch<ActionTypes>) => {
        _followUnfollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), actionsUsers.unfollowSuccess)
    }
}