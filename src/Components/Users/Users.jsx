import React from "react";
import Paginator from '../Common/Paginator/Paginator'
import User from "./User";

const Users = ({ totalUsersCount, pageSize, onPageChange, currentPage, users, ...props }) => {
    return (
        <div>
            <Paginator onPageChange={onPageChange} currentPage={currentPage} totalUsersCount={totalUsersCount} pageSize={pageSize} />
            {users.map((u, id) => <User key={id} user={u} follow={props.follow} unfollow={props.unfollow} followingInProgress={props.followingInProgress} />)}
        </div>
    )
}

export default Users