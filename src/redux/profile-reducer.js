import { stopSubmit } from "redux-form";
import { profileAPI } from "../API/API";

const ADD_POST = 'profile/ADD_POST';
const SET_PROFILE = 'profile/SET_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const SAVE_PHOTO = 'profile/SAVE_PHOTO';

let initialState = {
    posts: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo Yo o guys!' },
    ],
    profile: null,
    status: null,
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, { id: 4, message: action.post }],
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
        case 'DELETE-POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postID)
            }
        case SAVE_PHOTO:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photo }
            }
        default:
            return state
    }
}

export const addPostActionCreator = (post) => ({ type: ADD_POST, post })
export const getUserProfile = (profile) => ({ type: SET_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postID) => ({ type: 'DELETE-POST', postID })
export const setProfilePhoto = (photo) => ({ type: SAVE_PHOTO, photo })

export const setProfile = (userID) => async (dispatch) => {
    const response = await profileAPI.setProfile(userID)
    dispatch(getUserProfile(response.data))
}

export const getStatus = (userID) => async (dispatch) => {
    const response = await profileAPI.getStatus(userID)
    dispatch(setStatus(response))
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    const responseError = response.data.messages[0]
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    } else {
        dispatch(setStatus(responseError))
    }
}

export const updatePhoto = (photo) => async (dispatch) => {
    let response = await profileAPI.updatePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(setProfilePhoto(response.data.data.photos))
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
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