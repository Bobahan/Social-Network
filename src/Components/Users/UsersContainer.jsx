import { connect } from "react-redux";
import { changePageActionCreator, followActionCreator, setUsersActionCreator, unfollowActionCreator } from "../../redux/users-reducer";
import Users from "./Users";

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        img: state.usersPage.img,
        followed: state.usersPage.followed,
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage
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
        },
        changePage: (page) => {
            dispatch(changePageActionCreator(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)