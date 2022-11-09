import React from "react"
import style from './Login.module.css';
import { Field } from 'redux-form'
import { required } from "../../utilities/validators";
import { FormControl } from "../Common/FormController/FormControl";

const Input = FormControl('input')

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field name='email' component={Input} type='text' placeholder='Имя пользователя' validate={[required]} />
                </div>
                <div>
                    <Field name='password' component={Input} type='password' placeholder='Пароль' validate={[required]} />
                </div>
                <div className={style.loginBtn}>
                    <button>LOGIN</button>
                </div>
            </div>
        </form>
    )
}

export default LoginForm