import { dialogsReducer } from "./dialogs-reducer";
import { profileReducer } from "./profile-reducer";

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
            newMessageText: ''
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
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state)
    }
}

export default store

window.store = store