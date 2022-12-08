import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterType, requestUsers, follow, unfollow } from "../../redux/users-reducer";
import { getCurrentPage, getFilteredUsers, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";
import { DispatchType } from "../../redux/redux-store";

import Paginator from '../Common/Paginator/Paginator';
import User from "./User";
import UsersSearchForm from "../SearchForm";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getFilteredUsers) // достали актуальные данные из Redux 
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch<DispatchType>()
    const navigate = useNavigate()

    useEffect(() => {
        navigate({
            pathname: '/users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChange = (page: number) => { dispatch(requestUsers(page, pageSize, filter)) }
    const onSearchUsers = (filter: FilterType) => { dispatch(requestUsers(1, pageSize, filter)) }
    const followSuccess = (userID: number) => { dispatch(follow(userID)) }
    const unfollowSuccess = (userID: number) => { dispatch(unfollow(userID)) }

    return (
        <div>
            <UsersSearchForm onSearchUsers={onSearchUsers} />
            <Paginator onPageChange={onPageChange} currentPage={currentPage} totalUsersCount={totalUsersCount} pageSize={pageSize} />
            {users.map((u, id) => <User key={id} user={u} follow={followSuccess} unfollow={unfollowSuccess} followingInProgress={followingInProgress} />)}
        </div>
    )
}