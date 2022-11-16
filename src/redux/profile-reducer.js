import { profileAPI } from "../API/API";

const ADD_POST = 'ADD_POST';
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo Yo o guys!' },
    ],
    profile: null,
    status: null
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
        default:
            return state
    }
}

export const addPostActionCreator = (post) => ({ type: ADD_POST, post })
export const setUserProfile = (profile) => ({ type: SET_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postID) => ({ type: 'DELETE-POST', postID })

export const setProfileThunkCreator = (userID) => (dispatch) => {
    profileAPI.setProfile(userID)
        .then(response => {
            dispatch(setUserProfile(response.data))
        })
}

export const getStatusThunkCreator = (userID) => (dispatch) => {
    profileAPI.getStatus(userID)
        .then(response => {
            dispatch(setStatus(response))
        })
}

export const updateStatusThunkCreator = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
}
