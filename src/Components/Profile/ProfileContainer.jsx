import React from "react";
import { connect } from "react-redux"
import { withRouter } from "../HOC/withRouter";
import { getStatus, saveProfile, getProfile, updatePhoto, updateStatus, actionsProfile } from "../../redux/profile-reducer";
import { compose } from "redux";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import Profile from "./Profile";
class ProfileContainer extends React.Component {
    updateProfile() {
        let userID = this.props.router.params.userId
        if (!userID) {
            userID = this.props.authorizedID
        }
        this.props.getProfile(userID)
        this.props.getStatus(userID)
    }

    componentDidMount() {
        this.updateProfile()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.router.params.userId !== this.props.router.params.userId) { // 5 !== 6 false // if (true)
            this.updateProfile()
        }
    }

    render() {
        return (
            <div>
                <Profile
                    profile={this.props.profile}
                    isOwner={!this.props.router.params.userId}
                    updatePhoto={this.props.updatePhoto}
                    saveProfile={this.props.saveProfile}
                    updateStatus={this.props.updateStatus}
                    status={this.props.status}
                />
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
        getProfile: (userID) => {
            dispatch(getProfile(userID))
        },
        getStatus: (userID) => {
            dispatch(getStatus(userID))
        },
        updateStatus: (status) => {
            dispatch(updateStatus(status))
        },
        updatePhoto: (photo) => {
            dispatch(updatePhoto(photo))
        },
        saveProfile: (profile) => {
            dispatch(saveProfile(profile))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter,
)(ProfileContainer)