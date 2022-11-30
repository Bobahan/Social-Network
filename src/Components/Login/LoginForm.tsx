import React from "react"
import style from './Login.module.css';
import { Field, InjectedFormProps } from 'redux-form'
import { required } from "../../utilities/validators";
import { FormControlDiv } from "../Common/FormController/FormControl";
import styles from '../Common/FormController/FormControl.module.css';
import { LoginFormOwnProps, LoginFormType } from "./Login";

const Input = FormControlDiv('input')

const LoginForm: React.FC<InjectedFormProps<LoginFormType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captcha }) => {
    debugger
    return (
        <form onSubmit={handleSubmit} style={{ 'display': 'flex', 'justifyContent': 'center', 'flexDirection': 'column', 'alignItems': 'center' }}>
            <div style={{ 'paddingBottom': '5px' }}>
                <Field name='email' component={Input} type='text' placeholder='Имя пользователя' validate={[required]} />
            </div>
            <div style={{ 'paddingBottom': '5px' }}>
                <Field name='password' component={Input} type='password' placeholder='Пароль' validate={[required]} />
            </div>
            {captcha && <img src={captcha} alt={'captcha'} />}
            {captcha && <Field name='captcha' component={Input} placeholder='Введите символы' validate={[required]} />}
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