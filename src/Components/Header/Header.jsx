import React from "react";
import { NavLink } from "react-router-dom";
import style from './Header.module.css'

const Header = (props) => {
    return (
        <div className={style.header}>
            <div>
                LOGO
                <div className={style.loginBlock}>
                    {props.isAuth
                        ? props.login
                        : <NavLink style={{ 'textDecoration': 'none', 'color': 'white', 'cursor': 'pointer', 'fontWeight': '700' }} to='/login'>Login</NavLink>}
                </div>
            </div>
        </div>
    )
}

export default Header