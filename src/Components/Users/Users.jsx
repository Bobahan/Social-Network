import React from "react";
import style from './Users.module.css';
import userImg from '../../assets/userImg.png';
import { NavLink } from "react-router-dom";
import axios from "axios";

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
                            ? <button onClick={() => {
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "e01547c5-945f-413f-9374-0c81df120f42"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                    })
                            }}>UNFOLLOW</button>
                            : <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "e01547c5-945f-413f-9374-0c81df120f42"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                    })
                            }}>FOLLOW</button>}
                    </div>
                )
            }
        </div>
    )
}

export default Users