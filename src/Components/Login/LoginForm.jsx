import React from "react"
import style from './Login.module.css';
import { Field } from 'redux-form'
import { required } from "../../utilities/validators";
import { FormControl } from "../Common/FormController/FormControl";
import styles from '../Common/FormController/FormControl.module.css';

const Input = FormControl('input')

const LoginForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit} style={{ 'display': 'flex', 'justifyContent': 'center', 'flexDirection': 'column', 'alignItems': 'center' }}>
            <div style={{ 'paddingBottom': '5px' }}>
                <Field name='email' component={Input} type='text' placeholder='Имя пользователя' validate={[required]} />
            </div>
            <div style={{ 'paddingBottom': '5px' }}>
                <Field name='password' component={Input} type='password' placeholder='Пароль' validate={[required]} />
            </div>
            {error
                ? <div className={styles.formControlSummaryError}>{error}</div>
                : ''}
            <div className={style.loginBtn}>
                <button>LOGIN</button>
            </div>
        </form>
    )
}

export default LoginForm