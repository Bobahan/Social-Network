import React from "react";
import userImg from '../../assets/userImg.png';
import { NavLink } from "react-router-dom";

const User = ({ user, followingInProgress, follow, unfollow }) => {
    return (
        <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'border': '1px solid black' }}>
            <div style={{ 'width': '50%', 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'borderRight': '1px solid black' }}>
                <NavLink to={`/profile/${user.id}`}>
                    <img alt="userImg" style={{ 'width': '100px' }} src={user.photos.small ? user.photos.small : userImg} />
                </NavLink>
            </div>
            <div style={{ 'width': '50%' }}>
                <div style={{ 'textAlign': 'center', 'fontWeight': '700' }}>{user.name}</div>
                {user.followed
                    ? <div style={{ 'display': 'flex', 'justifyContent': 'center' }}><button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { unfollow(user.id) }}>UNFOLLOW</button></div>
                    : <div style={{ 'display': 'flex', 'justifyContent': 'center' }}><button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { follow(user.id) }}>FOLLOW</button></div>
                }
            </div>
        </div>
    )
}

export default User