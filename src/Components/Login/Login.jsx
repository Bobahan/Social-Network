import React from "react";
import LoginForm from "./LoginForm";
import style from './Login.module.css';
import { reduxForm } from 'redux-form'
import { connect } from "react-redux";
import { loginThunkCreator } from "../../redux/auth-reducer";

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password)
    }
    return (
        <div className={style.login}>
            <div>
                <h2 style={{ 'margin': '0' }}>Login</h2>
            </div>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        password: state.auth.password
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => {
            dispatch(loginThunkCreator(email, password))
        }
    }
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)
export default connect(mapStateToProps, mapDispatchToProps)(Login)