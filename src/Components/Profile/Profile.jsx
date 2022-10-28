import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo />
            <MyPosts posts={props.profilePage} newPostText={props.profilePage.newPostText} addPost={props.addPost} changePost={props.changePost} />
        </div>
    )
}

export default Profile