import React from "react";
import { connect } from "react-redux"
import { withRouter } from "../HOC/withRouter";
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { getStatusThunkCreator, setProfileThunkCreator, updateStatusThunkCreator } from "../../redux/profile-reducer";
import { compose } from "redux";
import { withAuthRedirect } from "../HOC/withAuthRedirect";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userID = this.props.router.params.userId
        if (!userID) {
            userID = this.props.authorizedID
        }
        this.props.setProfile(userID)
        this.props.getStatus(userID)
    }
    render() {
        console.log('RENDER')
        return (
            <>
                <ProfileInfo {...this.props} />
                <MyPostsContainer />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps PROFILE')
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedID: state.auth.id,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProfile: (userID) => {
            dispatch(setProfileThunkCreator(userID))
        },
        getStatus: (userID) => {
            dispatch(getStatusThunkCreator(userID))
        },
        updateStatus: (status) => {
            dispatch(updateStatusThunkCreator(status))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter,
)(ProfileContainer)