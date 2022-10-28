let rerenderTree = () => { }

export let state = {
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
}

export const changePost = (actionText) => {
    state.profilePage.newPostText = actionText
    rerenderTree(state)
}

export const addPost = (actionPost) => {
    let newPost = {
        id: 4,
        message: actionPost
    }
    state.profilePage.post.push(newPost)
    state.profilePage.newPostText = ''
    rerenderTree(state)
}

export let subscribe = (observer) => {
    rerenderTree = observer
}

window.state = state