import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppStateType, DispatchType } from '../../redux/redux-store';
import { logout } from '../../redux/auth-reducer';
import style from './Header.module.css';

export const Header: React.FC = () => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const login = useSelector((state: AppStateType) => state.auth.login);
  const userIMG = useSelector((state: AppStateType) => state.profilePage.profile?.photos.small);
  const dispatch = useDispatch<DispatchType>();

  const logoutCallback = () => {
    dispatch(logout());
  };

  return (
    <div className={style.header}>
      <div className={style.header__logo}>Besocial!</div>
      {isAuth ? (
        <>
          <div className={style.header__field}>
            <div>{login}</div>
            <button className="button button-logout" onClick={logoutCallback}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <Link to="/login">
          <button className="button button-login">Login</button>
        </Link>
      )}
    </div>
  );
};
