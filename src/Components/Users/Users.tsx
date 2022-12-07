import React from "react";
import { UsersType } from "../../types/types";
import Paginator from '../Common/Paginator/Paginator';
import User from "./User";
import UsersSearchForm from "../SearchForm";
import { FilterType } from "../../redux/users-reducer";

const Users: React.FC<PropsType> = ({ totalUsersCount, pageSize, onPageChange, currentPage, users, onSearchUsers, ...props }) => {
    return (
        <div>
            <UsersSearchForm onSearchUsers={onSearchUsers} />
            <Paginator onPageChange={onPageChange} currentPage={currentPage} totalUsersCount={totalUsersCount} pageSize={pageSize} />
            {users.map((u, id) => <User key={id} user={u} follow={props.follow} unfollow={props.unfollow} followingInProgress={props.followingInProgress} />)}
        </div>
    )
}

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    followingInProgress: Array<number>
    users: Array<UsersType>
    onPageChange: (page: number) => void
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    isFollowingProgress: (isDisabling: boolean, userID: number) => void
    onSearchUsers: (filter: FilterType) => void
}

export default Users