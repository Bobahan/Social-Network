import React from "react";
import { connect } from "react-redux";
import { login, logout } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import Header from "./Header";

type MapStateToPropsType = {
    isAuth: boolean
}

type MapDispatchToPropsType = {
    logout: () => void
    // login: (email: string, password: number, rememberMe: boolean, captcha: string) => void
}

type TOwnProps = {}

class HeaderContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, TOwnProps, AppStateType>(mapStateToProps, { logout, /* login*/  })(HeaderContainer)