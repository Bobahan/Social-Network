import React from "react"
import Post from "./Post/Post"

const MyPosts = (props) => {
    let post = props.posts.post.map((m, id) => <Post key={id} post={m.message} />)

    const addPost = () => {

    }
    return (
        <div style={{ 'margin': '10px' }}>
            <h1>My posts</h1>
            {post}
            <div>
                <input />
                <button onClick={addPost} style={{ 'marginLeft': '10px' }}>Add Post</button>
            </div>
        </div>
    )
}


export default MyPosts