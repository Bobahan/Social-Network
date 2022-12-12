import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterType, requestUsers, follow, unfollow } from "../../redux/users-reducer";
import { getCurrentPage, getFilteredUsers, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";
import { DispatchType } from "../../redux/redux-store";

import Paginator from '../Common/Paginator/Paginator';
import User from "./User";
import UsersSearchForm from "../SearchForm";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const Users = () => {
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getFilteredUsers)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch<DispatchType>()
    const navigate = useNavigate()
    const location = useLocation() // здесь хранится значение адресной строки URL. Например ?term=a&friend=null&page=1

    const [searchParams] = useSearchParams(location.search) // [['term': ''], ['page': 3], ['friend': null]]

    useEffect(() => {
        // @ts-ignore
        let parsed: { term: string, page: string, friend: string } = Object.fromEntries([...searchParams])

        let actualPage = currentPage
        let actualFilter = filter

        if (parsed.page) actualPage = +parsed.page
        if (parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }
        if (parsed.friend) actualFilter = { ...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        navigate({
            pathname: '/users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])

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