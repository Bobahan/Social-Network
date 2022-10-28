import React from "react"
import Post from "./Post/Post"

const MyPosts = (props) => {
    let post = props.posts.post.map((m, id) => <Post key={id} post={m.message} />)
    let linkToInput = React.createRef()

    let onChange = () => {
        let text = linkToInput.current.value
        props.changePost(text)
    }

    let onAddPost = () => {
        props.addPost()
    }

    return (
        <div style={{ 'margin': '10px' }}>
            <h1>My posts</h1>
            {post}
            <div>
                <input ref={linkToInput} value={props.newPostText} onChange={onChange} />
                <button onClick={onAddPost} style={{ 'marginLeft': '10px' }}>Add Post</button>
            </div>
        </div>
    )
}

export default MyPosts