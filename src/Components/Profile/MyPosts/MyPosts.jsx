import React from "react"
import s from './MyPosts.module.css'
import Post from "./Post/Post"

const MyPosts = (props) => {
    return (
        <div style={{ 'margin': '10px' }}>
            <h1>My posts</h1>
            <div>
                <input />
                <button style={{ 'marginLeft': '10px' }}>Add Post</button>
            </div>
            <Post post={props.post}/>
        </div>
    )
}


export default MyPosts