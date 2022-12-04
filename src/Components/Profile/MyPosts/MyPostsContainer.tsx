import React from "react"
import { Post } from "./Post/Post"
import { actionsProfile, PostType } from "../../../redux/profile-reducer"
import { connect } from "react-redux"
import MyPostsForm from "./MyPostsForm"
import { reduxForm } from "redux-form"
import { AppStateType } from "../../../redux/redux-store"

const MyPosts: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    let post =
        [...props.posts]
            .reverse()
            .map((m, id) => <Post key={id} post={m.message} />)
    let onSubmit = (formData: DataType) => {
        props.addPost(formData.post)
    }
    return (
        <div style={{ 'margin': '10px' }}>
            <h1>My posts</h1>
            <div>
                {post}
            </div>
            <div>
                <PostReduxForm onSubmit={onSubmit} />
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}

type MapStateToPropsType = { posts: Array<PostType> }
type MapDispatchToPropsType = { addPost: (post: string) => void }
type OwnProps = {}
export type DataType = { post: string }

let PostReduxForm = reduxForm<DataType>({ form: 'post' })(MyPostsForm)

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, AppStateType>(mapStateToProps, { addPost: actionsProfile.addPost })(React.memo(MyPosts))