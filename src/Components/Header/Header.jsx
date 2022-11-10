import React from "react";
import { NavLink } from "react-router-dom";
import style from './Header.module.css'

const Header = (props) => {
    return (
        <div className={style.header}>
            <div>
                <div className={style.loginBlock}>
                    {props.isAuth
                        ? <div>{props.login}<span onClick={props.logout} style={{ 'cursor': 'pointer', 'color': 'white' }}> - Log out</span></div>
                        : <NavLink style={{ 'textDecoration': 'none', 'color': 'white', 'cursor': 'pointer', 'fontWeight': '700' }} to='/login'>Login</NavLink>}
                </div>
            </div>
        </div>
    )
}

export default Header