import React from 'react';
import userImg from '../../assets/userImg.png';
import { Link } from 'react-router-dom';
import { UsersType } from '../../types/types';
import style from './Users.module.css';

const User: React.FC<UserType> = ({ user, followingInProgress, follow, unfollow }) => {
  return (
    <div className={style.user}>
      <div className={style.user__avatar}>
        <Link to={`/profile/${user.id}`}>
          <img alt="userImg" src={user.photos.small ? user.photos.small : userImg} />
        </Link>
      </div>
      <div className={style.user__info}>
        <div className={style.user__info__name}>{user.name}</div>
        {user.followed ? (
          <div className={style.user__info__follow}>
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}>
              UNFOLLOW
            </button>
          </div>
        ) : (
          <div className={style.user__info__follow}>
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}>
              FOLLOW
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

type UserType = {
  user: UsersType;
  followingInProgress: Array<number>;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
};

export default User;
