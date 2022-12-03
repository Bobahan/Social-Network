import React from "react";
import LoginForm from "./LoginForm";
import style from './Login.module.css';
import { reduxForm } from 'redux-form'
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
    captcha: string | null
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type OwnProps = {}

export type LoginFormType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export type LoginFormOwnProps = {
    captcha: string | null
}


const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'} />
    }

    return (
        <div>
            <div className={style.login}>
                <div>
                    <h2 style={{ 'margin': '0' }}>Login</h2>
                </div>
                <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha} />
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha
    }
}

const LoginReduxForm = reduxForm<LoginFormType, LoginFormOwnProps>({ form: 'login' })(LoginForm)
export default connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, { login })(Login)