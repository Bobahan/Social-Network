import { ResponseType, ResultCodesEnum } from "../../API/API"
import { usersAPI } from "../../API/users-api"
import { actionsUsers, follow, unfollow } from "../users-reducer"

jest.mock("../../API/users-api")
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: ResponseType = {
    data: {},
    resultCode: ResultCodesEnum.Success,
    messages: []
}

const dispatchMock = jest.fn()
const getState = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getState.mockClear()
    userAPIMock.follow.mockClear()
    userAPIMock.unfollow.mockClear()
})

userAPIMock.follow.mockReturnValue(Promise.resolve(result))
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

test('thunk follow success', () => {
    const thunk = follow(1)

    thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledWith(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actionsUsers.isFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actionsUsers.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actionsUsers.isFollowingProgress(false, 1))
})

test('thunk unfollow success', () => {
    const thunk = unfollow(2)

    thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledWith(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actionsUsers.isFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actionsUsers.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actionsUsers.isFollowingProgress(false, 1))
})