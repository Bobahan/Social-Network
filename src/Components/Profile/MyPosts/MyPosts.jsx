import React from "react"
import Post from "./Post/Post"

const MyPosts = (props) => {
    let post = props.posts.post.map((m, id) => <Post key={id} post={m.message} />)
    let currentTextValue = props.currentTextValue

    let linkToInput = React.createRef() // тут сидит объект с текущим значением взятый из input

    const addPost = () => {
        let text = linkToInput.current.value // в text у нас хранится текущее вводимое значение
        console.log(text)
    }

    return (
        <div style={{ 'margin': '10px' }}>
            <h1>My posts</h1>
            {post}
            <div>
                <input ref={linkToInput} />
                <button onClick={addPost} style={{ 'marginLeft': '10px' }}>Add Post</button>
            </div>
        </div>
    )
}


export default MyPosts