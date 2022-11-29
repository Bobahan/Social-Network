
import { stopSubmit } from "redux-form";
import { profileAPI } from "../API/API";
import { ContactsType, PhotosType } from "../types/types";

const ADD_POST = 'profile/ADD_POST';
const SET_PROFILE = 'profile/SET_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const SAVE_PHOTO = 'profile/SAVE_PHOTO';
const DELETE_POST = 'profile/DELETE-POST';

type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string,
    contacts: ContactsType
    photos: PhotosType
}

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

export type InitialStateType = typeof initialState

export const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, { id: 4, message: action.post }]
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postID)
            }
        case SAVE_PHOTO:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photo } as ProfileType
            }
        default:
            return state
    }
}

type addPostActionCreatorType = {
    type: typeof ADD_POST
    post: string
}

export const addPostActionCreator = (post: string): addPostActionCreatorType => ({ type: ADD_POST, post })

type getUserProfileType = {
    type: typeof SET_PROFILE
    profile: ProfileType
}
export const getUserProfile = (profile: ProfileType): getUserProfileType => ({ type: SET_PROFILE, profile })

type setStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): setStatusType => ({ type: SET_STATUS, status })

type deletePostType = {
    type: typeof DELETE_POST
    postID: number
}
export const deletePost = (postID: number): deletePostType => ({ type: DELETE_POST, postID })

type setProfilePhotoType = {
    type: typeof SAVE_PHOTO
    photo: PhotosType
}

export const setProfilePhoto = (photo: PhotosType): setProfilePhotoType => ({ type: SAVE_PHOTO, photo })

export const setProfile = (userID: number) => async (dispatch: any) => {
    const response = await profileAPI.setProfile(userID)
    dispatch(getUserProfile(response.data))
}

export const getStatus = (userID: number) => async (dispatch: any) => {
    const response = await profileAPI.getStatus(userID)
    dispatch(setStatus(response))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.updateStatus(status)
    const responseError = response.data.messages[0]
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    } else {
        dispatch(setStatus(responseError))
    }
}

export const updatePhoto = (photo: PhotosType) => async (dispatch: any) => {
    let response = await profileAPI.updatePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(setProfilePhoto(response.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userID = getState().auth.id
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(setProfile(userID))
    } else {
        const errorResponse = response.data.messages.length > 0 ? response.data.messages[0] : ''
        dispatch(stopSubmit('profile', { _error: errorResponse }))
        return Promise.reject(response.data.messages[0])
    }
}