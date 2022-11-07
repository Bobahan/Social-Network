import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";


// логику определили в контейнерной компоненте - WrapperRedirectComponent
// когда к нам будет поступать целевая компонента - Component
// HOC withRedirect вернет нам контейнерную компоненту с общим поведением для целевых компонент Component

const mapStateToPropsForRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = (Component) => {
    class WrapperRedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to={'/login'} />
            return <Component {...this.props} />
        }
    }
    return connect(mapStateToPropsForRedirect)(WrapperRedirectComponent)
}