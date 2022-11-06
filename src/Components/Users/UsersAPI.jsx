import React from "react";
import { connect } from "react-redux";
import { follow, unfollow, setUsers, changePage, setTotalUsersCount, toogleIsFetching, isFollowingProgress, changeCurrentPageThunkCreator } from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../Common/Preloader";
import { getUsersThunkCreator } from "../../redux/users-reducer";

class UsersContainerAPI extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    changeCurrentPage = (page) => {
        this.props.changePage(page)
        this.props.changeCurrentPage(page, this.props.pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    changeCurrentPage={this.changeCurrentPage.bind(this)}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    users={this.props.users}
                    isFetching={this.props.isFetching}
                    followingInProgress={this.props.followingInProgress}
                    isFollowingProgress={this.props.isFollowingProgress}
                />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userID) => {
            dispatch(follow(userID))
        },
        unfollow: (userID) => {
            dispatch(unfollow(userID))
        },
        setUsers: (users) => {
            dispatch(setUsers(users))
        },
        changePage: (currentPage) => {
            dispatch(changePage(currentPage))
        },
        setTotalUsersCount: (page) => {
            dispatch(setTotalUsersCount(page))
        },
        toogleIsFetching: (isFetching) => {
            dispatch(toogleIsFetching(isFetching))
        },
        isFollowingProgress: (isDisabling, userID) => {
            dispatch(isFollowingProgress(isDisabling, userID))
        },
        getUsers: (currentPage, pageSize) => {
            dispatch(getUsersThunkCreator(currentPage, pageSize))
        },
        changeCurrentPage: (page, pageSize) => {
            dispatch(changeCurrentPageThunkCreator(page, pageSize))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainerAPI)