import { stopSubmit } from "redux-form";
import { profileAPI } from "../API/profile-api";
import { PhotosType, ProfileType } from "../types/types";
import { InferActionsType } from "./redux-store";

type PostType = {
    id: number
    message: string
}

let initialState = {
    posts: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo Yo o guys!' },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: null as string | null,
}
type InitialStateType = typeof initialState

const actions = {
    addPostActionCreator: (post: string) => ({ type: 'ADD_POST', post } as const),
    getUserProfile: (profile: ProfileType) => ({ type: 'SET_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
    deletePost: (postID: number) => ({ type: 'DELETE_POST', postID } as const),
    setProfilePhoto: (photo: PhotosType) => ({ type: 'SAVE_PHOTO', photo } as const),
}
type ActionsType = InferActionsType<typeof actions>

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts, { id: 4, message: action.post }]
            }
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postID)
            }
        case 'SAVE_PHOTO':
            return {
                ...state,
                profile: { ...state.profile, photos: action.photo } as ProfileType
            }
        default:
            return state
    }
}

export const getProfile = (userID: number) => async (dispatch: any) => {
    const response = await profileAPI.getProfile(userID)
    dispatch(actions.getUserProfile(response))
}

export const getStatus = (userID: number) => async (dispatch: any) => {
    const response = await profileAPI.getStatus(userID)
    dispatch(actions.setStatus(response))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.updateStatus(status)
    const responseError = response.data.messages[0]
    if (response.data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    } else {
        dispatch(actions.setStatus(responseError))
    }
}

export const updatePhoto = (photo: PhotosType) => async (dispatch: any) => {
    let response = await profileAPI.updatePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(actions.setProfilePhoto(response.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userID = getState().auth.id
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getProfile(userID))
    } else {
        const errorResponse = response.data.messages.length > 0 ? response.data.messages[0] : ''
        dispatch(stopSubmit('profile', { _error: errorResponse }))
        return Promise.reject(response.data.messages[0])
    }
}