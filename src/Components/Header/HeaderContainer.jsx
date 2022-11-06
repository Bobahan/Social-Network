import React from "react";
import { connect } from "react-redux";
import { authThunkCreator } from "../../redux/auth-reducer";
import Header from "./Header";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.authentication()
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
        authentication: () => {
            dispatch(authThunkCreator())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)