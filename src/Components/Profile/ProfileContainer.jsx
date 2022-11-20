import React from "react";
import { connect } from "react-redux"
import { withRouter } from "../HOC/withRouter";
import { getStatus, setProfile, updatePhoto, updateStatus } from "../../redux/profile-reducer";
import { compose } from "redux";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import Profile from "./Profile";

class ProfileContainer extends React.Component {
    updateProfile() {
        let userID = this.props.router.params.userId
        if (!userID) {
            userID = this.props.authorizedID
        }
        this.props.setProfile(userID)
        this.props.getStatus(userID)
    }
    componentDidMount() {
        this.updateProfile()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.router.params.userId !== this.props.router.params.userId) {
            this.updateProfile()
        }
    }
    render() {
        return (
            <div>
                <Profile {...this.props} isOwner={!this.props.router.params.userId} updatePhoto={this.props.updatePhoto} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedID: state.auth.id,
        isAuth: state.auth.isAuth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProfile: (userID) => {
            dispatch(setProfile(userID))
        },
        getStatus: (userID) => {
            dispatch(getStatus(userID))
        },
        updateStatus: (status) => {
            dispatch(updateStatus(status))
        },
        updatePhoto: (photo) => {
            dispatch(updatePhoto(photo))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter,
)(ProfileContainer)