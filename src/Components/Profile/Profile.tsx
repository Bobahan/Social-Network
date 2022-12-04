import React from "react"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import ProfileInfo from "./ProfileInfo/Info/ProfileInfo"

const Profile = (props: any) => {
    return (
        <div>
            <ProfileInfo
                {...props}
                profile={props.profile}
                isOwner={props.isOwner}
                updateStatus={props.updateStatus}
                status={props.status}
                updatePhoto={props.updatePhoto}
                saveProfile={props.saveProfile} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile