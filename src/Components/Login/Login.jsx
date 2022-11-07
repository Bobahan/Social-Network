import React from "react";
import style from './Login.module.css';

const Login = () => {
    return (
        <div className={style.login}>
            <div>
                <h2 style={{ 'margin': '0' }}>Login</h2>
            </div>
            <div>
                <input placeholder="Имя пользователя" />
            </div>
            <div>
                <input placeholder="Пароль" type='password' />
            </div>
        </div>
    )
}

export default Login