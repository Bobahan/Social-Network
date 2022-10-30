import React from "react"
import { addPostActionCreator, updatePostActionCreator } from "../../../redux/profile-reducer"
import MyPosts from "./MyPosts"

const MyPostsContainer = (props) => {
    let addPost = () => {
        props.dispatch(addPostActionCreator())
    }

    let updatePost = (text) => {
        props.dispatch(updatePostActionCreator(text))
    }

    return (
        <MyPosts addPost={addPost} updatePost={updatePost} posts={props.posts} newPostText={props.newPostText} dispatch={props.dispatch} />
    )
}

export default MyPostsContainer