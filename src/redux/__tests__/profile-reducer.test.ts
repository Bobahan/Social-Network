import { ProfileType } from "../../types/types";
import { actionsProfile, profileReducer } from "../profile-reducer";

let state = {
    posts: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo Yo o guys!' },
    ] as Array<{id: number, message: string}>,
    profile: null as ProfileType | null,
    status: null as string | null,
}

test('length of posts should be incremented', () => {
    // test data
    let action = actionsProfile.addPostActionCreator('it-kamasutra.com')

    // action
    let newState = profileReducer(state, action)

    // expectation
    expect(newState.posts.length).toBe(4)
});

test('message of new post should be correct', () => {
    // test data
    let action = actionsProfile.addPostActionCreator('it-kamasutra.com')

    // action
    let newState = profileReducer(state, action)

    // expectation
    expect(newState.posts[3].message).toBe('it-kamasutra.com')
});

test('after deleting length of messages should be decrement', () => {
    // test data
    let action = actionsProfile.deletePost(1)

    // action
    let newState = profileReducer(state, action)

    // expectation
    expect(newState.posts.length).toBe(2)
});