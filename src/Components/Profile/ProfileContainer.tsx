import React from "react";
import { connect } from "react-redux"
import { withRouter } from "../HOC/withRouter";
import { getStatus, saveProfile, getProfile, updatePhoto, updateStatus } from "../../redux/profile-reducer";
import { compose } from "redux";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import Profile from "./Profile.tsx";
import { PhotosType, ProfileType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

class ProfileContainer extends React.Component<MapStateToPropsType, MapDispatchToPropsType> {
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
        if (prevProps.router.params.userId !== this.props.router.params.userId) { // 5 !== 6 // if (true)
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

type MapStateToPropsType = {
    profile: ProfileType
    status: string
    authorizedID: number
    isAuth: boolean
}


type MapDispatchToPropsType = {
    getProfile: (userID: number) => void
    getStatus: (userID: number) => void
    updateStatus: (status: string) => void
    updatePhoto: (photo: PhotosType) => void
    saveProfile: (profile: ProfileType) => void
}

type OwnProps = {}

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedID: state.auth.id,
        isAuth: state.auth.isAuth,
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, AppStateType>(mapStateToProps, { getProfile, getStatus, updateStatus, updatePhoto, saveProfile }),
    withAuthRedirect,
    withRouter,
)(ProfileContainer)