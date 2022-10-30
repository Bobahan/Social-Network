import React from "react"
import Post from "./Post/Post"

const MyPosts = (props) => {
    let post = props.posts.map((m, id) => <Post key={id} post={m.message} />)
    let linkToInput = React.createRef()

    let onUpdatePost = () => {
        let text = linkToInput.current.value
        props.updatePost(text)
    }

    let onAddPost = () => {
        props.addPost()
    }

    return (
        <div style={{ 'margin': '10px' }}>
            <h1>My posts</h1>
            {post}
            <div>
                <input ref={linkToInput} value={props.newPostText} onChange={onUpdatePost} />
                <button onClick={onAddPost} style={{ 'marginLeft': '10px' }}>Add Post</button>
            </div>
        </div>
    )
}

export default MyPosts