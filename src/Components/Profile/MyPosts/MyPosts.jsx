import React from "react"
import s from './MyPosts.module.css'
import Post from "./Post/Post"

const MyPosts = (props) => {
    let post = props.posts.post.map((m, id) => <Post key={id} post={m.message} />)

    return (
        <div style={{ 'margin': '10px' }}>
            <h1>My posts</h1>
            {post}
            <div>
                <input />
                <button style={{ 'marginLeft': '10px' }}>Add Post</button>
            </div>
        </div>
    )
}


export default MyPosts