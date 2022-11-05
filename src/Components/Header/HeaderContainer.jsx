import React from "react";
import { connect } from "react-redux";
import { authAPI } from "../../API/API";
import { setUserDataActionCreator } from "../../redux/auth-reducer";
import Header from "./Header";

class HeaderContainer extends React.Component {
    componentDidMount() {
        authAPI.auth()
            .then(response => {
                if (response.resultCode === 0) {
                    let { email, id, login } = response.data
                    this.props.setAuthUserData(email, id, login)
                }
            })
    }
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setAuthUserData: (email, id, login) => {
            dispatch(setUserDataActionCreator(email, id, login))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)