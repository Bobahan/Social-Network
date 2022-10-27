import React from "react"
import s from './MyPosts.module.css'
import Post from "./Post/Post"

const MyPosts = () => {
    let posts = {
        post: [
            { id: 1, message: 'Hello' },
            { id: 2, message: 'How are you?' },
            { id: 3, message: 'Yo Yo Yo guys!' },
        ]
    }

    let post = posts.post.map((m, id) => <Post key={id} post={m.message} />)

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