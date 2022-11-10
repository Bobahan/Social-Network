import React from "react";
import LoginForm from "./LoginForm";
import style from './Login.module.css';
import { reduxForm } from 'redux-form'
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    return (
        <div>
            {
                props.isAuth
                    ? <Navigate to={'/profile'} />
                    : <div className={style.login}>
                        <div>
                            <h2 style={{ 'margin': '0' }}>Login</h2>
                        </div>
                        <LoginReduxForm onSubmit={onSubmit} />
                    </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)
export default connect(mapStateToProps, { login })(Login)