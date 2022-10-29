const ADD_POST = 'ADD_POST';
const UPDATE_POST = 'UPDATE_POST';

export const profileReducer = (state, action) => {
    switch (action.type) {
        case ADD_POST:
            state.post.push({ id: 4, message: state.newPostText })
            state.newPostText = ''
            return state
        case UPDATE_POST:
            state.newPostText = action.post
            return state
        default:
            return state
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updatePostActionCreator = (text) => ({ type: UPDATE_POST, post: text })