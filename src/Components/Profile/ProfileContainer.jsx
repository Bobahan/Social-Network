import React from "react";
import { connect } from "react-redux"
import { withRouter } from "../HOC/withRouter";
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { getStatusThunkCreator, setProfileThunkCreator, updateStatusThunkCreator } from "../../redux/profile-reducer";
// import { withAuthRedirect } from "../HOC/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userID = this.props.router.params.userId
        if (!userID) {
            userID = 26120
        }
        this.props.setProfile(userID)
        this.props.getStatus(userID)
    }
    render() {
        return (
            <>
                <ProfileInfo {...this.props} />
                <MyPostsContainer />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
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
    withRouter,
    // withAuthRedirect
)(ProfileContainer)