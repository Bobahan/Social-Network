import { InitialStateType, usersReducer } from './../users-reducer'
import { actionsUsers } from "../users-reducer"

let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
            { id: 0, name: 'Vladimir', followed: false, status: '', photos: { small: '', large: '' } },
            { id: 1, name: 'Alex', followed: true, status: '', photos: { small: '', large: '' } },
            { id: 2, name: 'Sema', followed: false, status: '', photos: { small: '', large: '' } },
            { id: 3, name: 'Dima', followed: false, status: '', photos: { small: '', large: '' } },
            { id: 4, name: 'Stat', followed: true, status: '', photos: { small: '', large: '' } },
        ],
        totalUsersCount: 0,
        pageSize: 5,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('follow userID = 2', () => {
    // action
    let action = actionsUsers.followSuccess(2)

    // usersReducer return updated new state
    let newState = usersReducer(state, action)

    // expectation
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})

test('unfollow userID = 1', () => {
    // action
    let action = actionsUsers.unfollowSuccess(1)

    // usersReducer return updated new state
    let newState = usersReducer(state, action)

    // expectation
    expect(newState.users[1].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[4].followed).toBeTruthy()
})