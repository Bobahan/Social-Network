import React from "react";
import style from './Navbar.module.css'

const Navbar = () => {
    return (
        <div className={style.navbar}>
            <div>
                <div><a href="/profile">Profile</a></div>
                <div><a href="/dialogs">Dialogs</a></div>
                <div><a href="/news">News</a></div>
                <div><a href="/music">Music</a></div>
                <div><a href="/users">Users</a></div>
                <div><a href="/settings">Setting</a></div>
            </div>
        </div>
    )
}

export default Navbar