import React from "react";
import userImg from '../../assets/userImg.png';
import { NavLink } from "react-router-dom";

const User = ({ user, followingInProgress, follow, unfollow }) => {
    return (
        <div>
            {user.name}
            <div>
                <NavLink to={`/profile/${user.id}`}>
                    <img alt="userImg" style={{ 'width': '100px' }} src={user.photos.small ? user.photos.small : userImg} />
                </NavLink>
            </div>
            {user.followed
                ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { unfollow(user.id) }}>UNFOLLOW</button>
                : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { follow(user.id) }}>FOLLOW</button>}
        </div>
    )
}

export default User