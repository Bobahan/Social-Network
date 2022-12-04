import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import Header from "./Header";

class HeaderContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    render() {
        return (
            <Header login={this.props.login} isAuth={this.props.isAuth} logout={this.props.logout} />
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}

export type MapStateToPropsType = { login: string | null, isAuth: boolean }
export type MapDispatchToPropsType = { logout: () => void }

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer)