import React, { useEffect, useId } from "react";
import { connect, useDispatch, useSelector } from "react-redux"
import { withRouter } from "../HOC/withRouter";
import { getStatus, saveProfile, getProfile, updatePhoto, updateStatus } from "../../redux/profile-reducer";
import { compose } from "redux";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import Profile from "./Profile";
import { PhotosType, ProfileType } from "../../types/types";
import { AppStateType, DispatchType } from "../../redux/redux-store";
import { useParams } from 'react-router-dom';

// withRouter -> let params = useParams() -> this.props.router.params
// params: userId: "27029"

// const ProfilePage = () => {
//     const authorizedID = useSelector((state: AppStateType) => state.auth.id)

//     let params = useParams();
//     const dispatch = useDispatch<DispatchType>()

//     const updateProfile = () => {
//         let userID = params.userId // '27029'
//         if (!userID) {
//             userID = authorizedID
//         }
//         dispatch(getProfile(userID))
//         dispatch(getStatus(userID))
//     }

//     useEffect(() => {
//         updateProfile()
//     }, [userID])
// } 

class ProfileContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType & PathParamsType> {
    updateProfile() {
        let userID: number | null = +this.props.router.params.userId
        if (!userID) {
            userID = this.props.authorizedID
        }
        this.props.getProfile(userID)
        this.props.getStatus(userID)
    }

    componentDidMount() {
        this.updateProfile()
    }

    componentDidUpdate(prevProps: any) {
        if (prevProps.router.params.userId !== this.props.router.params.userId) { // id5 !== id6 // true -> обновись
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

type PathParamsType = { router: any }

type MapStateToPropsType = {
    profile: ProfileType | null
    status: string | null
    authorizedID: number | null
    isAuth: boolean
}

type MapDispatchToPropsType = {
    getProfile: (userID: number) => void
    getStatus: (userID: number) => void
    updateStatus: (status: string) => void
    updatePhoto: (photo: PhotosType) => void
    saveProfile: (profile: ProfileType) => void
}

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedID: state.auth.id,
        isAuth: state.auth.isAuth,
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, { getProfile, getStatus, updateStatus, updatePhoto, saveProfile }),
    withAuthRedirect,
    withRouter,
)(ProfileContainer)