import React from "react";
import style from './Users.module.css';
import userImg from '../../assets/userImg.png';
import { NavLink } from "react-router-dom";
import { usersAPI } from "../../API/API";

const Users = (props) => {
    let totalPages = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    const onChangePage = (pageNumber) => {
        props.changeCurrentPage(pageNumber)
    }

    return (
        <div>
            <div>
                {
                    pages.map((p, id) => {
                        return <span style={{ 'cursor': 'pointer' }} key={id} className={props.currentPage === p ? style.selectedPage : ''} onClick={() => { onChangePage(p) }}>{p}</span>
                    })
                }
            </div>
            {
                props.users.map((u, id) =>
                    <div key={id}>
                        {u.name}
                        <div>
                            <NavLink to={`/profile/${u.id}`}>
                                <img alt="userImg" style={{ 'width': '100px' }} src={u.photos.small ? u.photos.small : userImg} />
                            </NavLink>
                        </div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.isFollowingProgress(true, u.id)
                                usersAPI.unfollow(u.id)
                                    .then(response => {
                                        if (response.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                        props.isFollowingProgress(false, u.id)
                                    })
                            }}>UNFOLLOW</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.isFollowingProgress(true, u.id)
                                usersAPI.follow(u.id)
                                    .then(response => {
                                        if (response.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                        props.isFollowingProgress(false, u.id)
                                    })
                            }}>FOLLOW</button>}
                    </div>
                )
            }
        </div>
    )
}

export default Users