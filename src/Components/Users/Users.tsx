import React from "react";
import { UsersType } from "../../types/types";
import Paginator from '../Common/Paginator/Paginator'
import User from "./User";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    followingInProgress: Array<number>
    users: Array<UsersType>
    onPageChange: (page: number) => void
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}

const Users: React.FC<PropsType> = ({ totalUsersCount, pageSize, onPageChange, currentPage, users, ...props }) => {
    return (
        <div>
            <Paginator onPageChange={onPageChange} currentPage={currentPage} totalUsersCount={totalUsersCount} pageSize={pageSize} />
            {users.map((u, id) => <User key={id} user={u} follow={props.follow} unfollow={props.unfollow} followingInProgress={props.followingInProgress} />)}
        </div>
    )
}

export default Users