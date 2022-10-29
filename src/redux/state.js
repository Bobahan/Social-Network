const ADD_POST = 'ADD_POST';
const CHANGE_POST = 'CHANGE_POST';

let store = {
    _state: {
        profilePage: {
            post: [
                { id: 1, message: 'Hello' },
                { id: 2, message: 'How are you?' },
                { id: 3, message: 'Yo Yo Yo guys!' },
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                { id: 1, dialog: 'Vladimir' },
                { id: 2, dialog: 'Alex' },
                { id: 3, dialog: 'Andrey' },
            ],
            messages: [
                { id: 1, message: 'I wanna be a best software engineer' },
                { id: 2, message: 'I think that is the good idea' },
            ],
        },
    },
    _callSubscriber() { },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        switch (action.type) {
            case ADD_POST:
                this._state.profilePage.post.push({ id: 4, message: this._state.profilePage.newPostText })
                this._state.profilePage.newPostText = ''
                this._callSubscriber(this._state)
                break
            case CHANGE_POST:
                this._state.profilePage.newPostText = action.actionTEXT
                this._callSubscriber(this._state)
                break
            default:
                return this._state
        }
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const changePostActionCreator = (text) => ({ type: CHANGE_POST, actionTEXT: text })

export default store

window.store = store