import { profileAPI } from "../API/API";

const ADD_POST = 'ADD_POST';
const UPDATE_POST = 'UPDATE_POST';
const SET_PROFILE = 'SET_PROFILE';

let initialState = {
    posts: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo Yo Yo guys!' },
    ],
    newPostText: '',
    profile: null,
    status: 'temporary status'
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, { id: 4, message: state.newPostText }],
                newPostText: ''
            }
        case UPDATE_POST:
            return {
                ...state,
                newPostText: action.post
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updatePostActionCreator = (text) => ({ type: UPDATE_POST, post: text })
export const setUserProfile = (profile) => ({ type: SET_PROFILE, profile })

export const setProfileThunkCreator = (userID) => (dispatch) => {
    profileAPI.setProfile(userID)
        .then(response => {
            dispatch(setUserProfile(response.data))
        })
}