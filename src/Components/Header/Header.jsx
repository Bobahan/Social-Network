import React from "react";
import { NavLink } from "react-router-dom";
import style from './Header.module.css'
import logoutIMG from '../../assets/logout.png'

const Header = (props) => {
    return (
        <div className={style.header}>
            <div>
                <div className={style.loginBlock}>
                    {props.isAuth
                        ?
                        <div style={{'display': 'flex'}}>
                            <div> {props.login}</div>
                            <div onClick={props.logout} style={{ 'cursor': 'pointer', 'color': 'white' }}>
                                <img style={{ 'width': '25px' }} src={logoutIMG} alt={'logoutIMG'}/>
                            </div>
                        </div>
                        : <NavLink style={{ 'textDecoration': 'none', 'color': 'white', 'cursor': 'pointer', 'fontWeight': '700' }} to='/login'>Login</NavLink>}
                </div>
            </div>
        </div>
    )
}

export default Header