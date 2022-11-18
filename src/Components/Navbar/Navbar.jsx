import React from "react";
import style from './Navbar.module.css'
import { NavLink } from "react-router-dom";

const LinkActive = ({ isActive }) => {
    return isActive ? style.active : style.text
}

const Navbar = () => {
    return (
        <div className={style.navbar}>
            <div style={{ 'padding': '15px', 'textAlign': 'center' }}>
                <div className={style.item}><NavLink className={LinkActive} to={"/profile"}>Profile</NavLink></div>
                <div className={style.item}><NavLink className={LinkActive} to={"/dialogs"}>Dialogs</NavLink></div>
                <div className={style.item}><NavLink className={LinkActive} to={"/news"}>News</NavLink></div>
                <div className={style.item}><NavLink className={LinkActive} to={"/music"}>Music</NavLink></div>
                <div className={style.item}><NavLink className={LinkActive} to={"/users"}>Users</NavLink></div>
                <div className={style.item}><NavLink className={LinkActive} to={"/setting"}>Setting</NavLink></div>
            </div>
        </div>
    )
}

export default Navbar