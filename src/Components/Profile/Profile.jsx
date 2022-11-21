import React from "react"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import ProfileInfo from "./ProfileInfo/Info/ProfileInfo"

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} {...props} isOwner={props.isOwner} updatePhoto={props.updatePhoto} saveProfile={props.saveProfile} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile