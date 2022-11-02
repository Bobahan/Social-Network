import React from "react";
import style from './Users.module.css';
import userImg from '../../assets/userImg.png';

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
                        return <button key={id} className={props.currentPage === p ? style.selectedPage : ''} onClick={() => { onChangePage(p) }}>{p}</button>
                    })
                }
            </div>
            {
                props.users.map((u, id) =>
                    <div key={id}>
                        {u.name}
                        <div>
                            <img alt="userImg" style={{ 'width': '100px' }} src={u.photos.small ? u.photos.small : userImg} />
                        </div>
                        {u.followed
                            ? <button onClick={() => { props.unfollow(u.id) }}>UNFOLLOW</button>
                            : <button onClick={() => { props.follow(u.id) }}>FOLLOW</button>}
                    </div>
                )
            }
        </div>
    )
}

export default Users