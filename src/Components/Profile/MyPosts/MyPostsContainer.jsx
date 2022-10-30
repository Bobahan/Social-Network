import React from "react"
import { addPostActionCreator, updatePostActionCreator } from "../../../redux/profile-reducer"
import MyPosts from "./MyPosts"
import StoreContext from "../../../ContextAPI"

const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>
            {store => {
                let addPost = () => {
                    store.dispatch(addPostActionCreator())
                }
                let updatePost = (text) => {
                    store.dispatch(updatePostActionCreator(text))
                }
                return (
                    <MyPosts
                        addPost={addPost}
                        updatePost={updatePost}
                        posts={store.getState().profilePage.posts}
                        newPostText={store.getState().profilePage.newPostText} />
                )
            }
            }
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer