import React from "react";
import userImg from '../../assets/userImg.png';
import { NavLink } from "react-router-dom";
import { UsersType } from "../../types/types";

const User: React.FC<UserType> = ({ user, followingInProgress, follow, unfollow }) => {
    return (
        <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'border': '1px solid black', 'borderRadius': '50px', 'margin': '20px' }}>
            <div style={{ 'width': '50%', 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'borderRight': '1px solid black' }}>
                <div style={{ 'marginTop': '8px' }}>
                    <NavLink to={`/profile/${user.id}`}>
                        <img alt="userImg" style={{ 'width': '100px', 'borderRadius': '20px' }} src={user.photos.small ? user.photos.small : userImg} />
                    </NavLink>
                </div>
            </div>
            <div style={{ 'width': '50%' }}>
                <div style={{ 'textAlign': 'center', 'fontWeight': '700', 'color': 'black' }}>{user.name}</div>
                {user.followed
                    ? <div style={{ 'display': 'flex', 'justifyContent': 'center' }}><button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { unfollow(user.id) }}>UNFOLLOW</button></div>
                    : <div style={{ 'display': 'flex', 'justifyContent': 'center' }}><button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { follow(user.id) }}>FOLLOW</button></div>
                }
            </div>
        </div>
    )
}

type UserType = {
    user: UsersType
    followingInProgress: Array<number>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}

export default User