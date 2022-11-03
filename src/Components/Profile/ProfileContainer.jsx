import React from "react";

import axios from "axios"
import { connect } from "react-redux"
import { setUserProfile } from "../../redux/profile-reducer";
import { useParams, useLocation, useNavigate } from "react-router-dom"
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from "./MyPosts/MyPostsContainer";

class ProfileContainer extends React.Component {
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
                <ProfileInfo profile={this.props.profile} {...this.props} />
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

const withRouter = (Component) => {
    const ComponentWithRouterProps = (props) => {
        let params = useParams()
        let location = useLocation()
        let navigation = useNavigate()
        return (
            <Component router={{ params, location, navigation }} {...props} />
        )
    }
    return ComponentWithRouterProps
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileContainer))
