import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterType, requestUsers, follow, unfollow } from "../../redux/users-reducer";
import { getCurrentPage, getFilteredUsers, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";
import { ThunkDispatch } from "redux-thunk";
import { AppStateType } from "../../redux/redux-store";
import { Action } from "redux";

import Paginator from '../Common/Paginator/Paginator';
import User from "./User";
import UsersSearchForm from "../SearchForm";

export const Users = () => {
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getFilteredUsers)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    type DispatchType = ThunkDispatch<AppStateType, any, Action>
    const dispatch = useDispatch<DispatchType>()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChange = (page: number) => {
        dispatch(requestUsers(page, pageSize, filter))
    }

    const onSearchUsers = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followSuccess = (userID: number) => {
        dispatch(follow(userID))
    }

    const unfollowSuccess = (userID: number) => {
        dispatch(unfollow(userID))
    }

    return (
        <div>
            <UsersSearchForm onSearchUsers={onSearchUsers} />
            <Paginator onPageChange={onPageChange} currentPage={currentPage} totalUsersCount={totalUsersCount} pageSize={pageSize} />
            {users.map((u, id) => <User key={id} user={u} follow={followSuccess} unfollow={unfollowSuccess} followingInProgress={followingInProgress} />)}
        </div>
    )
}