import { connect } from "react-redux";
import { followActionCreator, setUsersActionCreator, unfollowActionCreator } from "../../redux/users-reducer";
import Users from "./Users";

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        img: state.usersPage.img,
        followed: state.usersPage.followed
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userID) => {
            dispatch(followActionCreator(userID))
        },
        unfollow: (userID) => {
            dispatch(unfollowActionCreator(userID))
        },
        setUsers: (users) => {
            dispatch(setUsersActionCreator(users))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)