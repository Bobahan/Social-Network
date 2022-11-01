import { addPostActionCreator, updatePostActionCreator } from "../../../redux/profile-reducer"
import { connect } from "react-redux"
import MyPosts from "./MyPosts"

// Reducer меняет state, а connect подписан на обновления state'a
// connect перерисовывает MyPost если в ней была запущена функция mapStateToProps

// это connect общается со store

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator())
        },
        updatePost: (text) => {
            dispatch(updatePostActionCreator(text))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts)