import React from "react";
import axios from "axios"
import { connect } from "react-redux"
import { setUserProfile } from "../../redux/profile-reducer";
import { withRouter } from "../HOC/withRouter";
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from "./MyPosts/MyPostsContainer";

class ProfileContainerAPI extends React.Component {
    componentDidMount() {
        let userID = this.props.router.params.userId
        if (!userID) {
            userID = 2
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userID}`)
            .then(response => {
                this.props.setProfile(response.data)
            })
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
        setProfile: (profile) => {
            dispatch(setUserProfile(profile))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileContainerAPI))