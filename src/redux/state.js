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
    getState() {
        return this._state
    },
    _callSubscriber() { },
    changePost(actionText) {
        this._state.profilePage.newPostText = actionText
        this._callSubscriber(this._state)
    },
    addPost() {
        let newPost = {
            id: 4,
            message: this._state.profilePage.newPostText
        }
        this._state.profilePage.post.push(newPost)
        this._state.profilePage.newPostText = ''
        this._callSubscriber(this._state)
    },
    subscribe(observer) {
        this._callSubscriber = observer
    }
}

export default store
window.store = store