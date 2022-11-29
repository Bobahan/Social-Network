import React from "react";
import { NavLink } from "react-router-dom";
import style from './Header.module.css'
import logoutIMG from '../../assets/logout.png'

type PropsType = {
    isAuth: boolean
    // login: (email: string, password: number, rememberMe: boolean, captcha: string)
    logout: () => void
}

// ожидался тип который должен был прийти с children
// которая тут объявлена HTML 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>'


const Header: React.FC<PropsType> = ({ isAuth, /* login*/ logout }) => {
    return (
        <div className={style.header}>
            <div>
                <div className={style.loginBlock}>
                    {isAuth
                        ?
                        <div style={{ 'display': 'flex' }}>
                            {/* <div>{login}</div> */}
                            <div onClick={logout} style={{ 'cursor': 'pointer', 'color': 'white' }}>
                                <img style={{ 'width': '25px' }} src={logoutIMG} alt={'logoutIMG'} />
                            </div>
                        </div>
                        : <NavLink style={{ 'textDecoration': 'none', 'color': 'white', 'cursor': 'pointer', 'fontWeight': '700' }} to='/login'>Login</NavLink>}
                </div>
            </div>
        </div>
    )
}

export default Header