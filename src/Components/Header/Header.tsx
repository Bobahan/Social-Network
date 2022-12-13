import React from "react";

import { Avatar, Button, Layout } from "antd";

import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { AppStateType, DispatchType } from "../../redux/redux-store";
import { logout } from "../../redux/auth-reducer";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const login = useSelector((state: AppStateType) => state.auth.login)
    const userIMG = useSelector((state: AppStateType) => state.profilePage.profile?.photos.small)
    const dispatch = useDispatch<DispatchType>()

    const logoutCallback = () => {
        dispatch(logout())
    }

    const { Header } = Layout
    return (
        <Header className="header" style={{ 'height': '100%' }}>
            <div style={{ 'display': 'flex', 'justifyContent': 'flex-end' }}>
                {isAuth ?
                    <span style={{ 'display': 'flex', 'marginLeft': '10px' }}>
                        <Avatar style={{ 'float': 'right' }} size={64} icon={<UserOutlined />} />
                        <span style={{ 'color': 'white' }}>
                            {login}
                            <span onClick={logoutCallback} style={{ 'cursor': 'pointer', 'color': 'white', 'marginLeft': '10px' }}><Button>Logout</Button></span>
                        </span>
                    </span>
                    : <Link style={{ 'textDecoration': 'none', 'color': 'white', 'cursor': 'pointer', 'marginLeft': '10px' }} to='/login'><Button>Login</Button></Link>}
            </div>
        </Header>
    )
}