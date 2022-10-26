import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    let posts = {
        post: [
            { id: 1, message: 'Hello' },
            { id: 2, message: 'How are you?' },
            { id: 3, message: 'Yo Yo Yo guys!' },
        ]
    }

    let post = posts.post.map(p => <div>{p.message}</div>)

    return (
        <div>
            <ProfileInfo />
            <MyPosts post={post} />
        </div>
    )
}

export default Profile