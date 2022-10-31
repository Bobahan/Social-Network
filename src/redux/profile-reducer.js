const ADD_POST = 'ADD_POST';
const UPDATE_POST = 'UPDATE_POST';

let initialState = {
    posts: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo Yo Yo guys!' },
    ],
    newPostText: ''
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
        default:
            return state
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updatePostActionCreator = (text) => ({ type: UPDATE_POST, post: text })