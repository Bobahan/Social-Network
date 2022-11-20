import React from "react"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import ProfileInfo from "./ProfileInfo/ProfileInfo"

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo {...props} isOwner={props.isOwner} updatePhoto={props.updatePhoto} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile