import React from "react";
import style from './Header.module.css'

const Header = (props) => {
    return (
        <div className={style.header}>
            {props.isAuth ? props.login : 'Авторизуйся'}
        </div>
    )
}

export default Header