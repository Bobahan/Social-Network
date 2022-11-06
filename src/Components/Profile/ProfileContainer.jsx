import React from "react";
import { connect } from "react-redux"
import { withRouter } from "../HOC/withRouter";
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { setProfileThunkCreator } from "../../redux/profile-reducer";

class ProfileContainerAPI extends React.Component {
    componentDidMount() {
        let userID = this.props.router.params.userId
        if (!userID) {
            userID = 2
        }
        this.props.setProfile(userID)
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
        profile: state.profilePage.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProfile: (userID) => {
            dispatch(setProfileThunkCreator(userID))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileContainerAPI))