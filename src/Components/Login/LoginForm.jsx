import React from "react"
import style from './Login.module.css';
import { Field } from 'redux-form'

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field name='email' component='input' type='text' placeholder='Имя пользователя' />
                </div>
                <div>
                    <Field name='password' component='input' type='password' placeholder='Пароль' />
                </div>
                <div className={style.loginBtn}>
                    <button>LOGIN</button>
                </div>
            </div>
        </form>
    )
}

export default LoginForm